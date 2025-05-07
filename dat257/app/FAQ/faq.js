'use client';
import { useState } from 'react';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is a carbon footprint?',
      answer:
        'A carbon footprint is the total amount of greenhouse gases (including CO₂) emitted directly or indirectly by human activities, usually measured in tons of CO₂ equivalent per year.',
    },
    {
      question: 'Why should I care about my carbon footprint?',
      answer:
        'Reducing your carbon footprint helps combat climate change and protect the environment.',
    },
    {
      question: 'How is a carbon footprint calculated?',
      answer:
        'It is based on energy usage, transportation habits, diet, and consumption patterns.',
    },
    {
      question: 'What are the easiest ways to reduce my carbon footprint?',
      answer:
        'You can reduce your carbon footprint by using public transport, conserving energy, and choosing sustainable products.',
    },
    {
      question: 'Can I save my results and track changes over time?',
      answer:
        'Yes, if the platform supports account creation and data tracking, your progress can be saved.',
    },
    {
      question: 'Resources',
      answer:
        'Visit government or environmental organization websites for tools and tips.',
    },
  ];

  return (
    
    <div className="min-h-screen bg-[url('/Background.png')] bg-cover bg-center flex items-center justify-center px-4 w-full h-full">
      <div className="w-[1300px] h-[500px] bg-[#2D2D2D]/90 rounded-2xl flex overflow-hidden shadow-xl">
        
        {/* Left Title Panel */}
        <div className="w-1/3 p-10 flex items-center justify-center bg-transparent">
          <h1 className="text-6xl font-bold text-[#C1E5DF] leading-tight">
            Frequently<br />Asked<br />Questions
          </h1>
        </div>

        {/* Right Accordion Panel */}
        <div className="w-2/3 p-8 overflow-y-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-600 py-4">
              <button
  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
  className={`flex justify-between items-center w-full text-left text-white font-medium text-base transition-colors duration-200`}
>
  <span
    className={`${
      openIndex === index ? 'text-green-400' : 'text-white'
    }`}
  >
    {faq.question}
  </span>
  <span
    className={`text-xl transition-colors duration-200 ${
      openIndex === index ? 'text-green-400' : 'text-white'
    }`}
  >
    {openIndex === index ? '▲' : '▼'}
  </span>
</button>

              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-300 w-full break-words">
                {faq.answer}
              </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


  
  
