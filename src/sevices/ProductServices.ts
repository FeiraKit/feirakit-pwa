"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { addProductFormData } from "@/types/forms/addProductFormData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = useAuthStore.getState().token;

export async function createProduct(data: addProductFormData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function removeProduct(id: string) {
  const response = await fetch(`${API_URL}/products`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id }),
  });
  console.log("response delete:", response);
  return response;
}

export async function updateProduct(data: addProductFormData, id: string) {
  const updateProductOBJ = { ...data, id: id };
  const response = await fetch(`${API_URL}/products`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(updateProductOBJ),
  });
  return response;
}
