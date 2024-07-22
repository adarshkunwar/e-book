import { TBook } from "@/types/book"
import SingleCardItem from "@/components/shared-components/single-card-item"

const Library = async () => {
  const res = await fetch('http://localhost:3000/api/books')
  const data = await res.json()
  return (
    <main className="flex flex-col gap-1">
      <section>
        <h2 className="text-2xl font-bold mb-4">Last Reading</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {data.slice(2, 8).map((ebook: TBook, index: number) => (
            <SingleCardItem key={index} product={ebook} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Last Reading</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {data.slice(2, 8).map((ebook: TBook, index: number) => (
            <SingleCardItem key={index} product={ebook} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Last Reading</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {data.slice(2, 8).map((ebook: TBook, index: number) => (
            <SingleCardItem key={index} product={ebook} />
          ))}
        </div>
      </section>
    </main>
  )
}
export default Library
