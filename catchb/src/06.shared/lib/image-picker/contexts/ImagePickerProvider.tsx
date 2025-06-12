import { useCallback, useMemo } from "react";
import { launchImageLibraryAsync, launchCameraAsync } from "expo-image-picker";

import { ImagePickerContext, ImagePickerContextType } from "./useImagePicker";

export function ImagePickerProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const selectImage = useCallback(async (maxImages: number) => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      exif: true,
      quality: 1,
      allowsMultipleSelection: maxImages > 1,
      selectionLimit: maxImages,
    });

    if (!result.canceled) {
      return result.assets;
    }

    return null;
  }, []);

  const takePhoto = useCallback(async () => {
    const result = await launchCameraAsync({
      mediaTypes: ["images"],
      exif: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0];
    }

    return null;
  }, []);

  const value = useMemo<ImagePickerContextType>(
    () => ({
      selectImage,
      takePhoto,
    }),
    [selectImage, takePhoto]
  );

  return (
    <ImagePickerContext.Provider value={value}>
      {children}
    </ImagePickerContext.Provider>
  );
}
