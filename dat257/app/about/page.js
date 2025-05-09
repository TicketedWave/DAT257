import React from "react";
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Footer from '../components/Footer';
export default function AboutPage() {
  return (
    <>
      <Navbar />
    <div className="relative min-h-screen flex flex-col items-start justify-start overflow-hidden">
      {/* Main content */}
      <main className="flex flex-col justify-start px-8 md:px-0 max-w-3xl mx-auto mt-12 ">
        {/* Left column: ABOUT US */}
          <h1 className="text-5xl md:text-6xl font-bold text-[#C1E5DF] leading-tight tracking-wide mb-2" style={{fontFamily: 'var(--font-secular-one)'}}>ABOUT</h1>
        <div className="flex flex-row items-start justify-center flex-1 px-8 md:px-0 max-w-3xl mx-auto gap-3">
        <div className="flex flex-col items-start pr-8 min-w-[110px]">
          <h2 className="text-5xl md:text-6xl font-bold text-[#C1E5DF]" style={{fontFamily: 'var(--font-secular-one)'}}>US</h2>
        </div>
        {/* Right column: paragraphs */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold text-[#1ED760] mb-1">OUR MISSION</h3>
          <p className="text-[#C1E5DF] mb-4 max-w-xl">
            At Carbon Compass, we are a group of passionate students from Chalmers University of Technology who believe in the power of data and technology to drive positive environmental change. Our mission is simple yet ambitious: to help individuals and communities better understand and reduce their carbon footprints.
          </p>
          <h3 className="text-xl font-bold text-[#1ED760] mb-1">THE PRODUCT</h3>
          <h3 className="text-l font-bold text-white mb-1">Global Carbon Emission Map</h3>
          <p className="text-[#C1E5DF] mb-4 max-w-xl">
            A comprehensive interactive map displaying the carbon emissions of every country. It provides clear data-driven insights into the global landscape of emissions, empowering users to explore, compare, and learn about carbon emissions worldwide.
          </p>
          <h3 className="text-l font-bold text-white mb-1 mt-4">Carbon Emission Calculator</h3>
          <p className="text-[#C1E5DF] mb-4 max-w-xl">
          A user-friendly tool that enables individuals to calculate their personal carbon emissions based on their daily habits and choices. This calculator offers personalized insights, helping users become more aware of their environmental impact and make informed decisions to reduce it.
          </p>
        </div>
        </div>
      </main>
      {/* About earth image at the bottom, only top arc visible */}
      <div className="absolute left-1/2" style={{ bottom: '-20px', transform: 'translateX(-50%)', width: '100%', maxWidth: '1100px', pointerEvents: 'none', userSelect: 'none' }}>
        <Image
          src="/about-earth.png"
          alt="About Earth"
          width={1100}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
    <Footer />
    </>
  );
}
