import React from 'react';
import Image from 'next/image';
import './contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      {/* Left column */}
      <div className="contact-details">
        <h2 className="contact-title">CONTACT</h2>

        <div className="contact-item">
          <Image
            src="/mapdonk.png" 
            alt="Map Marker"
            width={24}
            height={24}
            className="contact-icon"
          />
          <span>Rännvägen 6B, 41258 Gothenburg, Sweden</span>
        </div>

        <div className="contact-item">
          <Image
            src="/mail.png"
            alt="Email"
            width={24}
            height={24}
            className="contact-icon"
          />
          <a href="mailto:carbon-compass@chalmers.se" className="contact-link">
            carbon-compass@chalmers.se
          </a>
        </div>

        <div className="contact-item">
          <Image
            src="/phoneIcon.png"
            alt="Phone"
            width={24}
            height={24}
            className="contact-icon"
          />
          <span>07123456789</span>
        </div>
      </div>

      {/* Right column */}
      <div className="contact-image-wrapper">
        <Image
          src="/frameGlobe.png"
          alt="Earth"
          width={220}
          height={220}
          className="contact-image"
        />
      </div>
    </div>
  );
}
