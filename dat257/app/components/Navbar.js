import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const linkStyle = {
    fontFamily: 'var(--font-secular-one)',
    fontSize: '22px',
    color: '#C1E5DF',
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      {/* Desktop Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-end items-center space-x-8">
          {/* Home link with icon */}
          <Link 
            href="/home" 
            className="flex items-center hover:text-green-600 transition-colors"
            style={linkStyle}
          >
            <Image
              src="/home-icon.png"
              alt="Home"
              width={24}
              height={24}
              className="mr-2"
            />
          </Link>
          
          <Link
            href="/about"
            className="hover:text-green-600 transition-colors"
            style={linkStyle}
          >
            About
          </Link>
          
          <Link
            href="/faq"
            className="hover:text-green-600 transition-colors"
            style={linkStyle}
          >
            FAQ
          </Link>
          
          <Link
            href="/contact"
            className="hover:text-green-600 transition-colors"
            style={linkStyle}
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (shown when clicked) */}
      <div className="md:hidden bg-white border-t">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/about" 
            className="block px-3 py-2 text-gray-700 hover:text-green-600"
          >
            About
          </Link>
          <Link 
            href="/faq" 
            className="block px-3 py-2 text-gray-700 hover:text-green-600"
          >
            FAQ
          </Link>
          <Link 
            href="/contact" 
            className="block px-3 py-2 text-gray-700 hover:text-green-600"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}