import Left from "@/components/home/left";
import Right from "@/components/home/right";

const Page = () => {
  return (
    <div className=" h-full w-full grid grid-cols-12 gap-5">
      <div className="col-span-8">
        <Left />
      </div>
      <div className="col-span-4 bg-gray-100 rounded-2xl">
        <Right />
      </div>
    </div>
  );
};

export default Page;
