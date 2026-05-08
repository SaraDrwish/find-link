export default function CategoryCard({ category, links }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden card-hover">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] p-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl animate-float">📁</span>
          {category.name}
        </h2>
      </div>
      
      <div className="p-6 space-y-3">
        {links.map((link, idx) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-[#FEF3C7] hover:to-[#FDE68A] transition-all duration-300 group link-pulse"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 group-hover:text-[#0F172A]">
                🔗 {link.title}
              </span>
              <span className="text-[#F59E0B] opacity-0 group-hover:opacity-100 transition">← اضغط للذهاب</span>
            </div>
            <span className="text-sm text-gray-400">{link.url}</span>
          </a>
        ))}
        
        {links.length === 0 && (
          <p className="text-gray-400 text-center py-4">لا توجد روابط حتى الآن</p>
        )}
      </div>
    </div>
  )
}