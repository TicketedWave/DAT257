import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapSection from '../map/components/MapSection';

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <MapSection />
      <Footer />
    </div>
  );
}