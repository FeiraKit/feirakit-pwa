import { CreateUserDTO, RegisterFormData } from "@/types/forms/userForm";
import { api } from "@/lib/api";

export function createUser(data: CreateUserDTO) {
  return api("/users", { method: "POST", body: JSON.stringify(data) });
}

export function signIn(email: string, password: string) {
  return api("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, senha: password }),
  });
}

export function updateUser(data: RegisterFormData) {
  return api("/users", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
