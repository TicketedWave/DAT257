import Navbar from './components/Navbar';
import FrontSection from './components/FrontSection';
import Footer from './components/Footer';

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <FrontSection />
      <Footer />
    </div>
  );
}