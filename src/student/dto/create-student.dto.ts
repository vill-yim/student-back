export class CreateStudentDto {
  student_id?: string;
  name: string;
  lastname: string;
  type_identify: string;
  number_identify: string;
  email: string;
  password: string;
  profile_img?: string | '';
  approved?: boolean;
  active?: boolean;
}
