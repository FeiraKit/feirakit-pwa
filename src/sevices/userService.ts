import {
  changePasswordDTO,
  changePasswordResponse,
  CreateUserDTO,
  CreateUserResponse,
  LoginDTO,
  LoginResponse,
  UpdateUserResponse,
  updtateUserDTO,
} from "@/types/forms/userTypes";
import { api } from "@/lib/api";

export function createUser(data: CreateUserDTO) {
  return api<CreateUserResponse>(
    "/users",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    30000
  );
}

export function signIn(data: LoginDTO) {
  return api<LoginResponse>(
    "/users/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    30000
  );
}

export function updateUser(data: updtateUserDTO) {
  return api<UpdateUserResponse>(
    "/users",
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    30000
  );
}

export function changePassword(data: changePasswordDTO) {
  return api<changePasswordResponse>(
    "/users/change-password",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    30000
  );
}

export function checkEmailAlreadyUsed(email: string) {
  return api<{
    userExist: boolean;
  }>(
    `/users/checkemailexists/?email=${email}`,
    {
      method: "GET",
    },
    30000
  );
}
