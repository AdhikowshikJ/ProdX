import React from "react";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/api";
import { Shield, Trophy, CheckCircle2 } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useAuth();
  console.log(user);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#fcf3e4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
        <div className="flex items-center space-x-4 mb-8">
          <img
            className="h-20 w-20 rounded-full shadow-md"
            src={user.avatar}
            alt={user.name}
          />
          <div>
            <h3 className="text-2xl font-bold text-[#24130f]">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-[#399373]" />
              <p className="text-sm text-gray-700 font-medium">Account Type</p>
            </div>
            <p className="text-sm text-gray-900 capitalize">{user.provider}</p>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-[#ffb54d]" />
              <p className="text-sm text-gray-700 font-medium">Member Since</p>
            </div>
            <p className="text-sm text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-6 py-3 text-lg font-medium 
                       rounded-xl text-white bg-[#ff5d5d] hover:bg-opacity-90 transition-all 
                       duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-[#ff5d5d]"
          >
            Sign Out
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-[#399373]" />
            <p className="text-sm text-gray-700 font-medium">
              Achievements Unlocked
            </p>
          </div>
          <p className="text-gray-600 italic text-sm mt-2">
            "You're doing great! Keep leveling up your productivity journey."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
