import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#150543] mb-3">
            مرحباً بك في
            <span className="block text-[#a46df6] mt-1">ثيمات كرافو</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            أكبر تجمع لثيمات وروابط متاجر سلة وزد
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* سلة */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
          >
            <Link to="/salla/themes">
              <div className="bg-white rounded-2xl p-8 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  <img src="https://asas-tools.com/u/uploads/sara_craffo/sallah-logo.png" alt="سلة" className="w-12 h-12 object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-[#150543] mb-2">منصة سلة</h2>
                <p className="text-gray-500 text-sm mb-4">استعرض جميع الثيمات والروابط</p>
                <span className="inline-block text-[#a46df6] text-sm font-medium group-hover:mr-1 transition-all">اكتشف ←</span>
              </div>
            </Link>
          </motion.div>

          {/* زد */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
          >
            <Link to="/zid/themes">
              <div className="bg-white rounded-2xl p-8 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  <img src="https://asas-tools.com/u/uploads/sara_craffo/zid-logo.png" alt="زد" className="w-12 h-12 object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-[#150543] mb-2">منصة زد</h2>
                <p className="text-gray-500 text-sm mb-4">استعرض جميع الثيمات والروابط</p>
                <span className="inline-block text-[#a46df6] text-sm font-medium group-hover:mr-1 transition-all">اكتشف ←</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

