<template>
  <Popover v-model="showPopover">
    <template #trigger>
      <button :class="cn(styling.button)" @click="showPopover = !showPopover">
        {{ correctedYearNumber }}
      </button>
    </template>

    <template #content>
      <div ref="yearsRef" :class="cn(styling.content.wrapper)">
        <button
          v-for="year in years"
          :key="year"
          :class="cn(styling.content.button.base)"
          @click="handleSetYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { computed, defineModel, nextTick, reactive, ref, watch } from "vue";
import {
  defaultDatePickerYearStyling,
  type DatePickerYearStyling,
} from "../../types/styling";
import { cn, deepMerge, type DeepPartial } from "../../utils/classMerge";
import { getDateFromMonthYearNumber } from "../../utils/datetime";

const props = defineProps<{
  ui: DeepPartial<DatePickerYearStyling>;
}>();
const styling = reactive(
  deepMerge(defaultDatePickerYearStyling, props.ui || {})
);

const monthNumber = defineModel<number>("monthNumber", {
  required: true,
});
const yearNumber = defineModel<number>("yearNumber", {
  required: true,
});

const year = computed(() => {
  return getDateFromMonthYearNumber(monthNumber.value, yearNumber.value);
});
const correctedYearNumber = computed(() => {
  return year.value.getFullYear();
});

const yearsRef = ref<HTMLElement | null>(null);

const showPopover = ref(false);
const yearsOffset = 50;

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - yearsOffset; i <= currentYear + yearsOffset; i++) {
    years.push(i);
  }
  return years;
};

const years = ref<number[]>(getYears());

const handleSetYear = (year: number) => {
  yearNumber.value = year;
  showPopover.value = false;
};

watch(showPopover, async () => {
  if (!showPopover.value) {
    return;
  }

  await nextTick();

  if (!yearsRef.value) {
    return;
  }

  yearsRef.value.scrollTop =
    yearsRef.value.scrollHeight / 2 - yearsRef.value.clientHeight / 2;
});
</script>
