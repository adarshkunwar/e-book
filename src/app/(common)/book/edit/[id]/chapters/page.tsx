"use client";
import { redirect } from "next/navigation";
// components/ChapterForm.js

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ChapterForm = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const bookId = params.id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/books/${bookId}/chapter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      toast.success("Chapter successfully added");
    } else {
      console.error("Error:", response.statusText);
      toast.error("Chapter could not be added");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className=" p-4 border rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Add Chapter</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          rows={20}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default ChapterForm;
