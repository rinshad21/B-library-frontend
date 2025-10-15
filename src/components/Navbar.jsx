import { Link } from "react-router-dom";
import { RiBookShelfFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cart/cartSlice";
const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "orders", href: "/order" },
  { name: "cart page", href: "/cart" },
  { name: "checkout", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  //displaying cart item in navbar using redux
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  };
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-4  sticky top-0 bg-gray-200 z-30 ">
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <RiBookShelfFill className=" text-book-violet-600 w-6 h-6" />
          </Link>
          <div className="flex items-center space-x-1">
            <span className="text-xl sm:text-2xl font-black text-book-violet-600">
              B
            </span>
            <span className="text-lg sm:text-xl font-light text-gray-700">
              - LIBRARY
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 relative">
          <div className="relative">
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <RxAvatar
                    className={`size-8 rounded-full ${
                      currentUser ? " text-green-500" : "text-red-500"
                    }`}
                  />
                </button>
                {/* Drop down menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg z-50 overflow-hidden border border-gray-100">
                    <ul>
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-300"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                {" "}
                <FaRegUser className="size-5 text-red-500" />{" "}
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            className=" bg-book-violet-600 text-book-white rounded-xl p-1 sm:px-6 px-2  flex items-center"
          >
            <FaShoppingCart className="size-5" />
            {cartItems.length > 0 && (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
