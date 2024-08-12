import React from 'react';
import { TBook } from '@/types/book';
import Image from 'next/image';

type HomeProps = {
	params: {
		id: string
	}
};

const Home: React.FC<HomeProps> = async ({ params }) => {
	///////////////////////////////////////////
	// DATA CENTER
	const res = await fetch(`http://localhost:3000/api/books/${params.id}`);
	const book = await res.json();

	return (
		<div>
			<section className='flex '>

				<div className="relative w-[370px] h-[500px]">
					<div className="absolute w-full h-full top-3 right-3 bg-gray-400 rounded-lg"></div>
					<Image
						src={book.cover}
						alt={book.title}
						height={500}
						width={400}
						loading="lazy"
						className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"

					/>
				</div>
				<header className="text-center mb-12">
					<h1 className="text-4xl font-serif font-light text-gray-900 tracking-tight transition-transform duration-300 transform hover:scale-105 hover:text-gray-700">
						{book.title}
					</h1>
					<h2 className="text-xl text-gray-600 mt-2 italic">by {book.author}</h2>
				</header>
			</section>
			<div className="mx-auto container p-8 bg-white shadow-lg rounded-lg border border-gray-200">
				<div className="flex flex-col md:flex-row gap-8 md:gap-16">

					<div className="md:w-2/3 p-6">
						<p className="text-lg text-gray-700 mb-6 leading-relaxed font-light">
							{book.description}
						</p>
						<div className="text-md text-gray-700 mb-6">
							<strong className="block mb-2 text-xl font-semibold text-gray-800">
								Summary:
							</strong>
							{book.summary}
						</div>
						<div className="text-md text-gray-700 mb-6">
							<strong className="block mb-2 text-xl font-semibold text-gray-800">
								Published:
							</strong>
							{new Date(book.published).toLocaleDateString()}
						</div>
						<div className="text-md text-gray-700">
							<strong className="block mb-2 text-xl font-semibold text-gray-800">
								Genres:
							</strong>
							<ul className="list-disc list-inside pl-4">
								{book.genres.map((genre) => (
									<li key={genre} className="transition-colors duration-300 hover:text-gray-800">
										{genre}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<footer className="text-center mt-16 text-gray-500 border-t border-gray-200 pt-8">
					<p>&copy; 2024 Book App. All rights reserved.</p>
					<p className="mt-2">
						Made with <span className="text-red-500">&hearts;</span> by Book Lovers
					</p>
				</footer>
			</div>
		</div>
	);
};

export default Home;
