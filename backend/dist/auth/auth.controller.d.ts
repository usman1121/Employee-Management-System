import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        employee: {
            employee_id: string;
            full_name: string;
            email: string;
            role: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        employee: {
            employee_id: string;
            full_name: string;
            email: string;
            role: string;
        };
    }>;
    getProfile(req: any): Promise<{
        department: {
            department_id: string;
            name: string;
            description: string | null;
        } | null;
        address: {
            address_id: string;
            country: string;
            city: string;
            state: string | null;
        } | null;
        email: string;
        full_name: string;
        role: string;
        phone: string | null;
        position: string | null;
        employee_id: string;
        status: string;
        hire_date: Date;
        created_at: Date;
    }>;
}
