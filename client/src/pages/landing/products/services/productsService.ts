import { apiGet } from "../../../../services/client";
import endpoints from "../endpoints.json";

export interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

export interface Product {
  id: string;
  name: string;
  popularity_score: number;
  weight: number;
  images: ProductImages;
  price: number;
  goldPrice: number;
  disabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  data?: Product[];
}

export interface ProductFilters {
  priceRange?: [number, number];
  popularityRange?: [number, number];
  search?: string;
}

export const getProducts = async (
  filters?: ProductFilters,
): Promise<Product[]> => {
  try {
    let url = `/${endpoints.Products}`;

    if (filters) {
      const params = new URLSearchParams();

      if (filters.priceRange) {
        params.append("minPrice", filters.priceRange[0].toString());
        params.append("maxPrice", filters.priceRange[1].toString());
      }

      if (filters.popularityRange) {
        params.append("minPopularity", filters.popularityRange[0].toString());
        params.append("maxPopularity", filters.popularityRange[1].toString());
      }

      if (filters.search && filters.search.trim()) {
        params.append("search", filters.search.trim());
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await apiGet<Product[]>(url);
    const data = response.data;

    return data || [];
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
