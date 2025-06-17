import FormData from "form-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { PostCreateType, PostDetailType } from "../models/types";
import { ErrorResponse } from "@shared/api";

async function createPost(data: PostCreateType): Promise<PostDetailType> {
  const formData = new FormData();

  if (data.image_files.length > 0) {
    data.image_files.forEach((image) => {
      formData.append("image_files", {
        uri: image.uri,
        name: image.fileName ?? `image-${Date.now()}.jpg`,
        type: image.mimeType ?? "image/jpeg",
      });
    });
  }

  formData.append("forum_id", data.forum_id.toString());
  formData.append("tag_id", data.tag_id.toString());
  formData.append("title", data.title);
  formData.append("content", data.content);

  const res = await axios.post<PostDetailType>("/api/v1/posts/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Profile-ID": data.author_id,
    },
  });

  return res.data;
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<PostDetailType, AxiosError<ErrorResponse>, PostCreateType>(
    {
      mutationFn: (data) => createPost(data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["posts", data.forum.name],
        });
        queryClient.setQueryData<PostDetailType>(["post", data.id], data);
      },
    }
  );
}
