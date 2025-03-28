<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { dbCollectionEnum } from "~/constants";
import type { ICustomer } from "~/types/deals.types";

useSeoMeta({
  title: "Customers | CRM System",
});

const { $appwrite } = useNuxtApp();
const router = useRouter();

const { data: customers, isLoading } = useQuery({
  queryKey: ["customers"],
  queryFn: () =>
    $appwrite.DB.listDocuments($appwrite.DB_ID, dbCollectionEnum.customers),
});
</script>

<template>
  <div>
    <PageHeader title="Our customers" />
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[200px]">Avatar</UiTableHead>
          <UiTableHead class="w-[300px]">Name</UiTableHead>
          <UiTableHead class="w-[200px]">Email</UiTableHead>
          <UiTableHead>From resource</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="customer in (customers?.documents as unknown as ICustomer[])"
          :key="customer.$id"
        >
          <UiTableCell>
            <NuxtImg
              :src="customer.avatar_url"
              :alt="customer.name"
              width="50"
              height="50"
              class="rounded-full"
            />
          </UiTableCell>
          <UiTableCell
            class="font-medium hover:text-orange-500 cursor-pointer"
            @click="() => router.push(`/customers/edit/${customer.$id}`)"
          >
            {{ customer.name }}
          </UiTableCell>
          <UiTableCell>{{ customer.email }}</UiTableCell>
          <UiTableCell>{{ customer.from_source }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
