import { Controller } from '@nestjs/common';
import {Get,Patch,Body,Req} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';


@Controller('me')
export class EmployeeController {
    constructor(private readonly service: EmployeeService) {}
    @Get()
    getProfile(@Req() req: any) {
        return this.service.getProfile(req.user.employee_id); 
    }

    @Patch()
    updateProfile(@Req() req: any, @Body() dto: UserUpdateProfileDto) {
        return this.service.updateProfile(req.user.employee_id, dto);
    }

    @Patch('change-password')
    changePassword(@Req() req: any, @Body() dto: UserChangePasswordDto) {
        return this.service.changePassword(req.user.employee_id, dto);
    }
    
}
