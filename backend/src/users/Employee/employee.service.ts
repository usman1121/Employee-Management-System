import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getProfile(employee_id: string) {
    const user = await this.prisma.employee.findUnique({
      where: { employee_id },
      include: {
        department: true,
        address: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;
    return result;
  }

  async updateProfile(employee_id: string, dto: UserUpdateProfileDto) {
    await this.ensureUserExists(employee_id);

    const updated = await this.prisma.employee.update({
      where: { employee_id },
      data: dto,
    });

    const { password, ...result } = updated;
    return result;
  }

  async changePassword(employee_id: string, dto: UserChangePasswordDto) {
    const user = await this.prisma.employee.findUnique({
      where: { employee_id },
    });

    if (!user) throw new NotFoundException('User not found');

    const match = await bcryptjs.compare(dto.currentPassword, user.password);
    if (!match) throw new BadRequestException('Current password is incorrect');

    const hashed = await bcryptjs.hash(dto.newPassword, 10);

    await this.prisma.employee.update({
      where: { employee_id },
      data: { password: hashed },
    });

    return { message: 'Password updated successfully' };
  }

  private async ensureUserExists(employee_id: string) {
    const user = await this.prisma.employee.findUnique({
      where: { employee_id },
    });

    if (!user) throw new NotFoundException('User not found');
  }
}