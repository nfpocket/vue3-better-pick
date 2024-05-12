# Vue3BetterPick (Tailwindcss)

## Usage

```vue
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
```

## Props

| prop            | type                           | default            |
| --------------- | ------------------------------ | ------------------ |
| type            | "datetime" \| "date" \| "time" | "datetime"         |
| placeholder     | string                         | "Datum auswählen"  |
| invalidDateText | string                         | "Ungültiges Datum" |
| format          | string                         | "dd.MM.yyyy HH:mm" |
| ui              | DatePickerUiStyling            | undefined          |

### DatePickerUiStyling

You can style the DatePicker-Component using tailwind by passing the style-description-object to the component.

Whatever you pass in gets merged with the default.

Example:

```ts
<DateTimePicker
  :ui="{
    content: {
      picker: {
        date: {
          controls: {
            navigation: {
              button:
                'rounded-full hover:bg-red-500 p-1 aspect-square w-8 h-8 flex items-center justify-center',
            },
          },
        },
      },
    },
  }"
```

#### Shape of the description-type

```ts
type DatePickerUiStyling = {
  trigger: {
    wrapper: string;
    input: string;
  };
  content: {
    wrapper: string;
    picker: {
      wrapper: string;
      date: {
        wrapper: string;
        controls: {
          wrapper: string;
          monthYear: {
            wrapper: string;
            month: {
              button: string;
              content: {
                wrapper: string;
                button: {
                  base: string;
                  active: string;
                  current: string;
                };
              };
            };
            year: {
              button: string;
              content: {
                wrapper: string;
                button: {
                  base: string;
                  active: string;
                  current: string;
                };
              };
            };
          };
          navigation: {
            wrapper: string;
            button: string;
          };
        };
        daysGrid: {
          wrapper: string;
          weekDay: string;
          offset: string;
          day: {
            base: string;
            selected: string;
            today: string;
          };
        };
      };
      time: {
        wrapper: string;
        timeInfo: string;
        pickersWrapper: string;
      };
    };
  };
};
```

#### Default description values

```ts
const datePickerUiStyling: DatePickerUiStyling = {
  trigger: {
    wrapper:
      "border border-black rounded-md p-1 focus-within:border-[color:var(--better-pick-primary)]",
    input:
      "w-full focus:border-none focus:ring-0 focus:outline-none bg-transparent",
  },
  content: {
    wrapper: "p-1 bg-white shadow-md",
    picker: {
      wrapper: "flex gap-2",
      date: {
        wrapper: "flex flex-col",
        controls: {
          wrapper: "flex items-center justify-between",
          monthYear: {
            wrapper: "flex items-center",
            month: {
              button:
                "rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1",
              content: {
                wrapper:
                  "p-1 bg-white shadow-md grid grid-cols-3 gap-2 overflow-auto h-64",
                button: {
                  base: "text-center rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1",
                  active: "",
                  current: "",
                },
              },
            },
            year: {
              button:
                "rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1",
              content: {
                wrapper:
                  "p-1 bg-white shadow-md grid grid-cols-4 gap-2 overflow-auto h-64",
                button: {
                  base: "text-center rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1",
                  active: "",
                  current: "",
                },
              },
            },
          },
          navigation: {
            wrapper: "flex items-center",
            button:
              "rounded-full hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1 aspect-square w-6 h-6 flex items-center justify-center",
          },
        },
        daysGrid: {
          wrapper: "grid",
          weekDay: "text-center aspect-square p-1 font-semibold",
          offset: "text-center aspect-square p-1",
          day: {
            base: "text-center rounded-full border border-transparent aspect-square p-1 cursor-pointer hover:bg-[color:rgba(var(--better-pick-primary)/0.25)]",
            selected:
              "!bg-[color:rgba(var(--better-pick-primary)/0.75)] text-white",
            today: "border-gray-500",
          },
        },
      },
      time: {
        wrapper: "flex flex-col p-1",
        timeInfo: "text-center",
        pickersWrapper: "flex-1 flex gap-2 w-[150px] items-center",
      },
    },
  },
};
```

## Todos
- Dark Theme
- More props, for example 'clearable'
- Date Range
- Multi-Dates