import * as React from "react";
import { CheckCircle, AlertCircle, Users, Presentation } from "../icons";

const Rules = () => {
  const rules = [
    {
      category: "Team Formation",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-400",
      items: [
        "Teams can have 1-3 members maximum",
        "All team members must be current students",
        "Cross-department collaboration is encouraged",
        "Individual participation is also welcome",
      ],
    },
    {
      category: "Submission Requirements",
      icon: <Presentation className="w-6 h-6" />,
      color: "from-purple-400 to-pink-400",
      items: [
        "Presentation is mandatory for all teams",
        "Prototype development is optional but recommended",
        "Ideas must address real campus problems",
        "Original ideas only - no plagiarism",
      ],
    },
    {
      category: "Presentation Guidelines",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-green-400 to-emerald-400",
      items: [
        "Maximum 5 minutes presentation time",
        "2 minutes for Q&A with judges",
        "Use any presentation format (PPT, demo, etc.)",
        "Focus on problem-solution fit",
      ],
    },
    {
      category: "Important Notes",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-400",
      items: [
        "Late submissions will not be accepted",
        "Judge's decision will be final",
        "Participants must be present for offline round",
        "Maintain professional conduct throughout",
      ],
    },
  ];

  return (
    <section id="rules" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Rules &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
              Guidelines
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these carefully to ensure a smooth and fair competition
            for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((section, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 hover:bg-slate-800/70 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${section.color} mr-4`}
                >
                  {section.icon}
                </div>
                <h3
                  className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${section.color}`}
                >
                  {section.category}
                </h3>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color} mt-2 flex-shrink-0`}
                    ></div>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rules;
