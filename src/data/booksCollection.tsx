import { faker } from "@faker-js/faker";
import { TBook } from "@/types/book";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "Autobiography",
  "Self-Help",
  "Cookbook",
  "Travel",
  "History",
  "Science",
  "Math",
  "Art",
  "Music",
  "Sports",
  "Health",
  "Fitness",
  "Business",
  "Economics",
  "Politics",
  "Philosophy",
  "Religion",
  "Spirituality",
  "Psychology",
  "Sociology",
  "Anthropology",
  "Education",
  "Technology",
  "Programming",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Blockchain",
  "Cryptocurrency",
  "Cybersecurity",
  "Networking",
  "Cloud Computing",
  "DevOps",
  "Agile",
  "Scrum",
  "Kanban",
  "Lean",
  "Management",
  "Leadership",
  "Marketing",
  "Sales",
  "Customer Service",
  "Human Resources",
];

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const books = (number: number): TBook[] => {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push({
      id: (i + 1).toString(),
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      cover: faker.image.url(),
      description: faker.lorem.paragraphs(25),
      summary: faker.lorem.paragraph(5),
      published: faker.date.past().toISOString(),
      genres: Array.from(
        { length: 3 },
        () => genres[randomNumber(0, genres.length)]
      ),
      currentChapter: randomNumber(1, 10),
      totalChapter: randomNumber(10, 100),
    });
  }
  return array;
};
