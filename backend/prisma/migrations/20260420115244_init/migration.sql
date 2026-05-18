-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" TEXT NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" TEXT NOT NULL,
    "phone" VARCHAR(20),
    "role" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Active',
    "hire_date" DATE NOT NULL,
    "position" VARCHAR(100),
    "department_id" TEXT,
    "address_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "check_in_time" TIMESTAMP,
    "check_out_time" TIMESTAMP,
    "total_hours" DECIMAL(5,2),
    "status" VARCHAR(20) NOT NULL,
    "device_info" VARCHAR(100),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "LeaveType" (
    "leave_type_id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "is_paid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("leave_type_id")
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "leave_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "leave_type_id" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "reason" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Pending',
    "approved_by" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("leave_id")
);

-- CreateTable
CREATE TABLE "LeaveBalance" (
    "balance_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "leave_type_id" TEXT NOT NULL,
    "total_days" INTEGER NOT NULL,
    "used_days" INTEGER NOT NULL DEFAULT 0,
    "remaining_days" INTEGER NOT NULL,

    CONSTRAINT "LeaveBalance_pkey" PRIMARY KEY ("balance_id")
);

-- CreateTable
CREATE TABLE "Grievance" (
    "grievance_id" TEXT NOT NULL,
    "employee_id" TEXT,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(30) NOT NULL DEFAULT 'Under Review',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grievance_pkey" PRIMARY KEY ("grievance_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "token_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiry_date" TIMESTAMP NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveType_name_key" ON "LeaveType"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "LeaveType"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveBalance" ADD CONSTRAINT "LeaveBalance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveBalance" ADD CONSTRAINT "LeaveBalance_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "LeaveType"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grievance" ADD CONSTRAINT "Grievance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
