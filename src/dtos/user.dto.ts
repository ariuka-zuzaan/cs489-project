export interface CreateUserDTO {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
