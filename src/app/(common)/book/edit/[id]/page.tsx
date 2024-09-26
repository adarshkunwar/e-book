"use client";
import { Button } from "@/components/ui/button";
import { Capitalize } from "@/lib/filterName";
import { TBook } from "@/types/book";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";

type HomeProps = {
    params: {
        id: string;
    };
};

const Home: React.FC<HomeProps> = ({ params }) => {
    ///////////////////////////////////////////
    // STATE MANAGEMENT
    const [book, setBook] = useState<TBook | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    ///////////////////////////////////////////
    // FETCH BOOK DATA
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/books/${params.id}`,
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch book details.");
                }
                const data = (await res.json()) as TBook;
                setBook(data);
            } catch (err) {
                setError("Unable to load book details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [params.id]);

    ///////////////////////////////////////////
    // DELETE BOOK HANDLER
    const handleDelete = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/books/${params.id}`,
                {
                    method: "DELETE",
                },
            );
            if (res.ok) {
                toast.success("Book Deleted Successfully");
                window.location.href = "/write";
            } else {
                throw new Error("Failed to delete the book.");
            }
        } catch (err) {
            toast.error("Failed to delete the book.");
        }
    };

    ///////////////////////////////////////////
    // LOADING STATE
    if (loading) {
        return (
            <div className="text-center p-10">
                <p>Loading book details...</p>
            </div>
        );
    }

    ///////////////////////////////////////////
    // ERROR STATE
    if (error) {
        return (
            <div className="text-center p-10">
                <p>{error}</p>
            </div>
        );
    }

    ///////////////////////////////////////////
    // RENDER IF DATA EXISTS
    if (!book) {
        return null;
    }

    const capitalizedTitle = Capitalize(book.title);

    return (
        <div className="relative pt-96">
            <section className="flex justify-center gap-5 absolute -translate-y-2/3 left-1/2 -translate-x-1/2">
                <div className="w-full h-[500px] max-w-[450px] flex-1">
                    <Image
                        src={`/uploads/${book.coverImage}`}
                        alt={book.title}
                        height={500}
                        width={450}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                </div>
                <header className="text-center mb-12 pt-10 flex-1 flex flex-col gap-10">
                    <h1 className="text-5xl font-serif font-light text-gray-900 tracking-tight transition-transform duration-300 transform hover:scale-105 hover:text-gray-700">
                        {capitalizedTitle}
                    </h1>
                    <h2 className="text-sm text-gray-600 mt-2 italic text-justify">
                        {book.summary}
                    </h2>
                    <div className="flex gap-4">
                        <Button className="w-fit px-10 rounded-full">
                            Add Chapters
                        </Button>
                        <Button
                            className="w-fit px-4 rounded-full bg-red-600"
                            onClick={handleDelete}
                        >
                            <FaRegTrashCan />
                        </Button>
                    </div>
                </header>
            </section>
            <div className="mx-auto container p-8 bg-white shadow-lg rounded-lg border border-gray-200 pt-40">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    <div className="md:w-2/3 p-6">
                        <div className="text-3xl text-gray-700 mb-6">
                            Description
                            <p className="text-lg mt-2 text-gray-700 mb-6 leading-relaxed font-light">
                                {book.data}
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <div className="text-md text-gray-700 mb-6">
                            <strong className="block mb-2 text-xl font-semibold text-gray-800">
                                Total Chapters
                            </strong>
                            {book.chapters.length}
                        </div>
                        <div className="text-md text-gray-700 mb-6">
                            <strong className="block mb-2 text-xl font-semibold text-gray-800">
                                Published:
                            </strong>
                            {new Date(book.publishedDate).toLocaleDateString()}
                        </div>
                        <div className="text-md text-gray-700">
                            <strong className="block mb-2 text-xl font-semibold text-gray-800">
                                Genres:
                            </strong>
                            <ul className="list-disc list-inside pl-4">
                                {book.genres?.map((genre: string) => (
                                    <li
                                        key={genre}
                                        className="transition-colors duration-300 hover:text-gray-800"
                                    >
                                        {genre}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
