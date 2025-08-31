import * as React from "react";
import { Lightbulb, Presentation, Code, Trophy } from "../icons";

const About = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Fresh Ideas",
      description: "Bring innovative solutions to campus problems",
    },
    {
      icon: <Presentation className="w-8 h-8" />,
      title: "Pitch Perfect",
      description: "Present your ideas with confidence and clarity",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Optional Prototype",
      description: "Build a working demo to strengthen your pitch",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Win Big",
      description: "Compete for amazing prizes and recognition",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              APP TANK
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            APP TANK is the ultimate platform for student innovators to showcase
            their app ideas. Inspired by Shark Tank, this event brings together
            creative minds to solve real campus problems through technology and
            innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 text-center hover:bg-slate-800/70 hover:border-blue-400/40 transition-all duration-300 group"
            >
              <div className="text-blue-400 mb-4 group-hover:text-cyan-300 transition-colors duration-300 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              What Makes APP TANK Special?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-xl font-semibold text-blue-300 mb-3">
                  Campus-Focused
                </h4>
                <p className="text-gray-300">
                  Solve real problems that affect student life on campus
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-300 mb-3">
                  Flexible Format
                </h4>
                <p className="text-gray-300">
                  Presentation required, prototype optional but encouraged
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
