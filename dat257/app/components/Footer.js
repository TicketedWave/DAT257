export default function Footer() {
  return (
    <footer className="bg-black p-6">
      <div className="container mx-auto text-center">
        <p className="text-[#C1E5DF]">© {new Date().getFullYear()} CarbonCompass. All rights reserved.</p>
        <p className="mt-2 text-[#C1E5DF]">A project made by Chalmers students</p>
      </div>
    </footer>
  );
}
