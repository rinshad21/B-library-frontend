import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/order/ordersApi";
import { handleError, handleSuccess } from "./../../utils/Toast";

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //subtotal
  const Subtotal = cartItems
    .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
    .toFixed(2);

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,

      productId: cartItems.map((item) => item?._id),
      totalPrice: Subtotal,
    };
    try {
      await createOrder(newOrder);
      handleSuccess("order created");

      setTimeout(() => {
        navigate("/order");
      }, 1000);
    } catch (error) {
      console.log("error creating order", error);
      handleError("failed to create an order");
    }
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Cash On Delivery
            </h2>
            <p className="text-gray-500 mb-2">Total Price: ${Subtotal}</p>
            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">Name is required</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="number"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("phone", { required: true })}
                        placeholder="+123 456 7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          Phone is required
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <label html="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full  bg-red-400"
                        disabled
                        defaultValue={currentUser?.email}
                        placeholder="sign in to order"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("city", { required: true })} // ✅ Added register
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">City is required</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        type="text"
                        id="country"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("country", { required: true })}
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm">
                          Country is required
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / Province</label>
                      <input
                        type="text"
                        id="state"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("state", { required: true })}
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm">
                          State is required
                        </p>
                      )}
                    </div>

                    {/* Zipcode */}
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        id="zipcode"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("zipcode", { required: true })}
                      />
                      {errors.zipcode && (
                        <p className="text-red-500 text-sm">
                          Zipcode is required
                        </p>
                      )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)} // ✅ Added onChange
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{" "}
                          <Link className="underline text-blue-600">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link className="underline text-blue-600">
                            Shopping Policy
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <button
                        type="submit"
                        disabled={!isChecked}
                        className="bg-book-violet-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
