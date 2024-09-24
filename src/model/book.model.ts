import { TFormField } from "@/types/form-field";
import { z } from "zod";

export const registerFormSchema = z.object({
  authorId: z.string(),
  genre: z.string(),
  title: z.string(),
  data: z.string(),
  coverImage: z.string(),
});

export type TRegiserFormSchema = z.infer<typeof registerFormSchema>;

export const RegisterFormDefaultValue: Partial<TRegiserFormSchema> = {
  authorId: "",
  genre: "",
  title: "",
  data: "",
  coverImage: "",
};

export const RegisterFormField: TFormField<TRegiserFormSchema>[] = [
  {
    label: "Title",
    type: "text",
    placeholder: "eg. Mistborn",
    name: "title",
    required: true,
    width: "full",
  },
  {
    label: "genre",
    type: "text",
    placeholder: "eg. fantasy",
    name: "authorId",
    required: true,
    width: "half",
  },
  {
    label: "Data",
    type: "textarea",
    placeholder: "eg. The Final Empire",
    name: "data",
    required: true,
    width: "full",
  },
];
