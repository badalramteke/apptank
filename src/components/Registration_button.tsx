import React from "react";
import { ExternalLink, Download, Users, Calendar, MapPin } from "../icons";

const Registration = () => {
  const base = import.meta.env.BASE_URL || "/";
  return (
    <section
      id="register"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Shark Background */}
      <div className="absolute inset-0 opacity-15">
        {/* Swimming Sharks */}
        <div className="absolute top-10 right-10 w-40 h-40 animate-pulse animate-shark-swim duration-6000 delay-0">
          <img
            src={base + "WhatsApp Image 2025-08-30 at 00.02.10_8a435342.jpg"}
            alt="Shark"
            className="w-full h-full object-contain opacity-40 animate-bounce duration-6000 delay-0"
          />
        </div>
        <div className="absolute top-1/3 left-5 w-32 h-32 animate-pulse animate-shark-swim duration-8000 delay-2000">
          <img
            src={base + "WhatsApp Image 2025-08-30 at 00.02.10_8a435342.jpg"}
            alt="Shark"
            className="w-full h-full object-contain opacity-30 animate-bounce duration-8000 delay-2000"
          />
        </div>
        <div className="absolute bottom-20 right-1/4 w-36 h-36 animate-pulse animate-shark-swim duration-7000 delay-4000">
          <img
            src={base + "WhatsApp Image 2025-08-30 at 00.02.10_8a435342.jpg"}
            alt="Shark"
            className="w-full h-full object-contain opacity-25 animate-bounce duration-7000 delay-4000"
          />
        </div>

        {/* Water Wave Effects */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/20 to-transparent">
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Enter the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              TANK
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to face the sharks? Register now and prepare to pitch your
            revolutionary app idea!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">
              Registration Deadline
            </h3>
            <p className="text-gray-300">Sep 4, 2025 - 12:00 AM</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Team Size</h3>
            <p className="text-gray-300">1-3 Members</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Finale Venue</h3>
            <p className="text-gray-300">Campus Location</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 to-blue-900/40 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Dive In?
            </h3>
            <p className="text-gray-300 mb-6">
              Complete your registration through our Google Form and download
              our pitch deck template to get started
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={base + "#/register"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Register For Competition
            </a>

            <a
              href="#"
              download="AppTank_Pitch_Deck_Template.pptx"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Pitch Template
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
          <div className="text-center">
            <h4 className="text-yellow-300 font-bold text-lg mb-3">
              🦈 Survival Tips for the Tank
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-gray-300">
                <strong className="text-yellow-400">Be Clear:</strong> Explain
                your idea simply and concisely
              </div>
              <div className="text-gray-300">
                <strong className="text-orange-400">Show Impact:</strong>{" "}
                Demonstrate how it solves real campus problems
              </div>
              <div className="text-gray-300">
                <strong className="text-red-400">Stay Confident:</strong>{" "}
                Believe in your idea and present with passion
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
