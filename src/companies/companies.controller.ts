import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':company_id')
  async findOne(@Param('company_id') company_id: number) {
    const company = await this.companiesService.findOne(company_id);
    return company;
  }

  @Patch(':company_id')
  update(
    @Param('company_id') company_id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(company_id, updateCompanyDto);
  }

  @Delete(':company_id')
  remove(@Param('company_id') company_id: number) {
    return this.companiesService.remove(company_id);
  }
}
