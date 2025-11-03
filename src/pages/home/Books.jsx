import { useState } from "react";
import BookCard from "../Books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/bookApi";
import { FiSearch } from "react-icons/fi";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "comics",
];

const Books = () => {
  const { data } = useFetchAllBooksQuery();
  const books = data?.Book || [];

  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [searchTerm, setSearchTerm] = useState("");

  // category filtering
  const categoryFiltered =
    selectedCategory === "Trending"
      ? books.filter((book) => book.trending)
      : selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  // search filtering
  const filteredBooks = categoryFiltered.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-6 mt-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>
      {/* Books display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        ) : (
          <p className="text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
