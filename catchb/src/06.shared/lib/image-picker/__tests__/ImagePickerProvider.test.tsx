import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { fireEvent } from "@testing-library/react-native";

import { ImagePickerProvider, useImagePicker } from "@shared/lib/image-picker";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { selectImage, takePhoto } = useImagePicker();

  return (
    <View>
      <TouchableOpacity onPress={() => selectImage(1)} testID="select-image">
        <View />
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto} testID="take-photo">
        <View />
      </TouchableOpacity>
    </View>
  );
};

describe("ImagePickerProvider", () => {
  const sampleImageAsset = {
    uri: "test-image-uri",
    width: 100,
    height: 100,
  };

  it("should throw an error if used outside of ImagePickerProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useImagePicker must be used within an ImagePickerProvider"
    );
  });

  it("provides selectImage and takePhoto functions", () => {
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: false,
      assets: [sampleImageAsset],
    });
    jest.spyOn(ImagePicker, "launchCameraAsync").mockResolvedValue({
      canceled: false,
      assets: [sampleImageAsset],
    });

    const { getByTestId } = renderWithProviders(
      <ImagePickerProvider>
        <TestComponent />
      </ImagePickerProvider>
    );

    const selectImageButton = getByTestId("select-image");
    const takePhotoButton = getByTestId("take-photo");

    fireEvent.press(selectImageButton);
    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
      mediaTypes: ["images"],
      exif: true,
      quality: 1,
      allowsMultipleSelection: false,
      selectionLimit: 1,
    });

    fireEvent.press(takePhotoButton);
    expect(ImagePicker.launchCameraAsync).toHaveBeenCalledWith({
      mediaTypes: ["images"],
      exif: true,
      quality: 1,
    });
  });

  it("handles canceled image", async () => {
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: true,
      assets: null,
    });
    jest.spyOn(ImagePicker, "launchCameraAsync").mockResolvedValue({
      canceled: true,
      assets: null,
    });

    const { getByTestId } = renderWithProviders(
      <ImagePickerProvider>
        <TestComponent />
      </ImagePickerProvider>
    );

    const selectImageButton = getByTestId("select-image");
    const takePhotoButton = getByTestId("take-photo");

    fireEvent.press(selectImageButton);
    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();

    fireEvent.press(takePhotoButton);
    expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
  });
});
