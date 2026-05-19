import { Controller } from '@nestjs/common';
import {Get,Patch,Body,Post,Param,Delete} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminChangePasswordDto } from './dto/admin-change-password.dto';
import { AdminUpdateEmployeeDto } from './dto/admin-update-employee.dto';



@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: AdminUpdateEmployeeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id/reset-password')
  resetPassword(
    @Param('id') id: string,
    @Body() dto: AdminChangePasswordDto,
  ) {
    return this.service.resetPassword(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

