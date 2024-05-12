<template>
  <div class="p-4 flex flex-col gap-8">
    <label>
      datetime
      <DateTimePicker
        v-model="date"
        type="datetime"
        format="dd.MM.yyyy HH:mm"
        @update:modelValue="console.log"
      />
    </label>
    <label>
      date
      <DateTimePicker
        v-model="date"
        type="date"
        format="dd.MM.yyyy"
        @update:modelValue="console.log"
      />
    </label>
    <label>
      time
      <DateTimePicker
        v-model="date"
        type="time"
        format=" HH:mm"
        @update:modelValue="console.log"
      />
    </label>

    <div class="text-lg">Selected date: {{ date }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const testDate = new Date();
testDate.setMonth(0);

const date = ref<Date | null>(new Date());
</script>

<style>
:root {
  --better-pick-primary: 117 143 237;
}
</style>
