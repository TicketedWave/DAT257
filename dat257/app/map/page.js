import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapSection from '../map/components/MapSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MapSection />
      <Footer />
    </div>
  );
}