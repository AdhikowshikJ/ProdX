import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  Sparkles,
  AlertCircle,
  Shield,
  Trophy,
  Target,
  CheckCircle2,
} from "lucide-react";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const errorMessages = {
        google_auth_not_configured: "Google authentication is not configured",
        github_auth_not_configured: "GitHub authentication is not configured",
      };
      setError(errorMessages[errorParam] || "Authentication error occurred");
    }
  }, [searchParams]);

  const handleLogin = (provider) => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex bg-[#fcf3e4]">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-[#399373] animate-bounce" />
              <Sparkles className="w-8 h-8 text-[#ffb54d] animate-bounce delay-100" />
              <Trophy className="w-8 h-8 text-[#399373] animate-bounce delay-200" />
            </div>
            <h2 className="text-4xl font-bold text-[#24130f] mb-4">
              Welcome Back
            </h2>
            <p className="text-gray-600">Continue your productivity journey</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleLogin("google")}
              className="w-full flex items-center justify-center px-6 py-4 text-lg font-medium 
                       rounded-xl text-white bg-[#399373] hover:bg-opacity-90 
                       transition-all duration-300 hover:scale-105 shadow-lg 
                       hover:shadow-xl focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-[#399373]"
            >
              <FaGoogle className="mr-3 text-xl" />
              Sign in with Google
            </button>

            <button
              onClick={() => handleLogin("github")}
              className="w-full flex items-center justify-center px-6 py-4 text-lg 
                       font-medium rounded-xl text-white bg-[#24130f] 
                       hover:bg-opacity-90 transition-all duration-300 
                       hover:scale-105 shadow-lg hover:shadow-xl 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-[#24130f]"
            >
              <FaGithub className="mr-3 text-xl" />
              Sign in with GitHub
            </button>
          </div>

          {/* Testimonial */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#399373] flex-shrink-0">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src="/api/placeholder/48/48"
                  alt="User avatar"
                />
              </div>
              <div>
                <p className="text-gray-600 italic text-sm">
                  "ProdX transformed how I track my daily achievements. The
                  gamified approach makes every task feel rewarding!"
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm font-medium">- Alex M.</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Target
                        key={i}
                        className="w-3 h-3 text-[#ffb54d]"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Features/Benefits */}
      <div className="hidden lg:flex w-1/2 bg-[#24130f] text-white">
        <div className="w-full max-w-lg mx-auto flex items-center p-12">
          <div>
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                Level Up Your Productivity
                <Target className="w-8 h-8 text-[#ffb54d] animate-pulse" />
              </h3>
              <p className="text-gray-400 text-lg">
                Join thousands of users who have transformed their daily tasks
                into epic achievements.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: <Shield className="w-6 h-6 text-[#399373]" />,
                  title: "Secure & Private",
                  description: "Your data is encrypted and protected",
                },
                {
                  icon: <Trophy className="w-6 h-6 text-[#ffb54d]" />,
                  title: "Achievement Tracking",
                  description: "Visualize your progress with beautiful logs",
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-[#399373]" />,
                  title: "Task Gamification",
                  description: "Turn mundane tasks into exciting quests",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute transform -rotate-45"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: "2px",
                      height: "40px",
                      background:
                        "linear-gradient(to bottom, #399373, transparent)",
                      animation: `float ${
                        2 + Math.random() * 4
                      }s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-45deg);
          }
          50% {
            transform: translateY(-20px) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
