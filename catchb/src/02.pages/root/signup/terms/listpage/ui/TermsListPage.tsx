import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { LoadingTermsList } from "./loading";
import { SignUpForm } from "@widgets/signupform";
import {
  TermsListProvider,
  useTermsList,
} from "@features/signup/agree-to-terms";
import { CheckAllTerms, TermSimple } from "@entities/terms";
import { Divider } from "@shared/ui/Dividers";

export function TermsListPage() {
  return (
    <TermsListProvider>
      <ListComponents />
    </TermsListProvider>
  );
}

function ListComponents() {
  const {
    terms,
    isLoading,
    isAllChecked,
    buttonActive,
    isTermChecked,
    toggleAll,
    toggleCheckTerm,
  } = useTermsList();
  const { mode } = useLocalSearchParams<{ mode: string }>();

  const goToNextPage = () => {
    if (mode === "catchb") {
      router.push("/signup/username");
    } else {
      router.push("/signup/phone");
    }
  };

  if (isLoading || !terms) return <LoadingTermsList />;

  return (
    <SignUpForm
      title="Catch B 약관에 동의해주세요!"
      subtitle="캐치비 이용을 위해 필수 약관 동의가 필요합니다."
      buttonText="다음으로"
      buttonOnPress={goToNextPage}
      buttonDisabled={!buttonActive}
    >
      <Divider />
      <CheckAllTerms checked={isAllChecked} toggle={toggleAll} />
      <Divider />
      {terms.map((term) => (
        <TermSimple
          key={term.id}
          term={term}
          isChecked={isTermChecked(term.id)}
          toggleCheck={() => toggleCheckTerm(term.id)}
        />
      ))}
      <View />
    </SignUpForm>
  );
}
