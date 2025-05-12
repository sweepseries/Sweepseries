import * as Linking from "expo-linking";

import { TermsLink } from "@entities/terms";

export function PrivacyPolicyLink() {
  const goToPrivacyPolicy = () => {
    Linking.openURL("https://www.sweepseries.com/privacy-policy");
  };

  return <TermsLink text="개인정보 처리방침" onPress={goToPrivacyPolicy} />;
}
