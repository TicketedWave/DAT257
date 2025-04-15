import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapSection from '../map/components/MapSection';
import MapComponent from '../components/MapComponent';

// AIzaSyD7QbfQfs4JlKkNyPa32OQ-z3b46ctjfAw
export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      {/* <MapSection /> */}
      <MapComponent />
      <Footer />
    </div>
  );
}