"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/ui/file-upload";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
} from "@/model/book.model";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { getLocalStorage } from "@/lib/localstorage";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Add book</h1>
      <InputForm />
    </div>
  );
}

const InputForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const id = getLocalStorage("id");

  const form = useForm<TRegiserFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: RegisterFormDefaultValue,
  });

  async function onSubmit(data: TRegiserFormSchema) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("genre", data.genre);
      formData.append("authorId", id as string);
      formData.append("data", data.data);
      formData.append("coverImage", file as File);

      const response = await fetch(`http://localhost:3000/api/books/`, {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());

      if (!response.ok) {
        const errorResponse = await response.json(); // Get the error details from the response
        throw new Error(errorResponse.message || "Failed to Add books");
      }

      const responseData = await response.json(); // Parse the JSON response
      toast.success("Added Books successfully!");
      console.log(responseData);
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      toast.error("Could not add books", error || "An error occurred");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-12"
      >
        <div className="w-full col-span-12 max-w-4xl mx-auto min-h-80 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFile(e.target.files![0]);
            }}
          />
        </div>
        {RegisterFormField.map((formField, index) => (
          <>
            <FormField
              key={index}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
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
          </>
        ))}
        <div className="col-span-12 flex justify-end w-full px-4 py-2">
          <Button type="submit" className="px-4 py-2 w-full">
            Submit
          </Button>
        </div>
        <Link href="/register" className="px-4 text-blue-500 underline">
          Register
        </Link>
      </form>
    </Form>
  );
};
