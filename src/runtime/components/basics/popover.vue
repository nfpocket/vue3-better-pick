<template>
  <div :class="class" ref="popoverTriggerRef">
    <slot name="trigger"> </slot>
  </div>

  <Teleport v-if="showPopover" to="body">
    <div
      :ref="(element) => (popoverRef = element as HTMLDivElement)"
      :class="popoverClass"
      :style="{
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        width: useParentWidth ? popoverWidth : width,
      }"
    >
      <slot name="content"> </slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { defineModel, nextTick, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    class?: string;
    popoverClass?: string;
    useParentWidth?: boolean;
    width?: string | number;
    offset?: number;
    align?: "left" | "right" | "center";
    position?: "top" | "bottom";
    resize?: boolean;
    ignoreDatepicker?: boolean;
  }>(),
  {
    offset: 0,
    useParentWidth: false,
    position: "bottom",
  }
);

const showPopover = defineModel<boolean>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const popoverTriggerRef = ref<HTMLDivElement>();
const popoverRef = ref<HTMLDivElement>();

const left = ref(0);
const top = ref(0);

const popoverWidth = ref("");

const handleClose = async () => {
  showPopover.value = false;
};

const handleCloseModal = (event: Event) => {
  if (!showPopover.value) return;

  if (!popoverRef.value) {
    handleClose();
    return;
  }

  if (
    popoverRef.value.compareDocumentPosition(event.target as Node) ===
    Node.DOCUMENT_POSITION_FOLLOWING
  ) {
    return;
  }

  if (popoverRef.value.contains(event.target as Node)) {
    return;
  }

  handleClose();
};

onClickOutside(popoverTriggerRef, (event) => {
  handleCloseModal(event);
});

const handleDropdownPosition = async () => {
  await nextTick();
  const popoverContainer = popoverTriggerRef.value;

  if (!popoverContainer || !popoverRef.value) return;

  const popoverContainerRect = popoverContainer.getBoundingClientRect();
  if (props.useParentWidth) {
    popoverWidth.value = `${popoverContainerRect.width}px`;
    await nextTick();
  }

  const popoverRect = popoverRef.value.getBoundingClientRect();

  const popoverContainerLeft = popoverContainerRect.left;
  const popoverContainerTop = popoverContainerRect.top;

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  left.value = popoverContainerLeft;
  top.value = popoverContainerTop + popoverContainerRect.height;
  if (props.position === "top") {
    top.value = popoverContainerTop - popoverRect.height;
  } else if (props.position === "bottom") {
    top.value = popoverContainerTop + popoverContainerRect.height;
  }

  switch (props.align) {
    case "left":
      left.value = popoverContainerLeft;
      break;
    case "right":
      left.value =
        popoverContainerLeft + popoverContainerRect.width - popoverRect.width;
      break;
    case "center":
      left.value =
        popoverContainerLeft +
        popoverContainerRect.width / 2 -
        popoverRect.width / 2;
      break;
  }

  if (left.value < props.offset) {
    left.value = props.offset;
  } else if (left.value + popoverRect.width > windowWidth - props.offset) {
    left.value = windowWidth - popoverRect.width - props.offset;
  }
  if (top.value + popoverRect.height > windowHeight - props.offset) {
    top.value = windowHeight - popoverRect.height - props.offset;
  } else if (top.value < props.offset) {
    top.value = props.offset;
  }
};

const refreshPositionInterval = ref<NodeJS.Timeout>();
watch(showPopover, () => {
  if (!showPopover.value) {
    if (refreshPositionInterval.value) {
      clearInterval(refreshPositionInterval.value);
    }
    return;
  }

  handleDropdownPosition();
  refreshPositionInterval.value = setInterval(handleDropdownPosition, 100);
});
</script>
