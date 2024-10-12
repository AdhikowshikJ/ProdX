import { useEffect, useState } from "react";
import {
  Sparkles,
  Coffee,
  Clock,
  Heart,
  ThumbsDown,
  User,
  Calendar,
  Star,
  Trophy,
  Target,
  Smile,
  Frown,
  PartyPopper,
  Loader,
  Download,
  Eye,
  AlertCircle,
  X,
  Flame,
} from "lucide-react";
import axios from "axios";

export default function Create() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    day: "",
    productivity: "5",
    hours: "",
    gratitude: "",
    suckedAt: "",
    username: "",
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const MAX_TASKS = 4;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() && tasks.length < MAX_TASKS) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const generateImage = async () => {
    // Check if all required fields are filled
    const requiredFields = [
      "day",
      "productivity",
      "hours",
      "gratitude",
      "suckedAt",
      "username",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0 || tasks.length === 0) {
      setToastMessage(
        "Please fill in all required fields and add at least one task."
      );
      setShowToast(true);
      return;
    }
    console.log("from create", import.meta.env.VITE_API_BASE_URL);

    try {
      setIsGenerating(true);
      const response = await axios(
        `${import.meta.env.VITE_API_BASE_URL}/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ formData, tasks }),
        }
      );
      setGeneratedImage(response.data.image);
      setShowPreview(true);
    } catch (error) {
      console.error("Error generating image:", error);
      setToastMessage("Failed to generate image. Please try again.");
      setShowToast(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `quest-log-${formData.date || "untitled"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
        setToastMessage("Failed to download image. Please try again.");
        setShowToast(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (generatedImage) {
        URL.revokeObjectURL(generatedImage);
      }
    };
  }, [generatedImage]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const emojis = ["🌟", "⭐", "✨", "🎯", "🎨", "🚀", "🎮", "🎪", "🎭", "🎪"];
  const getRandomEmoji = () =>
    emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <div className="min-h-screen bg-[#fcf3e4] p-6 relative">
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <PartyPopper className="text-[#ffb54d] animate-bounce w-16 h-16" />
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-50">
          <AlertCircle size={20} />
          <span>{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 text-white hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && generatedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-3xl p-3 sm:p-6 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#24130f]">
                Today's Progress
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <img
                src={generatedImage}
                alt="Generated Quest Log"
                className="w-full h-auto rounded-xl shadow-lg mb-4"
              />
            </div>

            <div className="flex justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowPreview(false)}
                className="px-3 sm:px-4 py-2 rounded-xl border-2 border-[#399373] text-[#399373] hover:bg-[#399373] hover:text-white transition-colors text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={downloadImage}
                className="px-3 sm:px-4 py-2 bg-[#399373] text-white rounded-xl hover:bg-opacity-90 flex items-center gap-2 text-sm sm:text-base"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-4 sm:p-8 transform hover:scale-[1.01] transition-transform">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#24130f] text-center flex items-center justify-center gap-2 sm:gap-3">
          <Trophy className="text-[#ffb54d] animate-pulse" />
          Today's Progress
          <Trophy className="text-[#ffb54d] animate-pulse" />
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Date picker */}
          <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
            <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
              <Calendar className="text-[#399373]" />
              Date
            </label>
            <input
              type="date"
              value={new Date().toISOString().split("T")[0]}
              // onChange={(e) =>
              //   setFormData({ ...formData, date: e.target.value })
              // }
              className="w-full px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                         hover:border-[#ffb54d] transition-colors bg-white shadow-sm"
            />
          </div>

          <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
            <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
              <Flame className="text-[#ff714d]" />
              Streak
            </label>
            <input
              required
              type="number"
              value={formData.day}
              placeholder="Streak No."
              min={0}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
              className="w-full px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                           hover:border-[#ffb54d] transition-colors text-center"
            />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-3 transform hover:scale-[1.02] transition-transform">
            <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
              <Target className="text-[#ffb54d]" />
              Goals ({tasks.length}/{MAX_TASKS})
            </label>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                    ${
                      task.completed
                        ? "bg-[#399373] bg-opacity-10"
                        : "bg-[#fcf3e4]"
                    }`}
                >
                  <div
                    onClick={() => toggleTask(index)}
                    className={`w-6 h-6 rounded-lg border-2 cursor-pointer flex items-center justify-center
                      transition-all duration-300 ${
                        task.completed
                          ? "border-[#399373] bg-[#399373] text-white"
                          : "border-[#f9dfb9] hover:border-[#ffb54d]"
                      }`}
                  >
                    {task.completed && <Sparkles size={14} />}
                  </div>
                  <span
                    className={`text-[#24130f] flex-1 ${
                      task.completed ? "line-through opacity-70" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  {task.completed && (
                    <PartyPopper size={16} className="text-[#399373]" />
                  )}
                </div>
              ))}
              {tasks.length >= MAX_TASKS ? (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl">
                  <AlertCircle size={16} />
                  <span>
                    Maximum quests reached! Complete existing ones first.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleAddTask}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="text"
                    required
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new quest..."
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                             hover:border-[#ffb54d] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#399373] text-white rounded-xl hover:bg-opacity-90 transform 
                             hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} />
                    Add Quest
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
              <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
                <Coffee className="text-[#399373]" />
                Productivity Level
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  required
                  value={formData.productivity}
                  onChange={(e) =>
                    setFormData({ ...formData, productivity: e.target.value })
                  }
                  className="w-full accent-[#399373]"
                />
                <span className="text-[#4a2b24] min-w-[45px] text-center font-bold">
                  {formData.productivity}/10
                </span>
              </div>
              <div className="flex justify-between px-1 text-xs text-[#4a2b24]">
                <Frown size={16} />
                <Smile size={16} />
              </div>
            </div>

            <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
              <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
                <Clock className="text-[#399373]" />
                Time Spent
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  required
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  className="w-20 px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                           hover:border-[#ffb54d] transition-colors text-center"
                />
                <span className="text-[#4a2b24] font-medium">Hours</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
            <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
              <Heart className="text-pink-500" />
              Gratitude
            </label>
            <textarea
              value={formData.gratitude}
              required
              onChange={(e) =>
                setFormData({ ...formData, gratitude: e.target.value })
              }
              placeholder="Share your magical moments of gratitude... ✨"
              className="w-full px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                       hover:border-[#ffb54d] transition-colors h-24 placeholder-[#4a2b24] placeholder-opacity-50"
            />
          </div>

          <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
            <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
              <ThumbsDown className="text-[#4a2b24]" />
              Challenges
            </label>
            <textarea
              value={formData.suckedAt}
              required
              onChange={(e) =>
                setFormData({ ...formData, suckedAt: e.target.value })
              }
              placeholder="What boss battles were tough today? 🗡️"
              className="w-full px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                       hover:border-[#ffb54d] transition-colors h-24 placeholder-[#4a2b24] placeholder-opacity-50"
            />
          </div>

          <div className="space-y-2 transform hover:scale-[1.02] transition-transform">
            <label className="flex items-center gap-2 text-[#4a2b24] font-medium">
              <User className="text-[#212121]" />
              Signature
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Sign your legendary name"
              className="w-full px-4 py-2 rounded-xl border-2 border-[#f9dfb9] focus:border-[#ffb54d] focus:outline-none
                       hover:border-[#ffb54d] transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={generateImage}
              disabled={isGenerating}
              className="flex-1 bg-[#399373] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl
                       font-semibold transform transition-all duration-300
                       hover:scale-105 hover:shadow-lg
                       flex items-center justify-center gap-2
                       relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              {isGenerating ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <>
                  <Trophy size={20} className="animate-bounce" />
                  <span>Generate Quest Log</span>
                  <PartyPopper size={20} className="group-hover:animate-spin" />
                </>
              )}
            </button>

            {generatedImage && (
              <button
                onClick={() => setShowPreview(true)}
                className="sm:px-6 px-4 py-3 sm:py-4 bg-white border-2 border-[#399373] text-[#399373] rounded-xl
                         hover:bg-[#399373] hover:text-white transition-colors
                         flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
