import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    try {
      return this.companiesRepository.save(createCompanyDto);
    } catch (error) {
      throw Error(error);
    }
  }

  findAll() {
    return this.companiesRepository.find();
  }

  findOne(company_id: number) {
    return this.companiesRepository.findOne({
      where: {
        company_id,
      },
    });
  }

  findOneWithContacts(company_id: number) {
    return this.companiesRepository.findOne({
      where: {
        company_id,
      },
      relations: ['contact_persons'],
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companiesRepository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companiesRepository.delete(id);
  }
}
