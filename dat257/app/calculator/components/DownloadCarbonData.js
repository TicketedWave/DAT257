'use client';

import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import html2pdf from 'html2pdf.js';

const DownloadCarbonEstimate = ({ estimate }) => {
  const ref = useRef(null);

  const downloadPng = async () => {
    if (!ref.current) return;

    try {
      const dataUrl = await toPng(ref.current);
      const link = document.createElement('a');
      link.download = 'carbon-estimate.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG download failed', error);
    }
  };

  const downloadPdf = () => {
    if (!ref.current) return;

    const element = ref.current;
    const opt = {
      margin:       0.5,
      filename:     'carbon-estimate.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-4">
      {/* Element to render to image or PDF */}
      <div
        ref={ref}
        className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white text-black text-center mx-auto"
        style={{ background: '#f4f4f4' }}
      >
        <h2 className="text-xl font-semibold mb-2">Your Carbon Emission Estimate</h2>
        <p className="text-2xl font-bold">{estimate} kg CO₂</p>
      </div>

      {/* Download Buttons */}
      <div className="flex gap-4 mt-4 justify-center">
        <button
          onClick={downloadPng}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download as PNG
        </button>
        <button
          onClick={downloadPdf}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default DownloadCarbonEstimate;
