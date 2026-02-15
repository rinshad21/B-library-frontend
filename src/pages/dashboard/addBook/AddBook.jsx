import { useForm } from "react-hook-form";
import { useAddbookMutation } from "../../../redux/features/books/bookApi";
import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { handleError, handleSuccess } from "../../../utils/Toast";
import Swal from "sweetalert2";
import axios from "axios";
const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const [addBook, { isLoading, isError }] = useAddbookMutation();

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";

      // Upload image to Cloudinary first
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
      } else {
        handleError("Please select an image!");
        return;
      }

      const newBookData = {
        title: data.title,
        description: data.description,
        category: data.category,
        coverImage: imageUrl,
        oldPrice: Number(data.oldPrice),
        newPrice: Number(data.newPrice),
      };

      await addBook(newBookData).unwrap();

      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      reset();
      setImageFile(null);
      setImageFileName("");
    } catch (error) {
      console.error("Full error:", error);

      if (error.response) {
        // Cloudinary error
        console.error("Cloudinary error:", error.response.data);
        handleError(
          "Error uploading image: " + error.response.data.error?.message
        );
      } else if (error.data) {
        // Backend error
        console.error("Backend error:", error.data);
        handleError(error.data.message || "Error saving book!");
      } else {
        handleError("An unexpected error occurred!");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <>
      <div className="max-w-lg  m-3 mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Reusable Input Field for Title */}
          <InputField
            label="Title"
            name="title"
            placeholder="Enter book title"
            register={register}
          />

          {/* Reusable Textarea for Description */}
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
              { value: "comics", label: "Comics" },
              { value: "self help", label: "Self Help" },
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
            placeholder="Old Price"
            register={register}
          />

          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="New Price"
            register={register}
          />

          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2  w-full"
            />
            {imageFileName && (
              <p className="text-sm text-gray-500 ">
                Selected: {imageFileName}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
          >
            {isLoading ? (
              <span className="">Adding.. </span>
            ) : (
              <span>Add Book</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
