import React, { useState, useEffect } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/user")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get("/data");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await API.post("/logout");
    navigate("/login");
  };

  const handleAddData = () => {
    setSelectedItem(null);
    setName("");
    setDob("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dob) {
      toast.error("Please fill all fields!");
      return;
    }

    const newData = { name, dob };

    try {
      if (selectedItem) {
        await API.put(`/data/${selectedItem._id}`, newData);
        toast.success("Data updated successfully!");
      } else {
        await API.post("/data", newData);
        toast.success("Data added successfully!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving data!");
    }
  };

   // Handle edit data
   const handleEditData = (id) => {
    // You can add your logic here to edit the data
    console.log("Edit data with ID:", id);
    const item = data.find((d) => d._id === id); // Find the data to edit
    setSelectedItem(item); // Set the selected item
    setName(item.name); // Pre-fill the form with data
    setDob(item.dob);
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await API.delete(`/data/${id}`);
      toast.success("Data deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error("Error deleting data!");
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <div className="sticky top-0 bg-white shadow-md p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <button
              onClick={handleAddData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add New Data
            </button>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <p className="text-gray-600">Welcome, <span className="font-semibold">{user.name}</span></p>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{calculateAge(item.dob)} years</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(item.dob).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleEditData(item._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                      <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

        {/* Modal with backdrop blur */}
        {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0  backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
              <h2 className="text-xl font-bold mb-4">
                {selectedItem ? "Edit Data" : "Add New Data"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    {selectedItem ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;
