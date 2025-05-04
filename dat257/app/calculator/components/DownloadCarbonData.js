'use client';

import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';


const DownloadCarbonEstimate = ({ estimate }) => {
  const ref = useRef(null);

  const downloadPng = () => {
    const exportEl = document.getElementById('pngExportSection');
    if (!exportEl) {
      alert('Estimate is not available for export.');
      return;
    }
  
    html2canvas(exportEl).then((canvas) => {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'carbon_footprint.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  
  

  const downloadPdf = async () => {
    if (!ref.current) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: 0.5,
        filename: 'carbon-estimate.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().set(opt).from(ref.current).save();
    } catch (error) {
      console.error('PDF download failed', error);
    }
  };

  const downloadCsv = () => {
    const csvContent = `Your Carbon Emission,${estimate}\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'carbon-estimate.csv');
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([['Your Carbon Emission', estimate]]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carbon-estimate.xlsx';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 mt-12">
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
        <div
          ref={ref}
          className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white text-black text-center mx-auto"
          style={{ background: '#f4f4f4' }}
        >
          <h2 className="text-xl font-semibold mb-2">Your Carbon Emission Estimate</h2>
          <p className="text-2xl font-bold">{estimate} kg CO₂</p>
        </div>
      </div>
      <div id="pngExportSection" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <div style={{ padding: '20px', backgroundColor: '#fff', color: '#000' }}>
          <h2>Your Carbon Footprint Estimate</h2>
          <p><strong>Total:</strong> {estimate} kg CO₂ per year</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 text-center">
        Download Your Estimate as:
      </h3>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <button
          onClick={downloadPng}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          PNG
        </button>
        <button
          onClick={downloadPdf}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          PDF
        </button>
        <button
          onClick={downloadCsv}
          className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        >
          CSV
        </button>
        <button
          onClick={downloadExcel}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Excel
        </button>
      </div>
    </div>
  );
};

export default DownloadCarbonEstimate;
