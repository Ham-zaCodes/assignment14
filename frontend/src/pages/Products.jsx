import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useContext(AuthContext); // Logout context se liya
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5001/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">
              P
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              Inventory<span className="text-indigo-600">Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/add-product")}
              className="hidden md:block cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
            >
              + Add Product
            </button>
            <button
              onClick={logout}
              className="cursor-pointer text-sm font-bold text-gray-500 hover:text-red-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Your Warehouse
          </h1>
          <p className="text-gray-500 font-medium">
            Manage and track your products in real-time.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-bold">
              No products found. Start by adding some!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-indigo-100 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-100 transition-colors">
                    📦
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-black">
                    ${p.price}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-8 truncate capitalize">
                  {p.title}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/edit-product/${p._id}`)}
                    className="cursor-pointer py-3 bg-gray-50 text-gray-600 hover:bg-amber-100 hover:text-amber-700 font-bold rounded-xl transition-all text-xs uppercase tracking-widest"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="cursor-pointer py-3 bg-gray-50 text-gray-600 hover:bg-red-100 hover:text-red-700 font-bold rounded-xl transition-all text-xs uppercase tracking-widest"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
