import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { email: loginDto.email },
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, employee.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: employee.employee_id, email: employee.email, role: employee.role };
    const accessToken = this.jwtService.sign(payload);

    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + Number(process.env.JWT_EXPIRATION || 86400));

    await this.prisma.session.create({
      data: {
        employee_id: employee.employee_id,
        token: accessToken,
        expiry_date: expiryDate,
      },
    });

    return {
      access_token: accessToken,
      employee: {
        employee_id: employee.employee_id,
        full_name: employee.full_name,
        email: employee.email,
        role: employee.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { email: registerDto.email },
    });

    if (existingEmployee) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const employee = await this.prisma.employee.create({
      data: {
        full_name: registerDto.full_name,
        email: registerDto.email,
        password: hashedPassword,
        role: registerDto.role,
        phone: registerDto.phone,
        position: registerDto.position,
        hire_date: new Date(),
        department_id: registerDto.department_id,
        address_id: registerDto.address_id,
      },
    });

    const payload = { sub: employee.employee_id, email: employee.email, role: employee.role };
    const accessToken = this.jwtService.sign(payload);

    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + Number(process.env.JWT_EXPIRATION || 86400));

    await this.prisma.session.create({
      data: {
        employee_id: employee.employee_id,
        token: accessToken,
        expiry_date: expiryDate,
      },
    });

    return {
      access_token: accessToken,
      employee: {
        employee_id: employee.employee_id,
        full_name: employee.full_name,
        email: employee.email,
        role: employee.role,
      },
    };
  }

  async getProfile(employeeId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { employee_id: employeeId },
      select: {
        employee_id: true,
        full_name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        hire_date: true,
        position: true,
        department: true,
        address: true,
        created_at: true,
      },
    });

    if (!employee) {
      throw new UnauthorizedException('Employee not found');
    }

    return employee;
  }
}
