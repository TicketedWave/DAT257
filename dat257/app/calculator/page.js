// app/calculator/page.js
'use client';
import { useState } from 'react';
import './questionnaire.css';
import Navbar from '../components/Navbar';
export default function CalculatorPage() {
    const [value, setValue] = useState(50);
    
    // Define icons array
    const icons = [
      { name: "one", src: "/icon.png" },
      { name: "two", src: "/icon.png" },
      { name: "three", src: "/icon.png" },
      { name: "four", src: "/icon.png" }
    ];
  
    return (
      <>
        <Navbar />
        <div className="questionnaire-container">
          
          
          <div className="question-card">
          <h1 className="title">CATEGORY</h1>
            <h2>How often do you eat animal based products?</h2>
            <p className="subtext">(beef, pork, chicken, fish, eggs, dairy products)</p>
            
            {/* Slider with properly positioned labels */}
            <div className="slider-wrapper">
              <div className="slider-container">
                <span className="slider-label left">NEVER</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="slider"
                />
                <span className="slider-label right">VERY OFTEN</span>
              </div>
            </div>
  
            {/* Icons row */}
            <div className="icon-row">
              {icons.map((icon) => (
                <div key={icon.name} className="icon-item">
                  <img src={icon.src} alt={icon.name} />
                  <span>{icon.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }