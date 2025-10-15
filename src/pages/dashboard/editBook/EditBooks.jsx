import React, { useEffect } from "react";
import InputField from "./../addBook/InputField";
import SelectField from "./../addBook/SelectField";
import { useParams } from "react-router-dom";
import {
  useFetchBookByIdQuery,
  useUpdatebookMutation,
} from "../../../redux/features/books/bookApi";
import { useForm } from "react-hook-form";

import Loading from "../../../components/Loading";
import getBaseurl from "./../../../utils/getBaseurl";
import Swal from "sweetalert2";
import axios from "axios";

const EditBooks = () => {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdatebookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (bookData?.book) {
      const book = bookData.book;
      setValue("title", book.title);
      setValue("description", book.description);
      setValue("category", book.category);
      setValue("trending", book.trending);
      setValue("oldPrice", book.oldPrice);
      setValue("newPrice", book.newPrice);
      setValue("coverImage", book.coverImage);
    }
  }, [bookData, setValue]);
  console.log("bookData", bookData);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseurl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({
        title: "Book added",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,confirm!",
      });
    } catch (error) {
      console.log("failed to edit", error.response?.data || error.message);
      alert("failed to update");
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <div> error fetching book data</div>;
  return (
    <div className="max-w-lg mx-auto m-3 md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          step="0.01"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          step="0.01"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          step="any"
          placeholder="Cover Image URL"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBooks;
