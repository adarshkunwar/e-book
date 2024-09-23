import { Capitalize } from "@/lib/filterName";
import { TBook } from "@/types/book";
import Image from "next/image";
import Link from "next/link";

type SingleCardItemProps = {
  data: TBook;
  link?: string;
};

export default function CardDemo({ data, link }: SingleCardItemProps) {
  return (
    <Link href={link ? link : `/book/${data.id}`}>
      <div className="max-w-xs w-full group/card">
        <div
          className={
            " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4"
          }
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60">
            {data.coverImage ? (
              <Image
                src={`/uploads/${data.coverImage}`}
                alt={data?.title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-700 text-center text-2xl font-bold relative">
                <span className="bg-white p-4 rounded-lg shadow-md">
                  {Capitalize(data?.title || "No Title")}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center space-x-4 z-10">
            <div>
              <div className="border border-white w-8 h-8 rounded-full flex items-center justify-center text-black">
                {Capitalize(data?.author?.firstName[0])}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-normal text-base text-gray-50 relative z-10">
                {data?.author?.firstName + " " + data?.author?.lastName}
              </p>
            </div>
          </div>
          <div className="text content">
            <h1 className="font-bold text-xl md:text-2xl text-white relative z-10">
              {data?.title}
            </h1>
            <p className="font-normal text-sm relative z-10 my-4 line-clamp-2 text-white ">
              {data?.data}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
