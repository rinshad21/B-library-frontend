import { useAuth } from "../../context/AuthContext";
import { useGetOrderbyEmailQuery } from "../../redux/features/order/ordersApi";
import { downloadInvoicePDF } from "./../../utils/downloadInvoice";
const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderbyEmailQuery(currentUser.email);
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error getting order data</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-book-violet-500 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white bg-book-violet-500 px-3 py-1 rounded-full">
                  #{index + 1}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-lg font-bold mb-2 truncate">
                Order ID: {order._id}
              </h2>

              <div className="text-gray-700 text-sm space-y-1">
                <p>
                  <span className="font-semibold">Name:</span> {order.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {order.phone}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> $
                  {order.totalPrice}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold text-gray-800">Address:</h3>
                <p className="text-gray-600 text-sm">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold text-gray-800">Products:</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {order.productId.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => downloadInvoicePDF(order)}
                  className="bg-book-violet-500 hover:bg-book-violet-600 text-white text-sm px-3 py-1 rounded-md transition-colors duration-200"
                >
                  download invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
