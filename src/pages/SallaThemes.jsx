import { mockThemes } from '../data/mockData'
import ThemeCard from '../components/ThemeCard'

export default function SallaThemes() {
  const sallaThemes = mockThemes.filter(t => t.platform === 'salla')
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white text-center mb-4">🎨 ثيمات سلة</h1>
      <p className="text-white/80 text-center mb-12">اختر الثيم المناسب لمتجرك</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sallaThemes.map(theme => (
          <ThemeCard key={theme.id} theme={theme} platform="salla" />
        ))}
      </div>
    </div>
  )
}