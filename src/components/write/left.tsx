import Scrollable from "../shared-components/scrollable";
import DisplayData from "./displayData";

const Left = async () => {
  return (
    <div className="mp-4 overflow-scroll">
      {/* Recommended Section */}
      <Scrollable>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Books Written By You</h2>
          <div className="w-full">
            <DisplayData />
          </div>
        </section>
      </Scrollable>
    </div>
  );
};

export default Left;
