import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const userData = async () => {
    const response = await fetch("http://localhost:5000/api/linkedin/profile", {
      credentials: "include",
    });

    const data = await response.json();
    setUser(data.user);
  };

  const handleLogout = async () => {
    window.location.href = "http://localhost:5000/api/linkedin/logout";
    navigate('/')
  };


  useEffect(() => {
    userData();
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user.img}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>

        {/* Name */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-1">
          {user.name}
        </h1>

        {/* Email */}
        <p className="text-gray-500 text-lg">{user.email}</p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Dummy or Extra Information */}
        <div className="text-gray-700 space-y-2">
          <p className="text-sm">
            <span className="font-medium">Member since:</span> Jan 2025
          </p>
          <p className="text-sm">
            <span className="font-medium">Status:</span> Active
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;