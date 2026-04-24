import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        // Handling both possible response structures
        const p = res.data.data || res.data;
        setTitle(p.title);
        setPrice(p.price);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token && id) fetchProduct();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/api/products/${id}`,
        { title, price: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate("/products");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 font-bold">Fetching Item Details...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        className="mb-8 text-gray-500 hover:text-indigo-600 font-bold flex items-center gap-2 cursor-pointer transition-colors"
      >
        ← Back to Inventory
      </button>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-50">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            📝
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Edit Item
          </h2>
          <p className="text-gray-400 font-medium mt-2">
            Update your product details
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
              Product Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all font-semibold text-gray-700"
              placeholder="e.g. Premium Wireless Mouse"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
              Retail Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all font-semibold text-gray-700"
              placeholder="0.00"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-indigo-200 transition-all active:scale-95 text-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="w-full mt-4 cursor-pointer text-gray-400 font-bold hover:text-red-500 transition-colors py-2 text-sm"
            >
              Discard Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
