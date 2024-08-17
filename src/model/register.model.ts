import { TFormField } from "@/types/form-field";
import { z } from "zod";

export const registerFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type TRegiserFormSchema = z.infer<typeof registerFormSchema>;

export const RegisterFormDefaultValue: Partial<TRegiserFormSchema> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterFormField: TFormField<TRegiserFormSchema>[] = [
  {
    label: "First Name",
    type: "text",
    name: "firstName",
    placeholder: "John",
    required: true,
    width: "half",
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    name: "lastName",
    required: true,
    width: "half",
  },
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
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "*******",
    name: "confirmPassword",
    required: true,
    width: "full",
  },
];
