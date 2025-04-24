import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarbonFootprintCalculator from '../map/components/CarbonFootprintCalculator';
export default function Home() {
  return (
    <div className="min-h-screen f">
      <Navbar />
      <CarbonFootprintCalculator />
      <Footer />
    </div>
  );
}