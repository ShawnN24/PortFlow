import React from "react";
import Navbar from "../components/Navbar";
import { Hero } from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Footer from "../components/Footer";
import Problem from "../components/sections/Problem";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar/>
      <main className="flex-1">
        <Hero/>
        <Problem/>
        <Features/>
      </main>
      <Footer/>
    </div>
  );
}
