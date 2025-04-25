export interface CreateUserDTO {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UserResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
}
