import { getLocalStorage } from "@/lib/localstorage";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import DisplayData from "./displayData";

export async function getServerSideProps() {
  const cookieStore = cookies();
  const id = cookieStore.get("id");
  console.log("HKJKJKJ");
  const res = await fetch(`http://localhost:3000/api/books/written-by/${id}`);
  const data = await res.json();
  const quotes = "“Your words, your worlds - Crafted and Shared.”";
  console.log(id);

  return {
    props: {
      data: data,
      quotes: quotes,
    },
  };
}

const Left = async () => {
  ///////////////////////////////////////////
  // data centers

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
  console.log(data);

  ///////////////////////////////////////////
  return (
    <div className="mp-4 ">
      {/* Hero Section */}
      <section className=" rounded-lg mb-8 ">
        <h1 className="text-5xl font-bold mb-2 leading-normal">
          Books Written, <br /> By you.
        </h1>
        <p className="text-lgj">{quotes}</p>
        <Button className="mt-4 rounded-full px-10">Add more</Button>
      </section>

      {/* Recommended Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DisplayData />
        </div>
      </section>
    </div>
  );
};

export default Left;

const AddNewBook = async (id: number) => {
  return fetch("http://localhost:3000/api/book", {
    method: "POST", // Specify the method as POST
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
      // Other headers if needed
    },
    body: JSON.stringify({
      key1: "value1",
      key2: "value2",
    }), // Convert the data to JSON
  })
    .then((response) => response.json()) // Parse the JSON from the response
    .then((data) => console.log(data)) // Handle the response data
    .catch((error) => console.error("Error:", error)); // Handle errors
};
