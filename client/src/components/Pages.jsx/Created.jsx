import React, { useRef, useState } from "react";
import {
  Trophy,
  Calendar,
  Star,
  Target,
  Zap,
  Clock,
  Heart,
  Shield,
  User,
  CheckCircle2,
  Download,
} from "lucide-react";
import html2canvas from "html2canvas";

const DailyQuestLog = () => {
  const cardRef = useRef(null);
  const [show, setShow] = useState(true);
  const handleDownload = async () => {
    if (cardRef.current) {
      const options = {
        width: 1080,
        height: 1350,
        scale: 2,
        backgroundColor: null,
        logging: false,
      };

      try {
        const canvas = await html2canvas(cardRef.current, options);
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = 1080;
        finalCanvas.height = 1350;
        const ctx = finalCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0, 1080, 1350);

        const link = document.createElement("a");
        link.download = "daily-progress.png";
        link.href = finalCanvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  return (
    <>
      {show ? (
        <div>hello</div>
      ) : (
        <div className="min-h-screen bg-[#f6f0ff] p-5 flex flex-col items-center">
          <div
            ref={cardRef}
            className="bg-white rounded-3xl shadow-lg p-10 w-[1080px] h-[1350px] flex flex-col"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 inline-flex items-center gap-3">
                <Trophy className="w-10 h-10" />
                Today's Progress
                <Trophy className="w-10 h-10" />
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-6 text-2xl">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  <span>Date</span>
                </div>
                <div className="text-3xl mt-2">Oct 8, 2024</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-2xl">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  <span>Streak</span>
                </div>
                <div className="text-3xl mt-2">09</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-8 h-8" />
                Goals
              </div>
              <div className="space-y-4">
                {[
                  {
                    text: "Complete LeetCode Daily Challenge",
                    completed: true,
                  },
                  { text: "Study System Design for 2 hours", completed: true },
                  { text: "Work on Side Project", completed: false },
                  { text: "Practice TypeScript", completed: false },
                ].map((goal, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-5 p-6 rounded-2xl text-2xl
                  ${goal.completed ? "bg-emerald-100" : "bg-gray-50"}`}
                  >
                    <CheckCircle2
                      className={`w-8 h-8 flex-shrink-0
                    ${goal.completed ? "text-emerald-500" : "text-gray-400"}`}
                    />
                    <div>{goal.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-red-500 rounded-2xl p-6 text-2xl text-white">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  <span>Productivity</span>
                </div>
                <div className="text-3xl font-bold mt-2">8/10</div>
              </div>
              <div className="bg-emerald-500 rounded-2xl p-6 text-2xl text-white">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <span>Time Spent</span>
                </div>
                <div className="text-3xl font-bold mt-2">6 hours</div>
              </div>
            </div>

            <div className="bg-emerald-100 rounded-2xl p-6 mb-8 text-2xl">
              <div className="font-bold mb-3 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Gratitude
              </div>
              <div>
                Grateful for the amazing tech community and endless learning
                opportunities!
              </div>
            </div>

            <div className="bg-red-100 rounded-2xl p-6 mb-8 text-2xl">
              <div className="font-bold mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Difficulties
              </div>
              <div>
                Tackled tricky DP problems - breaking them down was the key to
                victory!
              </div>
            </div>

            <div className="mt-auto flex justify-end items-center gap-1">
              <div className="font-bold text-2xl flex items-center gap-2">
                <User className="w-6 h-6" />
                Signature:
              </div>
              <div className="font-['Alex_Brush'] text-5xl ml-10">
                Adhikowshik
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleDownload}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 bg-indigo-600 text-white rounded-lg 
        flex items-center gap-2 hover:bg-indigo-700 transition-colors"
      >
        <Download className="w-5 h-5" />
        Download as Image
      </button>
    </>
  );
};

export default DailyQuestLog;
