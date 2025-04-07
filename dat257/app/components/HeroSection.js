import Link from 'next/link';

export default function HeroSection() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="container mx-auto text-center py-20">
      <h1 className="text-[140px] text-[#C1E5DF] mb-6"
      style={{ fontFamily: 'var(--font-secular-one)' }}>
      Carbon Compass
      </h1>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/calculator" 
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
          >
            Carbon Calculator
          </Link>
          <Link 
            href="/map" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            View Carbon Map
          </Link>
        </div>
      </div>
    </main>
  );
}