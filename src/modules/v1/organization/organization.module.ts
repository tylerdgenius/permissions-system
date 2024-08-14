import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { organizationProviders } from './organization.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [OrganizationController],
  imports: [DatabaseModule],
  providers: [...organizationProviders, OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
