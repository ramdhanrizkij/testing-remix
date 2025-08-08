export interface UserType {
  uuid: string;
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
  job_title: string;
  display_name: string;
  date_of_birth: string | null;
  user_status: string;
  gender_name: string;
  thumbnail_url: string | null;
  password: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  display_name: string;
  email_address: string;
  username: string;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  job_title: string;
  display_name: string;
  date_of_birth: string;
  thumbnail_url?: string;
  gender: string;
}
