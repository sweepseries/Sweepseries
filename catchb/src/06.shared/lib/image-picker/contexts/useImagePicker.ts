import { createContext, useContext } from "react";
import { ImagePickerAsset } from "expo-image-picker";

export interface ImagePickerContextType {
  selectImage: (maxImages: number) => Promise<ImagePickerAsset[] | null>;
  takePhoto: () => Promise<ImagePickerAsset | null>;
}

export const ImagePickerContext = createContext<
  ImagePickerContextType | undefined
>(undefined);

export function useImagePicker() {
  const context = useContext(ImagePickerContext);
  if (!context) {
    throw new Error(
      "useImagePicker must be used within an ImagePickerProvider"
    );
  }
  return context;
}
