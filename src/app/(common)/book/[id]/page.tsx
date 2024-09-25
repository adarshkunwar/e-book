import React from "react";
import Image from "next/image";
import { Capitalize } from "@/lib/filterName";
import { Button } from "@/components/ui/button";
import { TBook, TChapter } from "@/types/book";
import Link from "next/link";

type HomeProps = {
  params: {
    id: string;
  };
};

const Home: React.FC<HomeProps> = async ({ params }) => {
  ///////////////////////////////////////////
  // DATA CENTER
  const res = await fetch(`http://localhost:3000/api/books/${params.id}`);
  const book = (await res.json()) as TBook;
  const capitalizedTitle = Capitalize(book.title);

  return (
    <div className="relative pt-96">
      <section className="flex justify-center gap-5 absolute -translate-y-2/3 left-1/2 -translate-x-1/2">
        <div className="w-full h-[500px] max-w-[300px] flex-1">
          <Image
            src={`/uploads/${book.coverImage}`}
            alt={book.title}
            height={500}
            width={450}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <header className="text-center mb-12 pt-10 flex-1 flex flex-col gap-10">
          <h1 className="text-5xl font-serif font-light text-gray-900 tracking-tight transition-transform duration-300 transform hover:scale-105 hover:text-gray-700">
            {capitalizedTitle}
          </h1>
          <h2 className="text-xl text-gray-600 mt-2 italic">
            by {book.author?.firstName + " " + book.author?.lastName}
          </h2>
          <h2 className="text-sm text-gray-600 mt-2 italic text-justify">
            {book.summary}
          </h2>
          <Button
            className="w-fit px-10 rounded-full"
            disabled={book.chapters?.length === 0}
          >
            <Link href={`/book/${params.id}/chapters/1`}>Start Reading</Link>
          </Button>
        </header>
      </section>
      <div className="mx-auto container p-8 bg-white shadow-lg rounded-lg border border-gray-200 pt-40">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-2/3 p-6">
            <div className="text-3xl text-gray-700 mb-6">
              Description
              <p className="text-lg mt-2 text-gray-700 mb-6 leading-relaxed font-light">
                {book.data}
              </p>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="text-md text-gray-700 mb-6">
              <strong className="block mb-2 text-xl font-semibold text-gray-800">
                Total Chapters
              </strong>
              {book.chapters
                ? book.chapters?.length.toString()
                : "No chapters added yet"}
            </div>
            <div className="text-md text-gray-700 mb-6">
              <strong className="block mb-2 text-xl font-semibold text-gray-800">
                Published:
              </strong>
              {new Date(book.publishedDate).toLocaleDateString()}
            </div>
            <div className="text-md text-gray-700">
              <strong className="block mb-2 text-xl font-semibold text-gray-800">
                Genres:
              </strong>
              <ul className="list-disc list-inside pl-4">
                {book.genres?.map((genre: string) => (
                  <li
                    key={genre}
                    className="transition-colors duration-300 hover:text-gray-800"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-md text-gray-700">
              {book.chapters && book.chapters.length > 0 && (
                <>
                  <strong className="block mb-2 text-xl font-semibold text-gray-800">
                    Chapter:
                  </strong>
                  <ul className="list-disc list-inside pl-4">
                    {book.chapters?.map((chapter: TChapter) => (
                      <li
                        key={chapter.id}
                        className="transition-colors duration-300 hover:text-gray-800"
                      >
                        <Link href={`/book/${book.id}/chapters/${chapter.id}`}>
                          {chapter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
