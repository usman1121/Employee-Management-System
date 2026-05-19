import { Injectable ,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';
import { AdminChangePasswordDto } from './dto/admin-change-password.dto';
import { AdminUpdateEmployeeDto } from './dto/admin-update-employee.dto';



@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    const hashed = await bcryptjs.hash(dto.password, 10);

    const employee = await this.prisma.employee.create({
      data: {
        ...dto,
        password: hashed,
      },
    });

    const { password, ...result } = employee;
    return result;
  }

  async findAll() {
    const employees = await this.prisma.employee.findMany({
      include: {
        department: true,
      },
    });

    return employees.map(e => {
      const { password, ...result } = e;
      return result;
    });
  }

  async findOne(employee_id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { employee_id },
      include: {
        department: true,
        address: true,
      },
    });

    if (!employee) throw new NotFoundException('Employee not found');

    const { password, ...result } = employee;
    return result;
  }

  async update(employee_id: string, dto: AdminUpdateEmployeeDto) {
    await this.ensureExists(employee_id);

    const updated = await this.prisma.employee.update({
      where: { employee_id },
      data: dto,
    });

    const { password, ...result } = updated;
    return result;
  }

  async resetPassword(employee_id: string, dto: AdminChangePasswordDto) {
    await this.ensureExists(employee_id);

    const hashed = await bcryptjs.hash(dto.newPassword, 10);

    await this.prisma.employee.update({
      where: { employee_id },
      data: { password: hashed },
    });

    return { message: 'Password reset successfully' };
  }

  async remove(employee_id: string) {
    await this.ensureExists(employee_id);

    return this.prisma.employee.update({
      where: { employee_id },
      data: { status: 'Inactive' },
    });
  }

  private async ensureExists(employee_id: string) {
    const user = await this.prisma.employee.findUnique({
      where: { employee_id },
    });

    if (!user) throw new NotFoundException('Employee not found');
  }
}