import { TouchableOpacity } from "react-native";
import { isAxiosError } from "axios";

import { CommunityStat, PostDetailType, useLikePost } from "@entities/posts";
import { useAlert } from "@shared/lib/alert";
import { useColors } from "@shared/lib/colors";

interface Props {
  postDetails: PostDetailType;
  profileId: string | undefined;
}

/**
 * 게시글 상세 페이지에서 좋아요 여부를 보여주고,
 * 해당 컴포넌트를 누르면 좋아요/취소를 처리하는 버튼 컴포넌트.
 */

export function PostLikeButton({ postDetails, profileId }: Readonly<Props>) {
  if (profileId)
    return <ButtonComponent postDetails={postDetails} profileId={profileId} />;

  return (
    <CommunityStat
      icon="heart-outline"
      value={postDetails.num_likes}
      color="lowEmphasis"
    />
  );
}

interface ButtonProps {
  postDetails: PostDetailType;
  profileId: string;
}

function ButtonComponent({ postDetails, profileId }: Readonly<ButtonProps>) {
  const { mutate: likePost } = useLikePost(postDetails.id, profileId);
  const { showAlert } = useAlert();
  const { colors } = useColors();

  const handleLikePost = () => {
    likePost(undefined, {
      onError: (error) => {
        if (isAxiosError(error) && error.response?.data?.error) {
          showAlert({
            title: "오류 발생",
            message: error.response.data.error,
          });
        } else {
          showAlert({
            title: "오류 발생",
            message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
          });
        }
      },
    });
  };

  return (
    <TouchableOpacity onPress={handleLikePost} testID="like-button">
      <CommunityStat
        icon={postDetails.is_liked ? "heart" : "heart-outline"}
        value={postDetails.num_likes}
        color={postDetails.is_liked ? colors.primary : colors.lowEmphasis}
      />
    </TouchableOpacity>
  );
}
