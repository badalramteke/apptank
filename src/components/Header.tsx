import * as React from "react";
import { useState } from "react";
import { Menu, X, Shark } from "../icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const base = import.meta.env.BASE_URL || "/";
  const navItems = [
    { name: "About", href: `${base}#/` },
    { name: "Prizes", href: `${base}#/` },
    { name: "Tracks", href: `${base}#/` },
    { name: "Timeline", href: `${base}#/` },
    { name: "Rules", href: `${base}#/` },
    { name: "Register", href: `${base}#/register` },
    { name: "FAQ", href: `${base}#/` },
  ];

  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <a href={`${base}#/`} className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-lg">
                <Shark className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">APP TANK</h1>
                <p className="text-sm text-blue-300">Shark Tank for Apps</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500/20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
