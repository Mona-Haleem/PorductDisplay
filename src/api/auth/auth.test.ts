// __tests__/api.test.ts
import axios from "axios";
import { login, getMe } from "./index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Auth API Layer", () => {
  afterEach(() => jest.clearAllMocks());

  it("login: resolves with token on success", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        username: "emilys",
        accessToken: "abc",
        refreshToken: "cde",
      },
    });
    const result = await login({ username: "emilys", password: "emilyspass" });
    expect(result.accessToken).toBe("abc");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://dummyjson.com/auth/login",
      {
        username: "emilys",
        password: "emilyspass",
      }
    );
  });

  it("login: rejects on 400 error", async () => {
    mockedAxios.post.mockRejectedValue(
      Object.assign(new Error("Request failed"), {
        isAxiosError: true,
        response: { status: 400, data: { message: "Invalid credentials" } },
      })
    );

    await expect(
      login({ username: "wrong", password: "123" })
    ).rejects.toHaveProperty("response.status", 400);
  });

    it("getMe: fetches user data with token", async () => {
      mockedAxios.get.mockResolvedValue({ data: { username: "superadmin" } });
      const result = await getMe("token123");
      expect(result.username).toBe("superadmin");
      expect(mockedAxios.get).toHaveBeenCalledWith("https://dummyjson.com/auth/me", {
        headers: { Authorization: "Bearer token123" },
      });
    });
});
