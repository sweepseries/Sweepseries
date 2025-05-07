import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { saveStorage, getStorage, removeStorage } from "../asyncstorage";

jest.mock("@react-native-async-storage/async-storage", () => {
  const mock = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );

  return mock;
});

describe("AsyncStorage", () => {
  it("should save, get and remove storage successfully", async () => {
    const saveResult = await saveStorage("key", "value");
    expect(saveResult).toBe("SUCCESS");

    const getResult = await getStorage("key");
    expect(getResult).toBe("value");

    const removeResult = await removeStorage("key");
    expect(removeResult).toBe("SUCCESS");
  });

  it("should handle errors when saving, getting or removing storage", async () => {
    jest.spyOn(AsyncStorageMock, "setItem").mockRejectedValue(new Error("Error"));
    jest.spyOn(AsyncStorageMock, "getItem").mockRejectedValue(new Error("Error"));
    jest.spyOn(AsyncStorageMock, "removeItem").mockRejectedValue(new Error("Error"));

    const saveResult = await saveStorage("key", "value");
    expect(saveResult).toBe("ERROR");

    const getResult = await getStorage("key");
    expect(getResult).toBe(null);

    const removeResult = await removeStorage("key");
    expect(removeResult).toBe("ERROR");
  });
});
