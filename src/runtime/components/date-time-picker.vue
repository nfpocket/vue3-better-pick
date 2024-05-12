<template>
  <Popover v-model="showPopover">
    <template #trigger>
      <div
        :class="cn(styling.trigger.wrapper)"
        @click="showPopover = !showPopover"
      >
        <input
          :value="displayValue"
          readonly
          :class="cn(styling.trigger.input)"
          :placeholder="props.placeholder"
        />
      </div>
    </template>

    <template #content>
      <div :class="cn(styling.content.wrapper)">
        <StandaloneDatetimePicker
          v-model="modelValue"
          :type="type"
          @close="showPopover = false"
          :ui="styling.content.picker"
        />
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import type { DatetimeType } from "@/src/runtime/types/datetime";
import { DateTime } from "luxon";
import { computed, defineModel, reactive, ref } from "vue";
import { cn, deepMerge, type DeepPartial } from "../utils/classMerge";
import StandaloneDatetimePicker from "./standalone-datetime-picker.vue";
import {
  defaultDatePickerUiStyling,
  type DatePickerUiStyling,
} from "../types/styling";

const props = withDefaults(
  defineProps<{
    type: DatetimeType;
    placeholder?: string;
    invalidDateText?: string;
    format?: string;
    ui?: DeepPartial<DatePickerUiStyling>;
  }>(),
  {
    type: "datetime",
    placeholder: "Datum auswählen",
    invalidDateText: "Ungültiges Datum",
    format: "dd.MM.yyyy",
  }
);

const styling = reactive(deepMerge(defaultDatePickerUiStyling, props.ui || {}));

const modelValue = defineModel<null | undefined | Date | string>();

const showPopover = ref(false);

const displayValue = computed(() => {
  if (modelValue.value === null || modelValue.value === undefined) {
    return null;
  }

  try {
    const date = new Date(modelValue.value);

    return DateTime.fromISO(date.toISOString()).toFormat(props.format);
  } catch (e) {
    return props.invalidDateText;
  }
});
</script>

<style>
:root {
  --better-pick-primary: #2563eb;
}
</style>
