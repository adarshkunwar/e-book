import { Button } from "../ui/button";
import DisplayData from "./displayData";

export default async function Left() {
  ///////////////////////////////////////////
  // data centers
  const userName = "Adarsh Kunwar";
  const quotes = "“Your words, your worlds - Crafted and Shared.”";

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
}

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
