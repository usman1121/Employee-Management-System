import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        employee_id: string;
        full_name: string;
        email: string;
        role: string;
    }>;
}
