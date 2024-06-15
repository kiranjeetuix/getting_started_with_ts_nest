import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { EmployeeService } from './employee.service';

import { CreateEmployeeDto } from './create-employee.dto';
import { Employee } from './employee.schema';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeeService.update(id, createEmployeeDto);
  }
  @Delete()
  async deleteMany() {
    return this.employeeService.deleteMany();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
