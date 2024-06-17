import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.schema';
import { CreateEmployeeDto } from './create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<Employee>,
  ) {}
  //  constructor(...): This is the constructor method of the EmployeeService class.
  //@InjectModel('Employee'): This decorator comes from @nestjs/mongoose and injects the Mongoose Model for the Employee schema into the employeeModel property.
  //   private readonly employeeModel: Model<Employee>: This declares a private property employeeModel of type Model<Employee>, which represents the Mongoose model for the Employee schema.
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }
  //   create(createEmployeeDto: any): Promise<Employee>: This method is asynchronous (async) and accepts createEmployeeDto as input, which is of type any.
  // new this.employeeModel(createEmployeeDto): This line creates a new instance of this.employeeModel, which is the Mongoose model for Employee, initialized with createEmployeeDto.
  // createdEmployee.save(): This saves the newly created employee to the MongoDB database using Mongoose's .save() method.
  // Returns: The method returns a Promise<Employee> representing the newly created employee after it has been saved to the database.

  async findAll(): Promise<Employee[]> {
    const result = this.employeeModel.find().exec();
    console.log(result);
    return result;
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  async update(
    id: string,
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeModel
      .findByIdAndUpdate(id, createEmployeeDto, { new: true })
      .exec();
  }
  async deleteMany(): Promise<{ deletedCount?: number }> {
    return this.employeeModel.deleteMany().exec();
  }
  async delete(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
