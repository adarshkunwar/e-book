"use client";
import { useEffect, useState } from "react";
import SingleCardItem from "../shared-components/single-card-item";
import { TBook } from "@/types/book";
import { getLocalStorage } from "@/lib/localstorage";

const DisplayData = () => {
  const [data, setData] = useState<TBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const id = getLocalStorage("id");
      console.log("id " + id);

      try {
        const headers = {
          "Content-Type": "application/json",
          ...(id && { id: id as unknown as string }), // Use query parameters instead if possible
        };

        const res = await fetch("http://localhost:3000/api/written", {
          method: "GET",
          headers: headers,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
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
