import SingleCardItem from "../shared-components/single-card-item";
import { TBook } from "@/types/book";
import { Button } from "../ui/button";
import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Left() {
  ///////////////////////////////////////////
  // data centers
  const cookie = cookies();
  const user = cookie.get("id");
  if (!user) {
    redirect("/login");
  }
  const res = await fetch(
    `http://localhost:3000/api/books/recommended-for/${user}`,
  );
  const data = await res.json();
  const userName = "Adarsh Kunwar";
  const quotes =
    "“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”";
  ///////////////////////////////////////////

  return (
    <div className="mp-4 ">
      {/* Hero Section */}
      <section className=" rounded-lg mb-8 ">
        <h1 className="text-5xl font-bold mb-2 leading-normal">
          Happy reading, <br /> {userName.split(" ")[0]}
        </h1>
        <p className="text-lgj">{quotes}</p>
        <Link href="/library">
          <Button className="mt-4 rounded-full px-10">Explore</Button>
        </Link>
      </section>

      {/* Recommended Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
      </section>
    </div>
  );
}

// {data.map((ebook: TBook, index: number) => (
//   <SingleCardItem key={index} data={ebook} />
// ))}
