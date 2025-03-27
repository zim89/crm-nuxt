<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { dbCollectionEnum } from "~/constants";
import type { IDeal } from "~/types/deals.types";

const { $appwrite } = useNuxtApp();
const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
    default: null,
  },
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    $appwrite.DB.createDocument(
      $appwrite.DB_ID,
      dbCollectionEnum.deals,
      uuid(),
      data
    ),
  onSuccess() {
    if (props.refetch) {
      props.refetch();
    }
    handleReset();
    isOpenForm.value = false;
  },
});

const onSubmit = handleSubmit((values: IDealFormState) => {
  mutate({ ...values, price: Number(values.price) });
});
</script>

<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-35 hover:opacity-100 hover:text-[#a252c8]"
      @click="isOpenForm = !isOpenForm"
    >
      <Icon
        v-if="isOpenForm"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="35"
      />
      <Icon
        v-else
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
        size="35"
      />
    </button>
  </div>
  <form v-if="isOpenForm" class="form" @submit="onSubmit">
    <UiInput
      v-model="name"
      placeholder="Name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />
    <UiInput
      v-model="price"
      placeholder="Amount"
      v-bind="priceAttrs"
      type="text"
      class="input"
    />
    <UiInput
      v-model="customerEmail"
      placeholder="Email"
      v-bind="customerEmailAttrs"
      type="text"
      class="input"
    />
    <UiInput
      v-model="customerName"
      placeholder="Company"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />

    <div class="text-center">
      <button class="btn" :disabled="isPending">
        {{ isPending ? "Loading..." : "Create" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-2 px-4 rounded border-[#67458b] hover:border-[#aebed5] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
