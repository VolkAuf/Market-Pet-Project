interface OrderRequest {
  phone: string;
  cart: { id: number; quantity: number }[];
}

interface OrderResponse {
  success: number;
  error?: string;
}

export async function sendOrder(data: OrderRequest): Promise<OrderResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при отправке заказа");
  }

  return response.json();
}
