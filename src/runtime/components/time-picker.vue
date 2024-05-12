<template>
  <div :class="cn(styling.wrapper)">
    <div :class="cn(styling.timeInfo)">{{ timeInfoString }}</div>
    <div :class="cn(styling.pickersWrapper)">
      <VueScrollPicker :options="hourOptions" v-model="hoursModelValue" />
      <VueScrollPicker :options="minuteOptions" v-model="minutesModelValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCssVar } from "@vueuse/core";
import { computed, defineModel, reactive, ref } from "vue";
import { VueScrollPicker } from "vue-scroll-picker";
import "vue-scroll-picker/lib/style.css";
import { cn, deepMerge } from "../utils/classMerge";
import type { DateObject } from "@/src/runtime/types/datetime";
import { debounce } from "../utils/debounce";
import {
  defaultDatePickerStyling,
  type DatePickerStyling,
} from "../types/styling";

type Styling = DatePickerStyling["time"];

const props = defineProps<{
  ui: Styling;
  modelDate: Date | null;
}>();
const styling = reactive(
  deepMerge(defaultDatePickerStyling.time, props.ui || {})
);

const modelValue = defineModel<DateObject>();

const hoursModelValue = computed<number>({
  get: () => {
    return modelValue.value ? new Date(modelValue.value).getHours() : 0;
  },
  set: debounce((value) => {
    const date = modelValue.value ? new Date(modelValue.value) : new Date();
    date.setHours(value);
    modelValue.value = date;
  }),
});

const minutesModelValue = computed<number>({
  get: () => {
    return modelValue.value ? new Date(modelValue.value).getMinutes() : 0;
  },
  set: debounce((value) => {
    const date = modelValue.value ? new Date(modelValue.value) : new Date();
    date.setMinutes(value);
    modelValue.value = date;
  }),
});

const timeInfoString = computed(() => {
  return `${hoursModelValue.value
    .toString()
    .padStart(2, "0")}:${minutesModelValue.value.toString().padStart(2, "0")}`;
});

const hourOptions = ref(
  Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
);
const minuteOptions = ref(
  Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
);

const primaryColorFromVar = useCssVar("--better-pick-primary");
const primaryColor = computed(() => {
  return `rgb(${primaryColorFromVar.value})`;
});
</script>

<style>
.vue-scroll-picker-item-selected {
  color: v-bind(primaryColor);
}
</style>
