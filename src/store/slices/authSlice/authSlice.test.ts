import authReducer, { setUser, signOut } from "../authSlice";
import { storage } from "@/utils/storaeg";
import { User } from "@/types/auth";

jest.mock("@/utils/storaeg", () => ({
  storage: {
    delete: jest.fn(),
  },
}));

describe("authSlice", () => {
  const initialState = {
    superadmin: false,
    user: null,
  };

  const mockUser: User = {
    username: "emilys",
    image: "https://dummyjson.com/icon/emilys/128",
  };

  it("should return the initial state by default", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set user and mark superadmin if username is 'emilys'", () => {
    const nextState = authReducer(initialState, setUser(mockUser));
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.superadmin).toBe(true);
  });

  it("should set user without superadmin if username is not 'emilys'", () => {
    const user2 = { ...mockUser, username: "john" };
    const nextState = authReducer(initialState, setUser(user2));
    expect(nextState.user).toEqual(user2);
    expect(nextState.superadmin).toBe(false);
  });

  it("should clear user and superadmin on signOut and delete token", () => {
    const loggedInState = { user: mockUser, superadmin: true };
    const nextState = authReducer(loggedInState, signOut());

    expect(nextState.user).toBeNull();
    expect(nextState.superadmin).toBe(false);
    expect(storage.delete).toHaveBeenCalledWith("accessToken");
  });
});
