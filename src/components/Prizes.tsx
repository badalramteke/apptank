import * as React from "react";
import { Trophy, Gift, Star } from "../icons";

const Prizes = () => {
  const prizes = [
    {
      rank: "🏆 Winner Team",
      icon: <Trophy className="w-12 h-12" />,
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-900/20 to-orange-900/20",
      borderColor: "border-yellow-500/30",
      rewards: [
        "Chance to develop the prototype with team",
        "Frontend Masters courses worth ₹40,000 for free!",
        "Recognition and bragging rights!",
      ],
    },
    {
      rank: "All Participants",
      icon: <Gift className="w-12 h-12" />,
      color: "from-blue-400 to-cyan-400",
      bgColor: "from-blue-900/20 to-cyan-900/20",
      borderColor: "border-blue-500/30",
      rewards: [
        "Free .com domain for all participants",
        "Certificate of participation",
      ],
    },
  ];

  return (
    <section id="prizes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Star className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Amazing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Prizes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compete for incredible rewards and recognition for your innovative
            app ideas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${prize.bgColor} backdrop-blur-sm border ${prize.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-center mb-6">
                <div
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${prize.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  {prize.icon}
                </div>
                <h3
                  className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${prize.color} mb-4`}
                >
                  {prize.rank}
                </h3>
              </div>

              <div className="space-y-3">
                {prize.rewards.map((reward, rewardIndex) => (
                  <div key={rewardIndex} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${prize.color} mt-2 flex-shrink-0`}
                    ></div>
                    <p className="text-gray-300 leading-relaxed">{reward}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 inline-block">
            <p className="text-purple-300 font-semibold">
              🦈 Only the strongest idea will survive the tank!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
