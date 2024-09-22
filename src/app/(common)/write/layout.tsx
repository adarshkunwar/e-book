export default function WrittenPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quotes = "“Your words, your worlds - Crafted and Shared.”";
  return (
    <section>
      {/* Header */}

      <section className=" rounded-lg mb-8 ">
        <h1 className="text-5xl font-bold mb-2 leading-normal">
          Books Written, <br /> By you.
        </h1>
        <p className="text-lgj">{quotes}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center"></div>
          <div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              Add New Book
            </button>
          </div>
        </div>

        {/* books collection */}
        {children}
      </section>
      {/* written books */}
    </section>
  );
}
