<template>
  <div :class="cn(styling.wrapper)">
    <div :class="cn(styling.monthYear.wrapper)">
      <MonthSelectPopover
        v-model:monthNumber="monthNumber"
        v-model:yearNumber="yearNumber"
        :ui="styling.monthYear.month"
      />
      <YearSelectPopover
        v-model:monthNumber="monthNumber"
        v-model:yearNumber="yearNumber"
        :ui="styling.monthYear.year"
      />
    </div>

    <div :class="cn(styling.navigation.wrapper)">
      <button :class="cn(styling.navigation.button)" @click="previousMonth">
        <Icon size="1.25rem" name="i-tabler-chevron-left" />
      </button>
      <button :class="cn(styling.navigation.button)" @click="nextMonth">
        <Icon size="1.25rem" name="i-tabler-chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel, reactive } from "vue";
import {
  defaultDatePickerControlsStyling,
  type DatePickerControlsStyling,
} from "../../types/styling";
import { cn, deepMerge } from "../../utils/classMerge";

const props = defineProps<{
  ui: DatePickerControlsStyling;
}>();

const styling = reactive(
  deepMerge(defaultDatePickerControlsStyling, props.ui || {})
);

const monthNumber = defineModel<number>("monthNumber", {
  required: true,
});
const yearNumber = defineModel<number>("yearNumber", {
  required: true,
});

const previousMonth = () => {
  if (monthNumber.value === 0) {
    monthNumber.value = 11;
    yearNumber.value -= 1;
  } else {
    monthNumber.value -= 1;
  }
};

const nextMonth = () => {
  if (monthNumber.value === 11) {
    monthNumber.value = 0;
    yearNumber.value += 1;
  } else {
    monthNumber.value += 1;
  }
};
</script>
