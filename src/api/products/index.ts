import { API_BASE } from "@/utils/CONSTANTS";
import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE}/products`);
  return response.data?.products?.map((product: any) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    thumbnail: product.thumbnail,
    isDeleted: false,
  }));
};

export const getCategoriesList = async () => {
  const response = await axios.get(`${API_BASE}/products/category-list`);
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE}/products/category/${category}`);
  return response.data?.products?.map((product: any) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    thumbnail: product.thumbnail,
    isDeleted: false,
  }));
};

export const deleteProduct = async (productId: number) => {
  const response = await axios.delete(`${API_BASE}/products/${productId}`);
  const product = response.data;
 
  return product?{
    id: product.id,
    title: product.title,
    category: product.category,
    thumbnail: product.thumbnail,
    isDeleted: product.isDeleted,
  }:null;
};
