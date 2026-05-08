import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const adminCards = [
    { title: 'إدارة الثيمات', path: '/admin/themes', icon: '🎨', color: 'from-blue-500 to-purple-500' },
    { title: 'إدارة الفئات', path: '/admin/categories', icon: '📂', color: 'from-green-500 to-teal-500' },
    { title: 'إدارة الروابط', path: '/admin/links', icon: '🔗', color: 'from-orange-500 to-red-500' },
  ]
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white">🔧 لوحة تحكم الأدمن</h1>
        <p className="text-white/80 mt-2">أضف، عدل، أو احذف المحتوى بكل مرونة</p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {adminCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Link
              to={card.path}
              className={`block bg-gradient-to-r ${card.color} p-6 rounded-2xl shadow-lg text-white text-center hover:shadow-xl transition`}
            >
              <div className="text-5xl mb-3 animate-float">{card.icon}</div>
              <h2 className="text-2xl font-bold">{card.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}