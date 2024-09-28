import { TBook } from "@/types/book";
import SingleCardItem from "@/components/shared-components/single-card-item";

const Library = async () => {
  const res = await fetch("http://localhost:3000/api/books");
  const data = await res.json();
  return (
    <main className="w-full">
      <section className="w-full">
        <h2 className="text-2xl font-bold mb-4">Last Reading</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {data.map((ebook: TBook, index: number) => (
            <SingleCardItem key={index} data={ebook} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Library;
