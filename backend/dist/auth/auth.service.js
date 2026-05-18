"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const employee = await this.prisma.employee.findUnique({
            where: { email: loginDto.email },
        });
        if (!employee) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, employee.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async register(registerDto) {
        const existingEmployee = await this.prisma.employee.findUnique({
            where: { email: registerDto.email },
        });
        if (existingEmployee) {
            throw new common_1.ConflictException('Email already registered');
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
    async getProfile(employeeId) {
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
            throw new common_1.UnauthorizedException('Employee not found');
        }
        return employee;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map