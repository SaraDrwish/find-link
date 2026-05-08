import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-[#fafafc] border-t border-gray-100 mt-16 overflow-hidden">
      {/* أشكال هندسية متحركة */}
      <div className="footer-shape w-48 h-48 -top-12 -left-12 opacity-30"></div>
      <div className="footer-shape w-64 h-64 bottom-0 -right-20 opacity-20 animation-delay-2000"></div>
      <div className="footer-shape w-40 h-40 top-20 right-1/3 opacity-10 animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center xs:text-right">
          <div className="text-sm text-gray-500">
                 تجمع لثيمات وروابط متاجر سلة وزد 
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-[#a46df6] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 4.5 3 8.3 7 9.5v-6.7H6.5v-2.8H9v-2.1c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.8h-2.4V21c4-.5 7-3.8 7-8.5z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#a46df6] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 4.3 2.8 7.9 6.7 9.2.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1.8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.7 0 3.9-2.4 4.7-4.7 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 3.9-1.3 6.7-4.9 6.7-9.2 0-5.4-4.4-9.8-9.8-9.8z"/></svg>
            </a>
          </div>
        </div>
        <div className="text-center text-md text-gray-400 mt-4">
    
             © 2026 ثيمات كرافو – جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}