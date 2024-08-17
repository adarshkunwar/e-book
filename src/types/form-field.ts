type TInputType =
  | "text"
  | "number"
  | "date"
  | "email"
  | "password"
  | "checkbox"
  | "radio"
  | "tel"
  | "textarea";

type TWidth = "full" | "half" | "third";

export type TFormField<T> = (
  | {
      type: TInputType;
    }
  | {
      type: "select";
      option: {
        value: string;
        label: string;
      }[];
    }
) & {
  label: string;
  required: boolean;
  placeholder?: string;
  width: TWidth;
  name: keyof T;
};
