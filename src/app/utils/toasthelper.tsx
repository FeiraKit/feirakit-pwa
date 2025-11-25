"use client";
import { toast } from "react-toastify";

export function toastWellcome() {
  toast.success(`Seja Bem vindo Ao Feira Kit`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastGoodBye() {
  toast.info(`Obrigado Por Usar o Feira kit! Volte Sempre!`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastAddToCart(name: string) {
  toast.success(`${name} adicionado ao pedido!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastIncreaseItem(name: string) {
  toast.success(`+ 1 ${name} adicionado!`, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastDecreaseItem(name: string) {
  toast.warn(`1 ${name} removido!`, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastAddressSaved() {
  toast.success(`o Endereço Será Lembrado`, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastMissing(message: string) {
  toast.error(`${message}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastEmptyField(message: string) {
  toast.error(`${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastImagesLimit(message: string) {
  toast.info(`${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}

export function toastWrongCredentials(message: string) {
  toast.error(`${message}`, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  });
}
