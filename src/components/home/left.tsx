import SingleCardItem from "../shared-components/single-card-item";
import { TBook } from "@/types/book";

export default async function Left() {
  const res = await fetch("http://localhost:3000/api/books");
  const data = await res.json();

  return (
    <div className="mp-4">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to E-Book App</h1>
        <p className="text-lg">Discover and read your favorite e-books.</p>
      </section>

      {/* Recommended Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.slice(1, 10).map((ebook: TBook, index: number) => (
            <SingleCardItem key={index} product={ebook} />
          ))}
        </div>
      </section>

      {/* Last Reading Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Last Reading</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {data.map((ebook: TBook, index: number) => (
            <SingleCardItem key={index} product={ebook} />
          ))}
        </div>
      </section>
    </div>
  );
}
