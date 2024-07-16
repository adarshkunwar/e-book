import CardWrapper from "@/components/shared-components/card-wrapper";
import { books } from "@/data/booksCollection";

const Page = () => {
  const mainData = books(1000);
  console.log(mainData);

  return (
    <div className="container mt-10">
      <CardWrapper product={mainData} />
    </div>
  );
};

export default Page;
