import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const UploadProduct = ({ setOpenUploadProductForm, fetchAllProducts }) => {
  const [data, setData] = useState({
    productName: "",
    price: "",
    description: "",
  });

  const { user } = useContext(AppContext);

  const [selectedImages, setSelectedImages] = useState([]);
  const [openFullScreenImages, setOpenFullScreenImages] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const resetForm = () => {
    setData({
      productName: "",
      price: "",
      description: "",
    });
    setSelectedImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price);
      formData.append("description", data.description);

      selectedImages.forEach((img) => {
        formData.append("productImages", img.file);
      });

      const url = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${url}/api/products/add-product`,
        formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
        fetchAllProducts();
        setOpenUploadProductForm(false);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-md relative border border-white/20 
max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {/* Close Icon */}
      <button
        onClick={() => setOpenUploadProductForm(false)}
        className="absolute top-2 right-2 text-2xl text-red-500 hover:text-red-700 cursor-pointer"
      >
        <IoIosCloseCircle />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={data.productName}
          onChange={handleOnChange}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="price"
          placeholder="Product Price"
          value={data.price}
          onChange={handleOnChange}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={data.description}
          onChange={handleOnChange}
          required
          rows="3"
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        ></textarea>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-dashed border-gray-400 rounded bg-white"
        />

        {/* Preview images */}
        {selectedImages.map((img, index) => (
          <div key={index} className="relative w-20 h-20 group">
            {/* Cross icon image remove karne ke liye */}
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 hover:text-red-800 shadow-md z-10"
              title="Remove"
            >
              <IoIosCloseCircle className="text-xl" />
            </button>

            {/* Preview image */}
            <img
              src={img.preview}
              alt="preview"
              className="w-full h-full object-cover rounded border border-gray-300 group-hover:scale-105 transition cursor-pointer"
              onClick={() => {
                setFullScreenImage(img.preview);
                setOpenFullScreenImages(true);
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold cursor-pointer"
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>

      {/* Full screen image preview */}
      {openFullScreenImages && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setOpenFullScreenImages(false)}
        >
          <img
            src={fullScreenImage}
            alt="fullscreen"
            className="max-h-[80%] max-w-[90%] object-contain rounded shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default UploadProduct;
