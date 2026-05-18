import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    login(email: string, password: string): Promise<{
        employee_id: string;
        full_name: string;
        email: string;
        role: string;
    }>;
}
