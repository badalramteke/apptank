import * as React from "react";
import { GraduationCap, Dumbbell, Lightbulb, Sparkles } from "../icons";

const Tracks = () => {
  const tracks = [
    {
      title: "Student Innovation",
      icon: <Lightbulb className="w-10 h-10" />,
      description:
        "Creative solutions for any campus-related challenges and student life",
      color: "from-purple-400 to-indigo-500",
      bgColor: "from-purple-900/20 to-indigo-900/20",
      borderColor: "border-purple-500/30",
      examples: ["Campus navigation", "Event management", "Social networking"],
    },
    {
      title: "Smart Education",
      icon: <GraduationCap className="w-10 h-10" />,
      description:
        "Apps that enhance learning, teaching, and academic experiences on campus",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-900/20 to-emerald-900/20",
      borderColor: "border-green-500/30",
      examples: [
        "Study planners",
        "Course management",
        "Academic collaboration tools",
      ],
    },
    {
      title: "Fitness & Sports",
      icon: <Dumbbell className="w-10 h-10" />,
      description:
        "Solutions for campus fitness, sports activities, and wellness programs",
      color: "from-red-400 to-pink-500",
      bgColor: "from-red-900/20 to-pink-900/20",
      borderColor: "border-red-500/30",
      examples: ["Workout trackers", "Sports booking", "Wellness monitoring"],
    },
  ];

  return (
    <section id="tracks" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Suggested{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Themes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get inspired by these themes or create something completely unique -
            these are not compulsory!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${track.bgColor} backdrop-blur-sm border ${track.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${track.color} mr-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {track.icon}
                </div>
                <h3
                  className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${track.color}`}
                >
                  {track.title}
                </h3>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {track.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-white font-semibold mb-3">
                  Example Ideas:
                </h4>
                {track.examples.map((example, exampleIndex) => (
                  <div
                    key={exampleIndex}
                    className="flex items-center space-x-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${track.color}`}
                    ></div>
                    <span className="text-gray-300 text-sm">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 inline-block">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-cyan-400 mr-2" />
              <p className="text-cyan-300 font-semibold">
                Think Outside the Tank!
              </p>
            </div>
            <p className="text-blue-300 font-semibold">
              💡 These themes are just suggestions - feel free to pitch any
              innovative idea that solves campus problems!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracks;
