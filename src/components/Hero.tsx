/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react";
import { useEffect, useState } from "react";
import { Play, ArrowDown } from "../icons";
import navigateToSection from "../utils/navigation";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
    over: false,
  });

  useEffect(() => {
    const eventDate = new Date("September 4, 2025 15:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: "0",
          hours: "0",
          minutes: "0",
          seconds: "0",
          over: true,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString(),
        hours: hours.toString(),
        minutes: minutes.toString(),
        seconds: seconds.toString(),
        over: false,
      });
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  const base = import.meta.env.BASE_URL || "/";

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${base}APPTANKimage.jpg')` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Animated Sharks */}
      <div className="absolute top-20 right-10 w-48 h-48 animate-swim opacity-60">
        <img
          src={base + "APPTANKimage.jpg"}
          alt="Swimming Shark"
          className="w-full h-full object-contain animate-float"
        />
      </div>
      <div className="absolute top-1/3 left-5 w-40 h-40 animate-swim opacity-40">
        <img
          src={base + "APPTANKimage.jpg"}
          alt="Swimming Shark"
          className="w-full h-full object-contain animate-float"
        />
      </div>
      <div className="absolute bottom-32 right-1/4 w-44 h-44 animate-swim opacity-50">
        <img
          src={base + "APPTANKimage.jpg"}
          alt="Swimming Shark"
          className="w-full h-full object-contain animate-float"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white drop-shadow-[0_5px_25px_rgba(0,200,255,0.7)]">
          App Tank
        </h1>
        <p className="mt-6 text-2xl md:text-3xl text-cyan-200 font-semibold">
          Shark Tank for Apps 🚀
        </p>

        {/* Note */}
        <p className="mt-2 text-lg text-yellow-300 font-medium">
          Only for students studying in KITS
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={base + "#/register"}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 flex items-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Enter the Tank
          </a>

          <button
            onClick={() => navigateToSection("about")}
            className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center"
          >
            <ArrowDown className="w-5 h-5 mr-2" />
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-cyan-400" />
      </div>
    </section>
  );
};

export default Hero;
