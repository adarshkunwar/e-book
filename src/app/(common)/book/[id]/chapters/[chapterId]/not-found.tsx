import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Looks like you’ve reached the end of the book! But this page doesn’t
          exist.
        </p>

        <div className="flex justify-center mb-4"></div>

        <Link href="/">Go Back to Homepage</Link>
      </div>
    </div>
  );
}
