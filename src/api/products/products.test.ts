import axios from "axios";
import {
  getProducts,
  getCategoriesList,
  getProductsByCategory,
  deleteProduct,
} from "./index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const API_BASE = "https://dummyjson.com";

describe("Products API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should fetch all products and transform data correctly", async () => {
      const mockResponse = {
        data: {
          products: [
            {
              id: 1,
              title: "iPhone 12",
              category: "smartphones",
              thumbnail: "https://example.com/iphone.jpg",
              price: 999,
              description: "Great phone",
            },
            {
              id: 2,
              title: "MacBook Pro",
              category: "laptops",
              thumbnail: "https://example.com/macbook.jpg",
              price: 1999,
              description: "Powerful laptop",
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProducts();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE}/products`);
      expect(result).toEqual([
        {
          id: 1,
          title: "iPhone 12",
          category: "smartphones",
          thumbnail: "https://example.com/iphone.jpg",
          isDeleted: false,
        },
        {
          id: 2,
          title: "MacBook Pro",
          category: "laptops",
          thumbnail: "https://example.com/macbook.jpg",
          isDeleted: false,
        },
      ]);
    });
  });

  describe("getCategoriesList", () => {
    it("should fetch categories list", async () => {
      const mockCategories = ["electronics", "smartphones", "laptops"];
      mockedAxios.get.mockResolvedValue({ data: mockCategories });

      const result = await getCategoriesList();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${API_BASE}/products/category-list`
      );
      expect(result).toEqual(mockCategories);
    });
  });

  describe("getProductsByCategory", () => {
    it("should fetch products by category", async () => {
      const category = "smartphones";
      const mockResponse = {
        data: {
          products: [
            {
              id: 1,
              title: "iPhone",
              category: "smartphones",
              thumbnail: "url",
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProductsByCategory(category);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${API_BASE}/products/category/${category}`
      );
      expect(result).toEqual([
        {
          id: 1,
          title: "iPhone",
          category: "smartphones",
          thumbnail: "url",
          isDeleted: false,
        },
      ]);
    });

    it("should use correct endpoint for different categories", async () => {
      const categories = ["electronics", "furniture", "beauty"];

      for (const category of categories) {
        mockedAxios.get.mockResolvedValue({ data: { products: [] } });
        await getProductsByCategory(category);
        expect(mockedAxios.get).toHaveBeenCalledWith(
          `${API_BASE}/products/category/${category}`
        );
      }
    });
  });

  describe("deleteProduct", () => {
    it("should send delete request to correct endpoint", async () => {
      const productId = 5;
      const mockResponse = {
        data: {
          id: 5,
          title: "Deleted Product",
          category: "electronics",
          thumbnail: "url",
          isDeleted: true,
        },
      };

      mockedAxios.delete.mockResolvedValue(mockResponse);

      const result = await deleteProduct(productId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${API_BASE}/products/${productId}`
      );
      expect(result).toEqual({
        id: 5,
        title: "Deleted Product",
        category: "electronics",
        thumbnail: "url",
        isDeleted: true,
      });
    });

    it("should return product with isDeleted true", async () => {
      const mockResponse = {
        data: {
          id: 1,
          title: "Product",
          category: "test",
          thumbnail: "url",
          isDeleted: true,
        },
      };

      mockedAxios.delete.mockResolvedValue(mockResponse);

      const result = await deleteProduct(1);

      expect(result?.isDeleted).toBe(true);
    });
  });
});
