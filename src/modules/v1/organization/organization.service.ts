import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(constants.REPOSITORY.ORGANIZATION_REPOSITORY)
    private organizationRepository: Repository<Organization>,
  ) {}

  async findOne(filter: Partial<Organization>) {
    return this.organizationRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  async findOneOrganization(
    filter: FindOptionsWhere<Organization> | FindOptionsWhere<Organization>[],
  ) {
    return this.organizationRepository.findOne({
      where: filter,
    });
  }

  async createOrganization(organizationData: { organizationName: string }) {
    try {
      if (!organizationData) {
        throw new HttpException(
          'The given data is invalid',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const organization = new Organization();

      organization.name = organizationData.organizationName;
      organization.createdAt = new Date();
      organization.updatedAt = new Date();

      return this.organizationRepository.save(organization);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
