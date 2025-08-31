import * as React from "react";
import { Calendar, Clock, Users, Award } from "../icons";

const Timeline = () => {
  const events = [
    {
      date: "Aug 31 - Sep 4",
      time: "12:00 AM IST",
      title: "Registration + Idea Submission",
      description: "Submit your innovative app ideas online",
      icon: <Calendar className="w-6 h-6" />,
      status: "registration",
      color: "from-blue-500 to-cyan-400",
    },
    {
      date: "Sep 4",
      time: "12:00 AM IST",
      title: "Shortlisting Round",
      description: "Online elimination round begins",
      icon: <Users className="w-6 h-6" />,
      status: "shortlisting",
      color: "from-purple-500 to-indigo-400",
    },
    {
      date: "Sep 4",
      time: "3:00 PM IST",
      title: "Offline Finale",
      description: "Present your ideas to the judges",
      icon: <Award className="w-6 h-6" />,
      status: "finale",
      color: "from-yellow-500 to-orange-400",
    },
  ];

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Clock className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Timeline
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mark your calendars and prepare for an exciting journey from idea to
            presentation
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full hidden md:block"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-8"
                      : "md:text-left md:pl-8"
                  }`}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="flex items-center mb-4 justify-center md:justify-start">
                      <div
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${event.color} mr-3`}
                      >
                        {event.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{event.date}</p>
                        <p className="text-sm text-blue-300">{event.time}</p>
                      </div>
                    </div>
                    <h3
                      className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${event.color} mb-3`}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full border-4 border-slate-900 z-10 hidden md:block"></div>

                {/* Spacer */}
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 inline-block">
            <p className="text-red-300 font-semibold flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2" />
              Registration closes on September 4, 2025 at 12:00 AM IST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
