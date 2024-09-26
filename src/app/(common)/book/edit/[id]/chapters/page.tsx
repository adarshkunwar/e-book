import { Button } from "@/components/ui/button";
import { TChapter } from "@/types/book";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing React Icons

const getChapters = async (id: string) => {
    const response = await fetch(
        `http://localhost:3000/api/books/${id}/chapter/`,
    );
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
    const bookId = params.id;
    const chapters = await getChapters(bookId);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                Chapters List
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {chapters.map((chapter: TChapter, index: number) => (
                    <li
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 transform hover:scale-105"
                    >
                        <Link
                            href={`/chapter/${chapter.id}`}
                            className="block text-lg font-semibold text-gray-900 hover:text-indigo-600"
                        >
                            <h3 className="text-2xl font-medium mb-3">
                                {chapter.title}
                            </h3>
                        </Link>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button className="flex items-center bg-green-100 text-indigo-600 hover:bg-indigo-100 transition duration-200">
                                <FaEdit className="mr-2" />
                                Update
                            </Button>
                            <Button className="flex items-center bg-yellow-300 text-red-600 hover:bg-red-100 transition duration-200">
                                <FaTrashAlt className="mr-2" />
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Chapters;
