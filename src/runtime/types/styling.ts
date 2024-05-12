export type DatePickerYearStyling = {
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

export const defaultDatePickerYearStyling: DatePickerYearStyling = {
  button: "rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1",
  content: {
    wrapper: "p-1 bg-white shadow-md grid grid-cols-4 gap-2 overflow-auto h-64",
    button: { base: "text-center rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1", active: "", current: "" },
  },
};

export type DatePickerMonthStyling = {
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

export const defaultDatePickerMonthStyling: DatePickerMonthStyling = {
  button: "rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1",
  content: {
    wrapper: "p-1 bg-white shadow-md grid grid-cols-3 gap-2 overflow-auto h-64",
    button: { base: "text-center rounded-md hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1", active: "", current: "" },
  },
};

export type DatePickerMonthYearStyling = {
  wrapper: string;
  month: DatePickerMonthStyling;
  year: DatePickerYearStyling;
};

export const defaultDatePickerMonthYearStyling: DatePickerMonthYearStyling = {
  wrapper: "flex items-center",
  month: defaultDatePickerMonthStyling,
  year: defaultDatePickerYearStyling,
};

export type DatePickerControlsStyling = {
  wrapper: string;
  monthYear: DatePickerMonthYearStyling;
  navigation: {
    wrapper: string;
    button: string;
  };
};

export const defaultDatePickerControlsStyling: DatePickerControlsStyling = {
  wrapper: "flex items-center justify-between",
  monthYear: defaultDatePickerMonthYearStyling,
  navigation: {
    wrapper: "flex items-center",
    button: "rounded-full hover:bg-[color:rgba(var(--better-pick-primary)/0.25)] p-1 aspect-square w-6 h-6 flex items-center justify-center",
  },
};

export type DatePickerDaysGridStyling = {
  wrapper: string;
  weekDay: string;
  offset: string;
  day: {
    base: string;
    selected: string;
    today: string;
  };
};

export const defaultDatePickerDaysGridStyling: DatePickerDaysGridStyling = {
  wrapper: "grid",
  weekDay: "text-center aspect-square p-1 font-semibold",
  offset: "text-center aspect-square p-1",
  day: {
    base: "text-center rounded-full border border-transparent aspect-square p-1 cursor-pointer hover:bg-[color:rgba(var(--better-pick-primary)/0.25)]",
    selected: "!bg-[color:rgba(var(--better-pick-primary)/0.75)] text-white",
    today: "border-gray-500",
  },
};

export type DatePickerStyling = {
  wrapper: string;
  date: {
    wrapper: string;
    controls: DatePickerControlsStyling;
    daysGrid: DatePickerDaysGridStyling;
  };
  time: {
    wrapper: string;
    timeInfo: string;
    pickersWrapper: string;
  };
};

export const defaultDatePickerStyling: DatePickerStyling = {
  wrapper: "flex gap-2",
  date: {
    wrapper: "flex flex-col",
    controls: defaultDatePickerControlsStyling,
    daysGrid: defaultDatePickerDaysGridStyling,
  },
  time: {
    wrapper: "flex flex-col p-1",
    timeInfo: "text-center",
    pickersWrapper: "flex-1 flex gap-2 w-[150px] items-center",
  },
};

export type DatePickerUiStyling = {
  trigger: {
    wrapper: string;
    input: string;
  };
  content: {
    wrapper: string;
    picker: DatePickerStyling;
  };
};

export const defaultDatePickerUiStyling: DatePickerUiStyling = {
  trigger: {
    wrapper: "border border-black rounded-md p-1 focus-within:border-[color:var(--better-pick-primary)]",
    input: "w-full focus:border-none focus:ring-0 focus:outline-none bg-transparent",
  },
  content: {
    wrapper: "p-1 bg-white shadow-md",
    picker: defaultDatePickerStyling,
  },
};
