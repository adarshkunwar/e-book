export default function WrittenPageLayout() {
  const quotes = "“Your words, your worlds - Crafted and Shared.”";
  return (
    <section>
      {/* Header */}

      <section className=" rounded-lg mb-8 ">
        <h1 className="text-5xl font-bold mb-2 leading-normal">
          Books Written, <br /> By you.
        </h1>
        <p className="text-lgj">{quotes}</p>
      </section>
      {/* written books */}
    </section>
  );
}
