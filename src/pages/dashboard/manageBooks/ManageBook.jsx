import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiSearch } from "react-icons/fi";
import {
  useFetchAllBooksQuery,
  useDeleteBookMutation,
} from "../../../redux/features/books/bookApi";
import { getImgUrl } from "../../../utils/getImageUrl";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: booksData,
    isLoading,
    isError,
    refetch,
  } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const books = booksData?.Book || [];

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(books.map((book) => book.category))];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        Swal.fire("Deleted!", "Book has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete book.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-xl">
          Error loading books. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No books found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={getImgUrl(book.coverImage)}
                  alt={book.title}
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {book.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {book.description}
                </p>

                {/* Category */}
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {book.category}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-green-600">
                    ${book.newPrice}
                  </span>
                  {book.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${book.oldPrice}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to="dashboard/manage-newbook"
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded transition duration-200"
                  >
                    <FiEye /> View
                  </Link>
                  <Link
                    to={`/dashboard/edit-book/${book._id}`}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded transition duration-200"
                  >
                    <FiEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded transition duration-200"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
