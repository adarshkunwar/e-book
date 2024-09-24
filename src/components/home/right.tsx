import { getLastRead } from "@/data/lastRead";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { getLocalStorage } from "@/lib/localstorage";
import { cookies } from "next/headers";

const LastReading: React.FC = async () => {
  ///////////////////////////////////////////
  //data centers

  const cookieStore = cookies(); // This works in server components
  const id = cookieStore.get("id")?.value; // Get the cookie value
  const res = await fetch(`http://localhost:3000/api/books/last-reading/${id}`);
  const last = await res.json();
  const userName = `Adarsh Kunwar`;

  ///////////////////////////////////////////

  return (
    <div className="">
      {/* User Name */}
      <div className="h-9"></div>

      {/* Last Reading */}
      <section className="flex flex-col gap-5 w-4/5 mx-auto">
        <div className="text-2xl font-bold text-left text-red-500">
          <h1 className="">Last Reading</h1>
        </div>
        {
          // Last Reading Book
          last.data.length <= 0 ? (
            <div className="text-2xl font-bold text-center">
              <h1 className="">You havent read a book yet</h1>
            </div>
          ) : (
            <div>
              <div>
                <div className="text-4xl font-bold text-center">
                  <h1 className="">{last.title}</h1>
                </div>
              </div>

              <div className="text-2xl font-bold text-right flex justify-center">
                <Image
                  src={last.coverImage}
                  alt={last.title}
                  height={300}
                  width={200}
                  loading="lazy"
                  className="max-w-full max-h-[400px] min-h-[330px] object-cover rounded-lg"
                />
              </div>

              <div className="text-2xl font-bold text-right flex justify-center">
                <p className="text-sm">
                  <span className="text-red-400">{last.currentChapter} </span>
                  <span className="">/ {last.totalChapter} chapter</span>
                </p>
              </div>

              <div className="text-2xl font-medium text-left flex justify-center">
                <p className="text-sm">{last.summary}</p>
              </div>

              <div className="text-2xl font-bold text-right">
                <p className="text-sm"> - {last.author}</p>
              </div>

              <Button className="text-white" asChild>
                <Link href={`/book/${last.id}`}>continue reading</Link>
              </Button>
            </div>
          )
        }
      </section>
    </div>
  );
};

export default LastReading;
