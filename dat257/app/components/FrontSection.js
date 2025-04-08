import Link from 'next/link';

export default function FrontSection() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="hero-container">
        {/* Filled text behind planet */}
        <div className="text-layer filled">Carbon Compass</div>

        {/* Planet image */}
        <img src="/planet.png" alt="Planet" className="planet" />

        {/* Stroked text in front of planet */}
        <div className="text-layer stroked">Carbon Compass</div>

        {/* Vertical buttons on left side */}
        <div className="button-group">
          <div className="impact-text">
            See the Impact,<br />
            Make a Change
          </div>
          <Link href="/calculator" className="hero-button green">
            <span>Carbon Calculator</span>
          </Link>
          <Link href="/map" className="hero-button blue">
            <span>Carbon Map</span>
          </Link>
        </div>
      </div>
    </main>
  );
}