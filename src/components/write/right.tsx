import Image from "next/image";
import { Button } from "../ui/button";
import { TLastReadingBook } from "@/types/book";
import Link from "next/link";
const Right = async () => {

  ///////////////////////////////////////////
  //data centers
  const userName = "Adarsh Kunwar";

  const res = await fetch("http://localhost:3000/api/lastreading");
  const lastReadingBook: TLastReadingBook = await res.json();

  ///////////////////////////////////////////

  return (
    <div className="">
      {/* User Name */}
      <div className="flex justify-end w-full ">
        <div className="flex items-center gap-3">
          <div className="border border-black w-9 h-9 rounded-full flex items-center justify-center">
            {userName[0]}
          </div>
          <h1 className="text-md font-bold">{userName}</h1>
        </div>
      </div>

      {/* Last Reading */}
      <section className="flex flex-col gap-5 w-4/5 mx-auto">
        <div className="text-2xl font-bold text-left text-red-500">
          <h1 className="">
            Last Reading
          </h1>
        </div>
        <div >
          <div className="text-4xl font-bold text-center">
            <h1 className="">
              {lastReadingBook.title}
            </h1>
          </div>
        </div>

        <div className="text-2xl font-bold text-right flex justify-center">
          <Image
            src={lastReadingBook.cover}
            alt={lastReadingBook.title}
            height={300}
            width={200}
            loading="lazy"
            className="max-w-full max-h-[400px] min-h-[330px] object-cover rounded-lg"
          />
        </div>


        <div className="text-2xl font-bold text-right flex justify-center">
          <p className="text-sm">
            <span className="text-red-400">{lastReadingBook.currentChapter} </span>
            <span className="">/ {lastReadingBook.totalChapter} chapter</span>
          </p>
        </div>

        <div className="text-2xl font-medium text-left flex justify-center">
          <p className="text-sm">{lastReadingBook.summary}</p>
        </div>

        <div className="text-2xl font-bold text-right">
          <p className="text-sm"> - {lastReadingBook.author}</p>
        </div>

        <Button className="text-white" asChild>
          <Link href={`/book/${lastReadingBook.id}`}>
            continue reading
          </Link>
        </Button>
      </section>
    </div >
  );
}

export default Right;
