import { Module } from '@nestjs/common';
import { EmployeeController } from './Employee/employee.controller';
import { AdminController } from './Admin/admin.controller';
import { EmployeeService } from './Employee/employee.service';
import { AdminService } from './Admin/admin.service';



@Module({
  providers: [EmployeeService,AdminService],
  controllers: [EmployeeController,AdminController],
})
export class UsersModule {}