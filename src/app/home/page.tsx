import Left from "@/components/home/left";

const Page = async () => {
  return (
    <div className=" h-full w-full grid grid-cols-12 gap-5">
      <div className="col-span-8">
        <Left />
      </div>
      <div className="col-span-4"></div>
    </div>
  );
};

export default Page;
