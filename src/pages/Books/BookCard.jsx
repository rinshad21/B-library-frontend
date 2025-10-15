import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImageUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  //handle adding to cart using redux
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="lg:flex lg:items-center md:flex md:items-center rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book?.title || "Book cover"}
              className="h-72 w-auto object-contain p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div className="ml-2">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}{" "}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              $ {book?.oldPrice}
            </span>
          </p>
          <button
            className=" bg-book-violet-600 hover:bg-book-violet-900 transition hover:scale-105  active:bg-book-violet-900 active:scale-105 text-book-white rounded-xl gap-1 px-6 flex items-center mb-2"
            onClick={() => handleAddToCart(book)}
          >
            <FiShoppingCart className="mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
