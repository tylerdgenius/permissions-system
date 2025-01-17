import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { CreateUserDto, LoginUserDto } from 'src/dtos';
import { StatusEnums, TypesEnum } from 'src/enums';
import { constants, getters } from 'src/helpers';
import { Repository } from 'typeorm';
import { OrganizationService } from '../organization/organization.service';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.REPOSITORY.USER_REPOSITORY)
    private userRepository: Repository<User>,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private permissionsService: PermissionService,
    private mailService: MailerService,
  ) {}

  async findUserByEmail(email: string) {
    if (!email) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findSystemAdmin() {
    return this.userRepository.findOne({
      where: {
        type: TypesEnum.System,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    const encryptedPassword = await hash(
      data.password,
      parseInt(
        getters.getConfigService().get<string>('PASSWORD_ENCRYPTION_SALT'),
      ),
    );

    const user = new User();

    user.password = encryptedPassword;
    user.email = data.email;
    user.status = StatusEnums.Default;
    user.type = data.type;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return user;
  }

  async createStaff(data: CreateUserDto) {
    if (!data.organizationId) {
      throw new HttpException(
        'Organization id is required when creating a staff',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.createUser(data);

    const organization = await this.organizationService.findOne({
      id: data.organizationId,
    });

    if (!organization) {
      throw new HttpException(
        'Unable to find matching organization to staff to. Kindly provide appropriate organization key',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.organization = organization;

    const role = await this.roleService.createViewRole(organization);

    user.role = role;

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async createBusiness(data: CreateUserDto) {
    if (!data.organizationName) {
      throw new HttpException(
        'Organization name is required when creating a business account',
        HttpStatus.BAD_REQUEST,
      );
    }

    const organization = await this.organizationService.findOne({
      name: data.organizationName,
    });

    if (organization) {
      throw new HttpException(
        'Organization already exists in database. Kindly provide a unique organization name',
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.createUser(data);

    const createdOrganization =
      await this.organizationService.createOrganization({
        organizationName: data.organizationName,
      });

    const role =
      await this.roleService.createSuperAdminRole(createdOrganization);

    user.role = role;
    user.organization = createdOrganization;

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async createSystemAdmin(data: CreateUserDto) {
    const organization = await this.organizationService.findOne({
      name: data.organizationName,
    });

    const confirmThatSystemAdminExists = await this.findSystemAdmin();

    if (confirmThatSystemAdminExists || organization) {
      throw new ConflictException(
        'System only permits for one system admin to be on each instance of the product per time',
      );
    }

    const user = await this.createUser(data);

    const createdOrganization =
      await this.organizationService.createOrganization({
        organizationName: data.organizationName,
      });

    const role =
      await this.roleService.createSystemAdminRole(createdOrganization);

    user.role = role;
    user.organization = createdOrganization;

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async createCustomer(data: CreateUserDto) {
    const systemAdminExists = await this.findSystemAdmin();

    if (!systemAdminExists) {
      throw new BadRequestException(
        'Cannot create customer because no system admin exists',
      );
    }

    const organization = await this.organizationService.findOneOrganization([
      {
        id: data.organizationId,
      },
      {
        name: constants.SYSTEM_ADMIN.ORGANIZATION_NAME,
      },
    ]);

    if (!organization) {
      throw new BadRequestException(
        'Organization does not currently exist on system at this time',
      );
    }

    const user = await this.createUser(data);

    const role = await this.roleService.createCustomerBasicRole(organization);

    user.role = role;
    user.organization = organization;

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async registerUser(data: CreateUserDto) {
    const permissions = await this.permissionsService.getAllPermissions();

    if (permissions.length <= 0) {
      throw new InternalServerErrorException(
        'You cannot register on this system without providing permission seeding',
      );
    }

    const userExists = await this.findUserByEmail(data.email);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    if (data.type === TypesEnum.Staff) {
      return this.createStaff(data);
    }

    if (data.type === TypesEnum.Business) {
      return this.createBusiness(data);
    }

    if (data.type === TypesEnum.System) {
      if (data.organizationName !== constants.SYSTEM_ADMIN.ORGANIZATION_NAME) {
        throw new BadRequestException(
          `System admin must belong to ${constants.SYSTEM_ADMIN.ORGANIZATION_NAME} Organization. Kindly update your organization name to reflect this`,
        );
      }

      return this.createSystemAdmin(data);
    }

    const savedUser = await this.createCustomer(data);

    return savedUser;
  }

  async loginUser(data: LoginUserDto): Promise<User & { accessToken: string }> {
    if (!data) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userExists = await this.findUserByEmail(data.email);

    if (!userExists) {
      // Intentionally keeping log in error details vague to disuade attackers from guessing right in most cases
      throw new BadRequestException('Invalid login details');
    }

    const checkPassword = await compare(data.password, userExists.password);

    if (!checkPassword) {
      throw new BadRequestException('Invalid login details');
    }

    const accessToken = sign(
      {
        id: userExists.id,
      },
      getters.getConfigService().get('ACCESS_TOKEN_SECRET'),
      {
        expiresIn: '2h',
      },
    );

    // delete userExists.password;

    return {
      ...userExists,
      accessToken,
    };
  }

  async findUserAndJoin(filter: Partial<User>) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.organization', 'organization')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', filter)
      .getOne();
  }

  @OnEvent('user.created')
  async handleUserCreatedEvent(user: User) {
    await this.mailService.sendMail({
      to: 'albertnwachukwu@gmail.com',
      subject: 'Welcome to My App! Confirm your Email',
      template: './confirmation',
      context: {
        name: 'User', // Replace with dynamic values
      },
    });
  }
}
