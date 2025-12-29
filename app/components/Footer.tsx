export default function Footer() {
  return (
    <footer className="border-t border-gray-900 px-6 py-12 bg-black">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} David Hervas Pardo. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex gap-6">
            <a href="/train" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Training
            </a>
            <a href="/work" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Portfolio
            </a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
