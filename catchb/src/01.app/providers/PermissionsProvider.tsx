import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import * as ImagePicker from "expo-image-picker";

interface Props {
  children: React.ReactNode;
}

// 각종 setup에 필요한 권한들을 요청하는 Provider
// 가장 바깥단에 위치해야 함

export function PermissionsProvider({ children }: Readonly<Props>) {
  useEffect(() => {
    const getImagePickerPermissions = async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    };

    getImagePickerPermissions();
    SplashScreen.hideAsync();
  }, []);

  return children;
}
