/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Prizes from "./components/Prizes";
import Tracks from "./components/Tracks";
import Timeline from "./components/Timeline";
import Rules from "./components/Rules";
import Registration from "./components/Registration";
import RegistrationButton from "./components/Registration_button";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-gray-900">
              <Header />
              <Hero />
              <About />
              <Prizes />
              <Tracks />
              <Timeline />

              <Rules />
              <RegistrationButton />
              <FAQ />
              <Footer />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-gray-900">
              <Header />
              <Registration />
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
