import { useNavigate } from "react-router-dom";
import {
  useFetchAllBooksQuery,
  useDeleteBookMutation,
} from "../../../redux/features/books/bookApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { handleError, handleSuccess } from "../../../utils/Toast";

const ManageBook = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.Book || [];

  const handleDelete = async (id) => {
    try {
      await deleteBook(id).unwrap();
      refetch();
      handleSuccess("book deleted");
    } catch (err) {
      console.error(err);
      handleError("couldn't delete book");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading books</p>;

  return (
    <div className="p-1">
      <h1 className="text-xl font-bold mb-4">Manage & Edit Books</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2">#</th>
            <th className="border px-2">Title</th>
            <th className="border px-2">Category</th>
            <th className="border px-2">Price</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-2">
                No books found
              </td>
            </tr>
          )}
          {books.map((book, i) => (
            <tr key={book._id}>
              <td className="border px-2">{i + 1}</td>
              <td className="border px-2">{book.title}</td>
              <td className="border px-2">{book.category}</td>
              <td className="border px-2">${book.newPrice}</td>
              <td className="border px-2 space-x-2">
                <button
                  onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}
                  className="px-2 py-1 bg-indigo-500 text-white rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBook;
