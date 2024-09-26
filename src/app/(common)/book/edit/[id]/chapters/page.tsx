import { TChapter } from "@/types/book";
import Link from "next/link";

const getChapters = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
};

const Chapters = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const chapters = await getChapters();
    return (
        <div className="chapters">
            <h2>Chapters</h2>
            <ul>
                {chapters.map((chapter: TChapter, index: number) => (
                    <li key={index}>
                        <Link href={`/chapter/${chapter.id}`}>
                            {chapter.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Chapters;
