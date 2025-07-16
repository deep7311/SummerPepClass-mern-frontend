import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadProduct from "./UploadProduct";
import UpdateProduct from "./UpdateProduct";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openUploadProductForm, setOpenUploadProductForm] = useState(false);

  const [openEditProductForm, setOpenEditProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const deleteProduct = async (productId) => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.delete(`${url}/api/products/${productId}`);
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
        fetchAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const fetchAllProducts = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(
        `${url}/api/products?page=${page}&limit=${limit}&search=${search}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [page, search]);

  return (
    <div className="min-h-[70%] min-w-4xl px-4 py-8 bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 rounded py-2 px-3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
            onClick={() => setOpenUploadProductForm(true)}
          >
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                    {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={product.productImage?.[0]?.url}
                        alt={product.productName}
                        className="w-20 h-20 object-contain rounded border border-gray-200"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.productName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      ₹{product.price}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => {
                          setOpenEditProductForm(true);
                          setSelectedProduct(product);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-300 
              ${
                page === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
                  >
                    Prev
                  </button>

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-300 
              ${
                page === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
                  >
                    Next
          </button>
        </div>
      </div>

      {/* Upload Product Form Modal */}
      {openUploadProductForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <UploadProduct
            setOpenUploadProductForm={setOpenUploadProductForm}
            fetchAllProducts={fetchAllProducts}
          />
        </div>
      )}

      {/* Edit Product Form Modal */}
      {openEditProductForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <UpdateProduct
            setOpenEditProductForm={setOpenEditProductForm}
            selectedProduct={selectedProduct}
            fetchAllProducts={fetchAllProducts}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
