import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { LoadingTermsList } from "./loading";
import { TermsListProvider, useTermsList } from "../contexts";
import { SignUpForm } from "@widgets/signupform";
import { TermSimple } from "@entities/terms";
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

  const goToTermsDetailPage = (id: number) => {
    router.push(`/signup/terms/${id}`);
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
      <TermSimple
        title="모두 동의 합니다."
        checked={isAllChecked}
        toggleChecked={toggleAll}
      />
      <Divider />
      {terms.map((term) => (
        <TermSimple
          key={term.id}
          title={`(${term.is_required ? "필수" : "선택"}) ${term.title}`}
          checked={isTermChecked(term.id)}
          toggleChecked={() => toggleCheckTerm(term.id)}
          pressRead={
            term.content ? () => goToTermsDetailPage(term.id) : undefined
          }
        />
      ))}
      <View />
    </SignUpForm>
  );
}
