import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const UpdateProduct = ({
  setOpenEditProductForm,
  selectedProduct,
  fetchAllProducts,
}) => {
  const [data, setData] = useState({
    productName: selectedProduct.productName || "",
    price: selectedProduct.price || "",
    description: selectedProduct.description || "",
  });

  const { user } = useContext(AppContext);

  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(
    selectedProduct?.productImage || []
  );

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpenEditProductForm(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpenEditProductForm]);

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const removeNewImage = (index) => {
    const updated = [...selectedImages];
    updated.splice(index, 1);
    setSelectedImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price);
      formData.append("description", data.description);

      existingImages.forEach((imgObj) => {
        formData.append("existingImages", JSON.stringify(imgObj));
      });

      selectedImages.forEach((img) => {
        formData.append("productImages", img.file);
      });

      const url = import.meta.env.VITE_API_URL;
      const response = await axios.put(
        `${url}/api/products/update-product/${selectedProduct._id}`,
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
        setOpenEditProductForm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-md relative border border-white/20 max-h-[90vh] overflow-y-auto">
      {/* Close Icon */}
      <button
        onClick={() => setOpenEditProductForm(false)}
        className="absolute top-2 right-2 text-2xl text-red-500 hover:text-red-700"
      >
        <IoIosCloseCircle />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="productName"
          value={data.productName}
          onChange={handleOnChange}
          placeholder="Product Name"
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="price"
          value={data.price}
          onChange={handleOnChange}
          placeholder="Product Price"
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          value={data.description}
          onChange={handleOnChange}
          placeholder="Product Description"
          rows="3"
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        ></textarea>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-dashed border-gray-400 rounded bg-white"
        />

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {existingImages.map((img, index) => (
              <div key={index} className="relative w-20 h-20 group">
                <button
                  onClick={() => removeExistingImage(index)}
                  type="button"
                  className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 hover:text-red-800 shadow-md z-10"
                >
                  <IoClose className="text-lg" />
                </button>
                <img
                  src={img.url}
                  alt="existing"
                  onClick={() => {
                    setFullScreenImage(img.url);
                    setOpenFullScreenImage(true);
                  }}
                  className="w-full h-full object-contain rounded border border-gray-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* New Selected Images */}
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative w-20 h-20 group">
                <button
                  onClick={() => removeNewImage(index)}
                  type="button"
                  className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 hover:text-red-800 shadow-md z-10"
                >
                  <IoClose className="text-lg" />
                </button>
                <img
                  src={img.preview}
                  alt="preview"
                  onClick={() => {
                    setFullScreenImage(img.preview);
                    setOpenFullScreenImage(true);
                  }}
                  className="w-full h-full object-contain rounded border border-gray-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>

      {/* Full screen image preview */}
      {openFullScreenImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setOpenFullScreenImage(false)}
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

export default UpdateProduct;
