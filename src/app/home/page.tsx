import Search from "@/components/home/search";
import CardWrapper from "@/components/shared-components/card-wrapper";
import data from "@/data/booksCollection.json";

const Page = async () => {
  return (
    <div className=" h-full w-full grid grid-cols-12 divide-x">
      <div className="col-span-8">
        <input type="search" name="Search" id="book" className="border" />
      </div>
      <div className="col-span-4"></div>
    </div>
  );
};

export default Page;
