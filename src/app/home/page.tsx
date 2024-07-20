import Search from "@/components/home/search";
import CardWrapper from "@/components/shared-components/card-wrapper";
import data from "@/data/booksCollection.json";

const Page = async () => {
  const response = await fetch("/api/books");
  const data = await response.json();

  return (
    <div className="container flex flex-col gap-4 mt-10">
      <Search />
      <CardWrapper product={data} />
    </div>
  );
};

export default Page;
