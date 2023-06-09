import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessModificationDto } from '../dto/business-modification.dto';
import { BusinessSearchDto } from '../dto/business-search.dto';
import { CompleteBusinessCreationDTO } from '../dto/complete-creation.dto';
import { InitialBusinessCreationDto } from '../dto/initial-creation.dto';
import { BusinessHq } from '../entities/business.entity';
import { BusinessClassification } from '../entities/business-classification.entity';
import { MailService } from '../../notifications/mail/mail.service';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { hashData } from '../../auth/utils/jwt.util';
import { User } from '../../users/entities/user.entity';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { UserCreatedEvent } from '../../common/events/user-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessHq)
    private readonly businessRepository: EntityRepository<BusinessHq>,
    @InjectRepository(BusinessClassification)
    private readonly businessClassificationRepository: EntityRepository<BusinessClassification>,
    private readonly mailService: MailService,
    private eventEmitter: EventEmitter2
  ) {}

  async findById(userId: string): Promise<BusinessHq> {
    const business = await this.businessRepository.findOne({ userId });
    if (!business || business.deleted)
      throw new NotFoundException('Business not found');

    return business;
  }

  async findByEmail(email: string) {
    const business = await this.businessRepository.findOne({ email });

    if (!business || business.deleted)
      throw new NotFoundException('Business not found');

    return business;
  }

  async initialCreation(dto: InitialBusinessCreationDto): Promise<BusinessHq> {
    const business = {
      approvedRegistration: false,
      name: dto.representativeName,
      ...dto,
      username: dto.businessName,
    };

    const createdBusiness = this.businessRepository.create(business);
    await this.businessRepository.persistAndFlush(createdBusiness);

    await this.eventEmitter.emit('user.created', {
      userId: createdBusiness.userId,
      email: business.email,
      role: ValidRoles.business,
      password: dto.password,
    });

    return createdBusiness;
  }

  async approveBusiness(businessId: string) {
    const business = await this.findById(businessId);

    business.approvedRegistration = true;

    await this.businessRepository.flush();

    await this.mailService.sendBusinessConfirmation(business, 'www.google.com');
  }

  async completeBusinessCreation(
    businessId: string,
    dto: CompleteBusinessCreationDTO
  ): Promise<BusinessHq> {
    const business = await this.findById(businessId);

    business.picture = dto.businessPicture;
    business.deleted = false;

    await this.businessRepository.persistAndFlush(business);
    return business;
  }

  async delete(businessId: string): Promise<BusinessHq> {
    const business = await this.findById(businessId);

    if (!business) throw new NotFoundException('BusinessNotFound');

    business.deleted = true;

    await this.businessRepository.persistAndFlush(business);
    return business;
  }

  async search(
    businessSearch: BusinessSearchDto
  ): Promise<PaginationResult<BusinessHq>> {
    const classificationsFound = await this.findClassifications(
      businessSearch.categories
    );

    const result = await this.businessRepository.findAndCount(
      {
        classifications: classificationsFound,
        deleted: false,
      },
      {
        offset: (businessSearch.page - 1) * businessSearch.pageSize,
        limit: businessSearch.pageSize,
      }
    );

    const [businessess, totalBusinessess] = result;
    const totalPages = Math.ceil(totalBusinessess / businessSearch.pageSize);

    return {
      data: businessess,
      page: businessSearch.page,
      totalResults: totalBusinessess,
      totalPages: totalPages,
    };
  }

  async modify(
    userId: string,
    businessModificationDto: BusinessModificationDto
  ): Promise<BusinessHq> {
    const business = await this.businessRepository.findOne({ userId });
    this.businessRepository.assign(business, businessModificationDto);
    await this.businessRepository.flush();

    return business;
  }

  async findClassifications(
    names: string[]
  ): Promise<BusinessClassification[]> {
    const classifications = await this.businessClassificationRepository.find({
      name: names,
    });

    return classifications;
  }
}
