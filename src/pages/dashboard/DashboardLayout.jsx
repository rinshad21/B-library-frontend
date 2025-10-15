import { useEffect } from "react";
import { useState } from "react";
import getBaseurl from "../../utils/getbaseurl";
import axios from "axios";
import Loading from "../../components/Loading";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { GrMoney } from "react-icons/gr";
import { RiBookOpenFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosLogOut, IoMdTrendingUp } from "react-icons/io";
const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseurl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (loading) return <Loading />;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-book-violet-600">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogOut}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-400"
          >
            <IoIosLogOut />
          </button>
        </header>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="p-4 bg-white rounded shadow text-center">
            <span className="block text-gray-500 text-sm">Total Books</span>
            <span className=" text-2xl font-bold text-purple-600 flex items-center justify-center gap-2">
              <RiBookOpenFill size={24} />
              {data.totalBooks || 0}
            </span>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <span className="block text-gray-500 text-sm">Total Orders</span>
            <span className=" text-2xl font-bold text-purple-600 flex items-center justify-center gap-2">
              <FaCartArrowDown size={24} /> {data.totalOrders || 0}
            </span>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <span className="block text-gray-500 text-sm">Total Sales</span>
            <span className=" text-2xl font-bold text-purple-600 flex items-center justify-center gap-2">
              <GrMoney size={24} />$
              {data.totalSales ? data.totalSales.toFixed(2) : 0}
            </span>
          </div>

          <div className="p-4 bg-white rounded shadow text-center">
            <span className="block text-gray-500 text-sm">Trending Books</span>
            <span className=" text-2xl font-bold text-purple-600 flex items-center justify-center gap-2">
              <IoMdTrendingUp size={24} /> {data.trendingBooks || 0}
            </span>
          </div>
        </div>

        {/* Quick links / actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/manage-newbook"
            className="p-4 bg-white rounded shadow hover:bg-purple-50 text-purple-600 text-center"
          >
            Manage Books
          </Link>
          <Link
            to="/dashboard/manage-newbook"
            className="p-4 bg-white rounded shadow hover:bg-purple-50 text-purple-600 text-center"
          >
            Edit Books
          </Link>
          <Link
            to="/dashboard/add-newbook"
            className="p-4 bg-white rounded shadow hover:bg-purple-50 text-purple-600 text-center"
          >
            Add New Book
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
