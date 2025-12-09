type Filters = {
  pageParam?: number;
  searchTerm?: string;
  selectedCity?: string;
};

export async function fetcher({
  pageParam,
  searchTerm,
  selectedCity,
}: Filters) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("timeout"), 30000);

  let url = "";
  if (selectedCity) {
    searchTerm = "";
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/filters?cidade=${selectedCity}`;
  }

  if (searchTerm && searchTerm?.length > 0) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/filters?nome=${searchTerm}`;
  }

  if (!searchTerm && !selectedCity) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${pageParam}&limit=10`;
  }
  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    if (controller.signal.aborted) {
      if (controller.signal.reason === "timeout") {
        throw new Error("Tempo de resposta excedido (timeout)");
      }
      throw new Error("Requisição cancelada");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
