import * as React from "react";
import { useState } from "react";
import { Menu, X, Shark } from "../icons";
import navigateToSection from "../utils/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const base = import.meta.env.BASE_URL || "/";
  // nav items: sections will scroll to ids on the home page; 'route' type will navigate to a route.
  const navItems: Array<{
    name: string;
    type: "section" | "route";
    id?: string;
    href?: string;
  }> = [
    { name: "About", type: "section", id: "about" },
    { name: "Prizes", type: "section", id: "prizes" },
    { name: "Tracks", type: "section", id: "tracks" },
    { name: "Timeline", type: "section", id: "timeline" },
    { name: "Rules", type: "section", id: "rules" },
    { name: "Register", type: "route", href: `${base}#/register` },
    { name: "FAQ", type: "section", id: "faq" },
  ];

  // use shared navigateToSection helper

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
            {navItems.map((item) =>
              item.type === "route" ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => navigateToSection(item.id)}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              )
            )}
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
              {navItems.map((item) =>
                item.type === "route" ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigateToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium text-left"
                  >
                    {item.name}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
