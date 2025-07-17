import { fetchJson } from "@/shared/api/utils/fetchJson";

interface OrderRequest {
  phone: string;
  cart: { id: number; quantity: number }[];
}

export async function sendOrder(data: OrderRequest): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/order`;
  await fetchJson<null>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
