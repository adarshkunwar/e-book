import cosineSimilarity from "cosine-similarity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Genre and author mappings
const genreMapping = {};
const authorMapping = {};

// Function to dynamically assign a one-hot vector to a genre
function getOrCreateGenreVector(genre) {
  if (!(genre in genreMapping)) {
    const newVector = new Array(Object.keys(genreMapping).length + 1).fill(0);
    newVector[newVector.length - 1] = 1; // Create one-hot vector for the new genre
    genreMapping[genre] = newVector;
  }
  return genreMapping[genre];
}

// Function to dynamically assign a one-hot vector to an author
function getOrCreateAuthorVector(author) {
  if (!(author in authorMapping)) {
    const newVector = new Array(Object.keys(authorMapping).length + 1).fill(0);
    newVector[newVector.length - 1] = 1; // Create one-hot vector for the new author
    authorMapping[author] = newVector;
  }
  return authorMapping[author];
}

// Function to vectorize a book by combining its genre and author vectors
function vectorizeBook(book) {
  const genreVector = getOrCreateGenreVector(book.genre); // Get genre vector
  const authorVector = getOrCreateAuthorVector(book.author); // Get author vector
  return [...genreVector, ...authorVector]; // Combine genre and author vectors
}

// Function to get recommendations for a user
async function getRecommendationsForUser(userId) {
  const readBooks = await prisma.readingHistory.findMany({
    where: { userId },
    include: { book: true },
  });

  const allBooks = await prisma.book.findMany(); // Get all books
  const userReadBooks = readBooks.map((r) => r.book); // Extract books the user has read

  return allBooks
    .filter((book) => !userReadBooks.some((rb) => rb.id === book.id)) // Exclude already read books
    .map((book) => {
      // Calculate the maximum cosine similarity between the current book and all user-read books
      const similarity = Math.max(
        ...userReadBooks.map((readBook) =>
          cosineSimilarity(vectorizeBook(readBook), vectorizeBook(book)),
        ),
      );
      return { book, similarity }; // Return the book and its similarity score
    })
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity in descending order
    .slice(0, 5); // Return top 5 recommendations
}

// Example usage of getRecommendationsForUser
(async () => {
  const recommendations = await getRecommendationsForUser(1); // Example user ID
  console.log(recommendations);
})();
