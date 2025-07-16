type ImageResponse = {
  imageUrl: string;
};

export async function fetchRandomImg(productName: string): Promise<ImageResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/random?query=${productName}`);
  if (!res.ok) {
    throw new Error(`Failed to fetchRandomImg with response: ${res}`);
  }
  return res.json();
}
