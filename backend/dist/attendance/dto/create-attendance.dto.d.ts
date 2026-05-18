export declare class CreateAttendanceDto {
    employee_id: string;
    date: string;
    check_in_time?: string;
    check_out_time?: string;
    total_hours?: number;
    status: string;
    device_info?: string;
}
export declare class UpdateAttendanceDto {
    check_in_time?: string;
    check_out_time?: string;
    total_hours?: number;
    status?: string;
    device_info?: string;
}
