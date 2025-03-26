<script lang="ts" setup></script>

<template>
  <section class="grid grid-cols-[1fr_6fr] min-h-screen">
    <WidgetSidebar />

    <div>
      <slot />
    </div>
  </section>
</template>
