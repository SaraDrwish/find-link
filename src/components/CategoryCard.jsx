export default function CategoryCard({ category, links }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-4 text-center">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
      </div>
      <div className="p-4 space-y-2">
        {links.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-gray-50 rounded-lg hover:bg-[#a46df6]/10 transition text-right"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#a46df6]">←</span>
              <span className="font-medium text-[#150543]">{link.title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}