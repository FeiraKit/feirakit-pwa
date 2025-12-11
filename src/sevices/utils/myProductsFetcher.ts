import { ProductType } from "@/app/(private)/(home)/components/productItem";

export async function getMyProducts(userId: string): Promise<ProductType[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), 30000);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/filters?id=${userId}`,
      {
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (err) {
    if (controller.signal.aborted) {
      if (controller.signal.reason === "timeout") {
        throw new Error("Tempo de resposta excedido (timeout)");
      }
      throw new Error("Requisição cancelada");
    }

    throw err; // React Query vai capturar isso e colocar em `error`
  } finally {
    clearTimeout(timeout);
  }
}
