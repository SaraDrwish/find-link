import { useParams } from 'react-router-dom'
import { mockThemes, mockCategories, mockLinks } from '../data/mockData'
import { motion } from 'framer-motion'
import CategoryCard from '../components/CategoryCard'

export default function ThemeDetails() {
  const { themeId } = useParams()
  const theme = mockThemes.find(t => t.id === themeId)
  const themeCategories = mockCategories.filter(c => c.themeId === themeId)
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-3">{theme?.name}</h1>
        <p className="text-xl text-white/80">تصفح الفئات والروابط المتاحة</p>
      </motion.div>
      
      <div className="space-y-8">
        {themeCategories.map((category, idx) => {
          const categoryLinks = mockLinks.filter(l => l.categoryId === category.id)
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <CategoryCard category={category} links={categoryLinks} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}