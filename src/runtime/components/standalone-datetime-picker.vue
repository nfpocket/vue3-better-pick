<template>
  <div :class="cn(styling.wrapper)">
    <DatePicker
      v-if="type === 'date' || type === 'datetime'"
      :ui="styling.date"
      v-model="modelValue"
      v-model:monthNumber="currentMonthNumber"
      v-model:yearNumber="currentYearNumber"
      :modelDate="modelDate"
    />
    <TimePicker
      v-if="type === 'time' || type === 'datetime'"
      :ui="styling.time"
      v-model="modelValue"
      :modelDate="modelDate"
    />
  </div>
</template>

<script setup lang="ts">
import type { DateObject, DatetimeType } from "@/src/runtime/types/datetime";
import { computed, defineModel, reactive, ref } from "vue";
import { cn, deepMerge } from "../utils/classMerge";
import DatePicker from "./date-picker.vue";
import TimePicker from "./time-picker.vue";
import {
  defaultDatePickerStyling,
  type DatePickerStyling,
} from "../types/styling";

const props = defineProps<{
  type: DatetimeType;
  ui: DatePickerStyling;
}>();

const styling = reactive(deepMerge(defaultDatePickerStyling, props.ui || {}));

const modelValue = defineModel<DateObject>();
const modelDate = computed(() => {
  if (modelValue.value === null || modelValue.value === undefined) {
    return null;
  }

  try {
    return new Date(modelValue.value);
  } catch (e) {
    return null;
  }
});

const currentMonthNumber = ref((modelDate.value || new Date()).getUTCMonth());
const currentYearNumber = ref((modelDate.value || new Date()).getUTCFullYear());
</script>
