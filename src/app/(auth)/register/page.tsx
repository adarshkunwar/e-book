"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  registerFormSchema,
  RegisterFormDefaultValue,
  RegisterFormField,
  TRegiserFormSchema,
} from "@/model/register.model";

export default function SignIn() {
  return <InputForm />;
}

const InputForm = () => {
  const form = useForm<TRegiserFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: RegisterFormDefaultValue,
  });

  async function onSubmit(data: TRegiserFormSchema) {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match");
      throw new Error("Password and confirm password do not match");
    }

    const finalData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      toast.success("Signed up successfully!");
    } catch (error) {
      toast.error("This didn't work.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-12"
      >
        {RegisterFormField.map((formField, index) => (
          <FormField
            key={index}
            control={form.control}
            name={formField.name}
            render={({ field, fieldState }) => (
              <FormItem
                className={`${
                  formField.width === "full" && "col-span-12"
                } ${formField.width === "half" && "col-span-6"} ${
                  formField.width === "third" && "col-span-4"
                } px-4 py-2`}
              >
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.placeholder}
                    required={formField.required}
                    aria-label={formField.label}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="col-span-12 flex justify-end">
          <Button type="submit" className="px-4 py-2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
