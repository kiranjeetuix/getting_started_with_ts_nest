import { IsString, IsInt } from 'class-validator';
export class CreateEmployeeDto {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly age: number;
  readonly position: string;
}
// DTO (Data Transfer Object)
// API Contract:
// Purpose: Defines the structure of data exchanged between different parts of the application, such as controllers, services, and external APIs.
// Usage:
// Acts as a contract that specifies what data is expected from incoming requests or what should be returned in responses.
// Provides a clear, standardized format for data transmission, enhancing communication and interoperability.
