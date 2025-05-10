
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from './contact';
import './contact.css';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-[url('/stars-bg.png')] bg-cover bg-center py-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
