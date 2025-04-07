export default function Footer() {
    return (
      <footer className="bg-transparent text-white p-6 mt-10">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} CarbonCompass. All rights reserved.</p>
          <p className="mt-2">Data sourced from World Bank</p>
        </div>
      </footer>
    );
  }
  