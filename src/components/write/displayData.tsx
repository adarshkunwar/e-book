import SingleCardItem from "../shared-components/single-card-item";
import { TBook } from "@/types/book";
import { getLocalStorage } from "@/lib/localstorage";
import { cookies } from "next/headers";

const DisplayData = async () => {
  const cookieStore = cookies(); // This works in server components
  const id = cookieStore.get("id")?.value; // Get the cookie value

  let data = [];
  const quotes = "“Your words, your worlds - Crafted and Shared.”";

  if (id) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/books/written-by/${id}`,
        {
          cache: "no-store", // Disable caching for dynamic content
        },
      );
      if (res.ok) {
        data = await res.json(); // Parse data if the fetch is successful
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  } else {
    console.log("No ID cookie found.");
  }

  if (data.length === 0) {
    return <div className="text-center">No books found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((ebook: TBook, index: number) => (
        <SingleCardItem key={index} data={ebook} />
      ))}
    </div>
  );
};

export default DisplayData;
