import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/api/products",
        { title, price: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate("/products");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-6">
      {/* Top Header Label */}
      <button
        onClick={() => navigate("/products")}
        className="mb-8 text-gray-400 hover:text-indigo-600 font-bold flex items-center gap-2 cursor-pointer transition-all"
      >
        ← Back to Inventory
      </button>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-50">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
            📦
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            New Product
          </h2>
          <p className="text-gray-400 font-medium mt-2">
            Add a new item to your warehouse
          </p>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
              Product Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all font-semibold text-gray-700 placeholder:text-gray-300"
              placeholder="e.g. Gaming Mouse"
              required
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all font-semibold text-gray-700 placeholder:text-gray-300"
              placeholder="0.00"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-indigo-200 transition-all active:scale-95 text-lg"
            >
              Save Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="w-full mt-4 cursor-pointer text-gray-400 font-bold hover:text-red-500 transition-colors py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
