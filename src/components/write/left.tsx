import DisplayData from "./displayData";

const Left = async () => {
  return (
    <div className="mp-4 ">
      {/* Recommended Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Books Written By You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DisplayData />
        </div>
      </section>
    </div>
  );
};

export default Left;
