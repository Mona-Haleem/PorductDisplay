import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "app-storage",
});

export const mmkvPersister = {
  persistClient: async (client: any) => {
    storage.set("react-query-cache", JSON.stringify(client));
  },
  restoreClient: async () => {
    const cachedString = storage.getString("react-query-cache");
    if (!cachedString) return undefined;
    return JSON.parse(cachedString);
  },
  removeClient: async () => {
    storage.delete("react-query-cache");
  },
};
