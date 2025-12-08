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
  return api<CreateUserResponse>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function signIn(data: LoginDTO) {
  return api<LoginResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateUser(data: updtateUserDTO) {
  return api<UpdateUserResponse>("/users", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function changePassword(data: changePasswordDTO) {
  return api<changePasswordResponse>("/users/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
