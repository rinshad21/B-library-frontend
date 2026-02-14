import React, { useEffect, useState } from "react";
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

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    setUploading(true);

    try {
      let imageUrl = bookData?.book?.coverImage; // Keep existing image by default

      // Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "b-libre");

        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dshvwoxsw/image/upload",
          formData
        );

        console.log("Cloudinary response:", cloudinaryRes.data);
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const updateBookData = {
        title: data.title,
        description: data.description,
        category: data.category,
        trending: data.trending,
        oldPrice: Number(data.oldPrice),
        newPrice: Number(data.newPrice),
        coverImage: imageUrl,
      };

      await axios.put(`${getBaseurl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      setImageFile(null);
      setImageFileName("");
      refetch(); // Refresh book data
    } catch (error) {
      console.error(
        "Failed to update book:",
        error.response?.data || error.message
      );

      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to update book",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

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
            { value: "Comics", label: "Comics" },
            { value: "Self Help", label: "Self Help" },
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

        {/* Current Cover Image Preview */}
        {bookData?.book?.coverImage && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Cover Image
            </label>
            <img
              src={bookData.book.coverImage}
              alt="Current cover"
              className="w-32 h-auto object-cover rounded-md"
            />
          </div>
        )}

        {/* File Upload Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload New Cover Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-600">Selected: {imageFileName}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 text-white font-bold rounded-md ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {uploading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBooks;
