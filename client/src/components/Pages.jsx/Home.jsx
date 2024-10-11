import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Trophy,
  Star,
  ChevronRight,
  CheckCircle2,
  ChartBar,
  Users,
  Calendar,
  Gamepad2,
  Sword,
  Shield,
  Flame,
  Rocket,
  Zap,
  Crown,
  Target,
  Map,
  Compass,
  Swords,
  Heart,
  Medal,
  GanttChart,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const action = user ? "create" : "login";
  console.log(user);
  return (
    <div className="bg-[#fcf3e4]">
      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-4 mb-6">
              <Sword className="w-8 h-8 text-[#399373] animate-bounce" />
              <Shield className="w-8 h-8 text-[#ffb54d] animate-bounce delay-100" />
              <Crown className="w-8 h-8 text-[#399373] animate-bounce delay-200" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#24130f] mb-6">
              Transform Your Productivity into{" "}
              <span className="text-[#399373] inline-flex items-center gap-2">
                Epic Quests{" "}
                <Sparkles className="w-8 text-[#ffb54d] h-8 animate-pulse" />
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Convert your daily tasks into beautiful, shareable logs. Boost
              motivation, track goals, and share your journey with others.
            </p>
            <Link
              to={`/${action}`}
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white 
                        bg-[#399373] rounded-xl hover:bg-opacity-90 transition-all duration-300 
                        hover:scale-105 shadow-lg hover:shadow-xl gap-2"
            >
              Create Now!
              <Rocket className="w-5 h-5 animate-pulse" />
            </Link>
          </div>

          {/* Testimonial */}
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 max-w-lg mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#399373] ">
                <img
                  className="w-18 h-14 object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                />
              </div>
              <div>
                <p className="text-gray-600 italic">
                  Visual quest logs make every task feel like an achievement!"
                </p>
                <div className="flex items-center  gap-2 mt-2">
                  <p className="text-sm font-medium">- Alex Suprun</p>
                  <Star
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#24130f] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-4 mb-6">
            <Target className="w-8 h-8 text-[#399373] animate-pulse" />
            <Flame className="w-8 h-8 text-[#ffb54d] animate-pulse delay-100" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            80% of users feel more productive with visual logs
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
            Transform your daily achievements into beautiful visual logs that
            keep you motivated and help you track your progress.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-[#ffb54d] animate-pulse" />,
                stat: "50%",
                text: "Improved Focus",
              },
              {
                icon: <Map className="w-8 h-8 text-[#399373] animate-pulse" />,
                stat: "10,000+",
                text: "Quest Logs Created",
              },
              {
                icon: (
                  <Swords className="w-8 h-8 text-pink-500 animate-pulse" />
                ),
                stat: "1,000+",
                text: "Active Adventurers",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 
                              rounded-full bg-white/10 mb-4 hover:scale-110 transition-transform"
                >
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{item.stat}</h3>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-4 mb-6">
            <Gamepad2 className="w-8 h-8 text-[#399373] animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-center text-[#24130f] mb-12">
            Choose Your Quest Type
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Daily Quests",
                description: "Transform habits into epic daily adventures",
                icon: (
                  <Compass className="w-6 h-6 text-[#399373] animate-spin-slow" />
                ),
              },
              {
                title: "Guild Projects",
                description: "Coordinate epic team missions and raids",
                icon: <GanttChart className="w-6 h-6 text-[#ffb54d]" />,
              },
              {
                title: "Achievement Hunter",
                description: "Track and share your legendary accomplishments",
                icon: (
                  <Trophy className="w-6 h-6 text-pink-500 animate-pulse" />
                ),
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
                            transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-lg bg-[#fcf3e4] flex items-center 
                              justify-center mb-4"
                >
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-[#24130f] mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#24130f] mb-12">
            Choose Your Plan{" "}
            <span
              className="text-[#988872] 
            "
            >
              (Soon)
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                features: [
                  "10 quest logs per month",
                  "Basic image generation",
                  "Standard templates",
                  "Community support",
                ],
              },
              {
                name: "Pro",
                price: "$9",
                features: [
                  "Unlimited quest logs",
                  "Premium templates",
                  "Advanced tracking",
                  "Priority support",
                ],
                recommended: true,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 ${
                  plan.recommended ? "bg-[#24130f] text-white" : "bg-[#fcf3e4]"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-base font-normal">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/${action}`}
                  className={`block text-center py-3 rounded-lg font-medium 
                            transition-all duration-300 ${
                              plan.recommended
                                ? "bg-[#399373] text-white hover:bg-opacity-90"
                                : "bg-[#24130f] text-white hover:bg-opacity-90"
                            }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#24130f] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "How does the quest log system work?",
                answer:
                  "ProdX transforms your daily tasks into visual quest logs. Simply input your tasks, track your progress, and share your achievements with others.",
              },
              {
                question: "Can I customize my quest log templates ? (soon)",
                answer:
                  "Yes! ProdX offers various customizable templates to match your style and preferences. Pro users get access to premium templates.",
              },
              {
                question: "How can I share my progress with others?",
                answer:
                  "You can easily share your quest logs on social media or export them as beautiful images to inspire others on their productivity journey.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-[#24130f] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#24130f] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Productivity Journey Today
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their daily tasks into
            epic achievements. Start creating beautiful productivity logs today!
          </p>
          <Link
            to={`/${action}`}
            className="inline-flex items-center px-8 py-4 text-lg font-medium 
                     bg-[#399373] rounded-xl hover:bg-opacity-90 transition-all 
                     duration-300 hover:scale-105 shadow-lg hover:shadow-xl gap-2"
          >
            Create Your First Quest Log
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer
      <footer className="bg-[#fcf3e4] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#ffb54d]" />
                <h3 className="text-xl font-bold">ProdX</h3>
              </div>
              <p className="text-gray-600">
                Transform your productivity into epic quests
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Templates", "Showcase"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Support", "Privacy", "Terms"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to="/"
                        className="text-gray-600 hover:text-[#399373]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer> */}
    </div>
  );
}
