<script lang="ts" setup>
import dayjs from "dayjs";
import type { IDeal } from "~/types/deals.types";
import { useComments } from "./useComments";
import { useCreateComment } from "./useCreateComment";

const { data, refetch, isLoading } = useComments();
const { comment, writeComment } = useCreateComment({ refetch });

const card = data as unknown as IDeal;
</script>

<template>
  <div class="space-y-4 w-full">
    <UiInput
      v-model="comment"
      placeholder="Write a comment..."
      @keyup.enter="writeComment"
    />

    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
    <div v-else-if="card">
      <div
        v-for="msg in card?.comments"
        :key="msg.$id"
        class="flex items-start mt-5"
      >
        <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
        <div class="border-border bg-slate-800 rounded p-3 w-full">
          <div class="mb-2 text-sm">
            Comment {{ dayjs(msg.$createdAt).format("HH:mm") }}
          </div>
          <p>{{ msg.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
