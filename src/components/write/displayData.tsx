import SingleCardItem from "../shared-components/single-card-item";
import { TBook } from "@/types/book";
import { getLocalStorage } from "@/lib/localstorage";
import { cookies } from "next/headers";
import Scrollable from "../shared-components/scrollable";

const getCookie = () => {
  const cookieStore = cookies(); // This works in server components
  const id = cookieStore.get("id")?.value; // Get the cookie value
  if (!id) {
    console.log("No ID cookie found.");
    return null;
  }
  return id;
};

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
    <Scrollable>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((ebook: TBook, index: number) => (
          <SingleCardItem
            key={index}
            data={ebook}
            link={`book/edit/${ebook.id}`}
          />
        ))}
      </div>
    </Scrollable>
  );
};

export default DisplayData;
