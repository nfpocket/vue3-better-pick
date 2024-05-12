<template>
  <div :class="cn(styling.wrapper)">
    <YearMonthControls
      v-model:monthNumber="monthNumber"
      v-model:yearNumber="yearNumber"
      :ui="styling.controls"
    />

    <div :class="cn(styling.daysGrid.wrapper)" :style="weekDaysGridStyle">
      <div
        v-for="day in weekDays"
        key="day"
        :class="cn(styling.daysGrid.weekDay)"
      >
        {{ day }}
      </div>

      <div
        v-for="offset in weekdayOffsetCurrentMonth"
        :key="offset"
        :class="cn(styling.daysGrid.offset)"
      ></div>
      <div
        v-for="date in displayDates"
        :key="date"
        :class="
          cn(
            styling.daysGrid.day.base,
            {
              [styling.daysGrid.day.selected]: isModelDate(date),
            },
            {
              [styling.daysGrid.day.today]: isToday(date),
            }
          )
        "
        @click="handleDateClick(date)"
      >
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DateObject } from "@/src/runtime/types/datetime";
import { computed, defineModel, reactive, ref } from "vue";
import { cn, deepMerge } from "../utils/classMerge";
import {
  getDateFromMonthYearNumber,
  getDaysInMonth,
  getFirstDayOfMonth,
  getWeekdayOffset,
  isSameDateByDayMonthYear,
} from "../utils/datetime";
import { defaultDatePickerStyling, type DatePickerStyling } from "../types/styling";

type Styling = DatePickerStyling["date"];

const props = defineProps<{
  ui: Styling;
  modelDate: Date | null;
}>();
const styling = reactive(
  deepMerge(defaultDatePickerStyling.date, props.ui || {})
);

const modelValue = defineModel<DateObject>();
const hours = computed(() => {
  return modelValue.value ? new Date(modelValue.value).getHours() : 0;
});
const minutes = computed(() => {
  return modelValue.value ? new Date(modelValue.value).getMinutes() : 0;
});

const monthNumber = defineModel<number>("monthNumber", {
  required: true,
});
const yearNumber = defineModel<number>("yearNumber", {
  required: true,
});

const currentMonth = computed(() => {
  return getDateFromMonthYearNumber(monthNumber.value, yearNumber.value);
});
const firstDayOfMonth = computed(() => {
  return getFirstDayOfMonth(currentMonth.value);
});
const daysInMonth = computed(() => {
  return getDaysInMonth(currentMonth.value);
});
const weekdayOffsetCurrentMonth = computed(() => {
  return getWeekdayOffset(firstDayOfMonth.value);
});

const displayDates = computed(() => {
  const dates = [];
  for (let i = 1; i <= daysInMonth.value; i++) {
    dates.push(i);
  }
  return dates;
});

const weekDays = ref(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);

const weekDaysGridStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${weekDays.value.length}, 1fr)`,
  };
});

const isModelDate = (day: number) => {
  if (!props.modelDate) {
    return false;
  }

  return isSameDateByDayMonthYear(
    props.modelDate,
    day,
    monthNumber.value,
    yearNumber.value
  );
};

const isToday = (day: number) => {
  return isSameDateByDayMonthYear(
    new Date(),
    day,
    monthNumber.value,
    yearNumber.value
  );
};

const handleDateClick = (day: number) => {
  const newDate = new Date(
    yearNumber.value,
    monthNumber.value,
    day,
    hours.value,
    minutes.value
  );

  modelValue.value = newDate;
};
</script>
