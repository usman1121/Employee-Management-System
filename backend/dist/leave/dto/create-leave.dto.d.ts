export declare class CreateLeaveDto {
    employee_id: string;
    leave_type_id: string;
    start_date: string;
    end_date: string;
    reason?: string;
    status?: string;
}
export declare class UpdateLeaveDto {
    start_date?: string;
    end_date?: string;
    reason?: string;
    status?: string;
    approved_by?: string;
}
