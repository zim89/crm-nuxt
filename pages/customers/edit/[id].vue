<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { dbCollectionEnum } from "~/constants";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

interface ICustomerFormState {
  name: string;
  email: string;
  avatar_url: string;
  from_source: string;
}

useSeoMeta({
  title: `Edit customer | CRM System`,
});

const { $appwrite } = useNuxtApp();

const route = useRoute();
const customerId = route.params.id as string;

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>();

const {
  data,
  isSuccess,
  isPending: isQueryPending,
} = useQuery({
  queryKey: ["get customer", customerId],
  queryFn: () =>
    $appwrite.DB.getDocument(
      $appwrite.DB_ID,
      dbCollectionEnum.customers,
      customerId
    ),

  staleTime: 0,
  gcTime: 0,
});

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || "",
    name: initialData.name,
  });
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [fromSource, fromSourceAttrs] = defineField("from_source");

const { mutate, isPending } = useMutation({
  mutationKey: ["update customer", customerId],
  mutationFn: (data: ICustomerFormState) =>
    $appwrite.DB.updateDocument(
      $appwrite.DB_ID,
      dbCollectionEnum.customers,
      customerId,
      data
    ),
});

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ["upload image"],
  mutationFn: (file: File) =>
    $appwrite.storage.createFile($appwrite.DB_STORAGE, uuid(), file),
  onSuccess(data) {
    const response = $appwrite.storage.getFileDownload(
      $appwrite.DB_STORAGE,
      data.$id
    );
    setFieldValue("avatar_url", response);
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <div>
    <PageHeader
      :title="`Edit ${((data as unknown as ICustomerFormState)?.name || '')}`"
    />

    <div v-if="isQueryPending">Loading...</div>
    <form v-else-if="data" class="form" @submit="onSubmit">
      <UiInput
        v-model="name"
        placeholder="Name"
        v-bind="nameAttrs"
        type="text"
        class="input"
      />

      <UiInput
        v-model="email"
        placeholder="Email"
        v-bind="emailAttrs"
        type="text"
        class="input"
      />
      <UiInput
        v-model="fromSource"
        placeholder="From source?"
        v-bind="fromSourceAttrs"
        type="text"
        class="input"
      />

      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt=""
        width="50"
        height="50"
        class="rounded-full my-4"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">Logo</div>
          <UiInput
            type="file"
            :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
            :disabled="isUploadImagePending"
          />
        </label>
      </div>

      <UiButton :disabled="isPending" variant="secondary" class="mt-3">
        {{ isPending ? "Loading..." : "Save" }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>
