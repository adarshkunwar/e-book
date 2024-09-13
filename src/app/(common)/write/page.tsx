import Left from "@/components/write/left";
import Right from "@/components/write/right";

const Page = async () => {
  return (
    <div className=" h-full w-full grid grid-cols-12 gap-5">
      <div className="col-span-8">
        <Left />
      </div>
      <div className="col-span-4">
        <Right />
      </div>
    </div>
  );
};

export default Page;
