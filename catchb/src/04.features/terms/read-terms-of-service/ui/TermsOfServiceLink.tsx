import * as Linking from "expo-linking";

import { TermsLink } from "@entities/terms";

export function TermsOfServiceLink() {
  const goToTermsOfService = () => {
    Linking.openURL("https://www.sweepseries.com/terms-of-service");
  };

  return <TermsLink text="이용약관" onPress={goToTermsOfService} />;
}
