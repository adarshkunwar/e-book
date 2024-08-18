import { TFormField } from "@/types/form-field";
import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type TRegiserFormSchema = z.infer<typeof registerFormSchema>;

export const RegisterFormDefaultValue: Partial<TRegiserFormSchema> = {
  email: "",
  password: "",
};

export const RegisterFormField: TFormField<TRegiserFormSchema>[] = [
  {
    label: "Email",
    type: "email",
    placeholder: "johndoe@gmail.com",
    name: "email",
    required: true,
    width: "full",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "*******",
    name: "password",
    required: true,
    width: "full",
  },
];
