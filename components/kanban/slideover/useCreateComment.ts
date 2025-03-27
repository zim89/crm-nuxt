import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { dbCollectionEnum } from "~/constants";
import { useDealSlideStore } from "~/stores/deal-slide.store";

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const { $appwrite } = useNuxtApp();
  const store = useDealSlideStore();
  const comment = ref<string>();

  const { mutate } = useMutation({
    mutationKey: ["add comments", comment.value],
    mutationFn: () =>
      $appwrite.DB.createDocument(
        $appwrite.DB_ID,
        dbCollectionEnum.comments,
        uuid(),
        {
          text: comment.value,
          deal: store.card?.id,
        }
      ),
    onSuccess: () => {
      refetch();
      comment.value = "";
    },
  });

  const writeComment = () => {
    if (!comment.value) return;
    mutate();
  };

  return {
    writeComment,
    comment,
  };
}
