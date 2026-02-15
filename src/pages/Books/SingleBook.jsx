import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../redux/features/books/bookApi";
import { getImgUrl } from "../../utils/getImageUrl";
import { useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Loading from "./../../components/Loading";

const SingleBook = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchBookByIdQuery(id);
  const book = data?.book;

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>error,couldn't load the book</div>;
  if (!book) return <div>No book found</div>; // edge case

  return (
    <div className=" lg:flex lg:items-center md:flex md:items-center rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0  rounded-md">
          <img
            src={`${getImgUrl(book?.coverImage)}`}
            alt=""
            className="w-full h-64 object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </div>

        <div className="ml-2">
          <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
            {book?.title}
          </h3>

          <p className="text-gray-600 mb-5">
           {book?.description}
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

export default SingleBook;
