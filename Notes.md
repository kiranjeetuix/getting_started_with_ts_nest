## NestJs is framework build  on the top of Node.js

NestJS follow MVC design but Express.Js dont.

## Why Choose Nest.js?
TypeScript Support: Strong typing and modern JS features.
Modular Architecture: Promotes reusable modules and dependency injection.
Familiar Patterns: MVC and decorator-based syntax for readability.
Extensive Ecosystem: Easy integration with libraries like TypeORM and Mongoose.
Performance: Built on Node.js and Express/Fastify for high performance.
Testing: Robust utilities for unit, integration, and E2E testing.
Scalability: Supports microservices and flexible transport layers.
Security: Built-in features like guards and interceptors.
Documentation: Detailed and comprehensive guides.


## Various Modules in Nest.js

Core Module (@nestjs/core):
NestFactory: Provides methods for creating Nest applications.
ApplicationModule: The root module of a Nest application.
ModuleRef: Represents the module reference and provides access to module-related metadata and instance management.

Common Module (@nestjs/common):
Controllers, Providers, Modules: Key building blocks of a Nest application.
Guards: Used to protect routes.
Interceptors: Middleware-like components to intercept the request/response cycle.
Pipes: Used for input validation and transformation.

HTTP Module (@nestjs/axios, @nestjs/graphql, @nestjs/passport, etc.):
AxiosModule: Integration with Axios for HTTP requests.
GraphQLModule: Integration with GraphQL for building GraphQL APIs.
PassportModule: Integration with Passport for authentication.

Database Modules:
MongooseModule (@nestjs/mongoose): Integration with MongoDB using Mongoose ODM.
TypeOrmModule (@nestjs/typeorm): Integration with SQL/relational databases using TypeORM.
SequelizeModule (@nestjs/sequelize): Integration with Sequelize ORM for SQL databases.

WebSockets Module (@nestjs/websockets):
Provides WebSocket capabilities for real-time communication.
Gateway: Represents a WebSocket gateway.

Microservices Modules (@nestjs/microservices):
Clients and Servers: For building microservices architecture using various transport layers (e.g., TCP, Redis, Kafka).

Testing Modules (@nestjs/testing):
TestingModule: Provides utilities for testing Nest applications and components.
Mocking utilities: Helps in mocking services and dependencies for unit testing.

Utilities and Helpers:
Logger: Provides logging capabilities.
Validation: Built-in class-validator integration for input validation.
Configuration: Environment variables handling using @nestjs/config.



## Structure of nestJs
project-name/
│
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── node_modules/
│
├── .gitignore
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json

src/:
app.controller.ts: A sample controller file.
app.module.ts: The root module of the application.
app.service.ts: A sample service file.
main.ts: The entry point of the application.

test/:
app.e2e-spec.ts: An end-to-end test file.
jest-e2e.json: Configuration for end-to-end tests.

node_modules/:
Automatically generated folder containing project dependencies.

.gitignore:
Specifies files and directories to be ignored by Git.

nest-cli.json:
Configuration file for Nest CLI.

package.json:
Contains project metadata, scripts, and dependencies.

README.md:
Basic information about the project.

tsconfig.build.json:
TypeScript configuration file for building the project.

tsconfig.json:
TypeScript configuration file for the project.



## Connect to MongoDB

IN root module: Add Database module in imports
Create a database module: and add to app.module or direct import in app.module
<!-- import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kiranjeetuix:JgMwcs7NKTp0J2nB@cluster0.yjzeamx.mongodb.net/nestjs-app?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DatabaseModule {} -->

## creating schema
<!-- Schema: This is used to create a schema definition for your MongoDB collection.
Document: This is an interface provided by Mongoose that represents a MongoDB document. -->

Model is an instance of a schema that allows you to create, read, update, and delete documents based on that schema.

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}


#alternative

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

<!-- @Prop([String])// force that tag must of string
tags: string[]; 

Finally, the raw schema definition can also be passed to the decorator. This is useful when, for example, a property represents a nested object which is not defined as a class. For this, use the raw() function from the @nestjs/mongoose package, as follows:


@Prop(raw({
  firstName: { type: String },
  lastName: { type: String }
}))
details: Record<string, any>; -->

## module .ts
@Module: Decorator to define a module.
MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]): Registers the EmployeeSchema with Mongoose and provides it to the module for dependency injection.
providers: Array of providers (services) within this module (EmployeeService).
controllers: Array of controllers within this module (EmployeeController).

## service.ts
@Injectable: Decorator to mark a class as a provider that can be injected.
@InjectModel('Employee'): Injects the Mongoose Model for Employee schema.
create: Method to create a new Employee document.
findAll: Method to retrieve all Employee documents.
delete: Method to delete an Employee document by ID.

<!-- //exampple
findAll(): Promise<Employee[]>: This method is asynchronous (async) and retrieves all employees.
this.employeeModel.find(): Uses Mongoose's .find() method to query all documents in the Employee collection.
.exec(): Executes the query.
Returns: The method returns a Promise<Employee[]> representing an array of all employees found. -->
## controller.ts
@Controller('employees'): Decorator to define a controller with a base route path (/employees).
@Post(): Decorator for handling HTTP POST requests to create a new Employee.
@Get(): Decorator for handling HTTP GET requests to retrieve all Employee documents.
@Delete(':id'): Decorator for handling HTTP DELETE requests to delete an Employee by ID.
@Body(): Decorator to extract the body of a POST request (createEmployeeDto).
@Param('id'): Decorator to extract route parameters (id for DELETE request).


## hydrated document
Consider a schema where Cat references an Owner:
owner is a reference to the Owner schema.
When you fetch a Cat document that includes owner, Mongoose will automatically populate the owner field with the corresponding Owner document.
The resulting document (CatDocument) is then considered "hydrated" because it includes all the relevant data from both the Cat and Owner documents.

## Decorators

Types of Decorators
Class Decorators: Applied to a class definition.
<!-- import { Controller } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  // Methods and properties here
} -->

Method Decorators: Applied to a method within a class.
<!-- import { Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
} -->

Accessor Decorators: Applied to a getter or setter within a class.
Property Decorators: Applied to a property within a class.
<!-- import { Injectable } from '@nestjs/common'; -->

<!-- @Injectable()
export class CatsService {
  findAll(): string {
    return 'This action returns all cats';
  }
}

import { Inject } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(@Inject(CatsService) private readonly catsService: CatsService) {}

  @Get()
  findAll(): string {
    return this.catsService.findAll();
  }
} -->

Parameter Decorators: Applied to a parameter of a method within a class
<!-- import { Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
} -->









