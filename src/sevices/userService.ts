import {
  CreateUserDTO,
  LoginDTO,
  RegisterFormData,
} from "@/types/forms/userForm";
import { api } from "@/lib/api";

export function createUser(data: CreateUserDTO) {
  return api("/users", { method: "POST", body: JSON.stringify(data) });
}

export function signIn(data: LoginDTO) {
  return api("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateUser(data: RegisterFormData) {
  return api("/users", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
