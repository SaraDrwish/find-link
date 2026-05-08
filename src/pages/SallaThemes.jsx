import { mockThemes } from '../data/mockData';
import ThemeCard from '../components/ThemeCard';
import { motion } from 'framer-motion';

export default function SallaThemes() {
  const sallaThemes = mockThemes.filter(t => t.platform === 'salla');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#150543] mb-4">
            ثيمات منصة سلة
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            اضغط على أي ثيم لعرض جميع روابطه
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {sallaThemes.map(theme => (
            <ThemeCard key={theme.id} theme={theme} platform="salla" />
          ))}
        </div>
      </div>
    </div>
  );
}