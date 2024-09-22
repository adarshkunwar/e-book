import Left from "@/components/write/left";
import Right from "@/components/write/right";

const Page = async () => {
  return (
    <div className=" h-full w-full grid grid-cols-12 gap-5">
      <div className="col-span-12">
        <Left />
      </div>
    </div>
  );
};

export default Page;
