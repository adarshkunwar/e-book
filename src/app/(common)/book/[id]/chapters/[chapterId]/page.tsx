import React from "react";
import { Capitalize } from "@/lib/filterName";
import { Button } from "@/components/ui/button";
import { TChapter } from "@/types/book";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type HomeProps = {
  params: {
    id: string;
    chapterId: string;
  };
};

async function fetchChapter(bookId: string, chapterId: string) {
  const res = await fetch(
    `http://localhost:3000/api/books/${bookId}/chapter/${chapterId}`,
  );
  if (!res.ok) return undefined;
  return res.json();
}

async function addBook(bookId: string, chapterId: string, userId: string) {
  const res = await fetch(
    `http://localhost:3000/api/reading-history/history-for/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book: bookId,
        chapter: chapterId,
        user: userId,
      }),
    },
  );
  if (!res.ok) return undefined;
  return res.json();
}

const Home: React.FC<HomeProps> = async ({ params }) => {
  ///////////////////////////////////////////
  // DATA CENTER
  const cookieStore = cookies(); // This works in server components
  const userId = cookieStore.get("id")?.value; // Get the cookie value
  if (!userId) {
    redirect("/login");
  }
  const chapter = await fetchChapter(params.id, params.chapterId);
  const updatedChapter = await addBook(
    params.id,
    params.chapterId,
    userId as string,
  );
  if (!chapter) {
    notFound();
  }
  const capitalizedTitle = Capitalize(chapter.title);
  return (
    <div className="relative pt-28 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="absolute top-0 left-1/2 -translate-x-1/2 w-full px-4 md:px-0">
        <header className="text-center py-16 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 tracking-tight transition-transform duration-300 transform hover:scale-105 hover:text-gray-700">
            {capitalizedTitle}
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto font-light text-lg">
            Explore the chapter and delve into the author&apos;s imagination.
          </p>
          <Link href={`/book/${params.id}`}>
            <Button className="mt-4 px-6 py-2">Back to Book</Button>
          </Link>
        </header>
      </section>

      {/* Content Section */}
      <div className="mx-auto container max-w-5xl p-8 bg-white shadow-lg rounded-lg border border-gray-200 mt-40 md:mt-60">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-full p-6">
            <div className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
              {chapter.content}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-gray-500">
        <p className="text-sm">
          © 2024 Reader&apos;s Haven. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
