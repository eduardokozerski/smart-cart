export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};

export class ProductRepository {
  static async fetchProducts(page: number = 1, perPage: number = 6) {
    try {
      const response = await fetch(`http://localhost:3000/api/products?page=${page}&perPage=${perPage}`);

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Erro ao buscar produtos: ${response.status} - ${errorDetails}`);
      }

      const data: ProductResponse = await response.json();
      return data;
    } catch (error: unknown) {

      if (error instanceof Error) {
        console.error(error);
        throw new Error(`Erro ao buscar produtos: ${error.message}`);
      } else {
        console.error("Erro desconhecido", error);
        throw new Error("Erro ao buscar produtos");
      }
    }
  }
}