<template>
  <Popover v-model="showPopover">
    <template #trigger>
      <button :class="cn(styling.button)" @click="showPopover = !showPopover">
        {{ monthName }}
      </button>
    </template>

    <template #content>
      <div :class="cn(styling.content.wrapper)">
        <button
          v-for="(month, index) in allMonths"
          :key="month"
          :class="cn(styling.content.button.base)"
          @click="handleSetMonth(index)"
        >
          {{ month }}
        </button>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { computed, defineModel, reactive, ref } from "vue";
import { cn } from "../../utils/classMerge";
import { deepMerge, type DeepPartial } from "../../utils/classMerge";
import { getDateFromMonthYearNumber, getMonthName } from "../../utils/datetime";
import {
  defaultDatePickerMonthStyling,
  type DatePickerMonthStyling,
} from "../../types/styling";

const props = defineProps<{
  ui: DeepPartial<DatePickerMonthStyling>;
}>();
const styling = reactive(
  deepMerge(defaultDatePickerMonthStyling, props.ui || {})
);

const monthNumber = defineModel<number>("monthNumber", {
  required: true,
});
const yearNumber = defineModel<number>("yearNumber", {
  required: true,
});

const month = computed(() => {
  return getDateFromMonthYearNumber(monthNumber.value, yearNumber.value);
});
const monthName = computed(() => {
  return getMonthName(month.value);
});

const showPopover = ref(false);

const allMonths = ref([
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
]);

const handleSetMonth = (index: number) => {
  monthNumber.value = index;
  showPopover.value = false;
};
</script>
