import { useState } from 'react'
import { mockThemes } from '../../data/mockData'
import ThemeForm from '../../components/Admin/ThemeForm'
import { motion } from 'framer-motion'

export default function ManageThemes() {
  const [themes, setThemes] = useState(mockThemes)
  const [showForm, setShowForm] = useState(false)
  
  const deleteTheme = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الثيم؟')) {
      setThemes(themes.filter(t => t.id !== id))
    }
  }
  
  const addTheme = (newTheme) => {
    setThemes([...themes, { ...newTheme, id: Date.now().toString() }])
    setShowForm(false)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">🎨 إدارة الثيمات</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-[#059669] transition btn-glow"
        >
          {showForm ? '✖ إلغاء' : '+ إضافة ثيم جديد'}
        </button>
      </div>
      
      {showForm && <ThemeForm onSubmit={addTheme} onCancel={() => setShowForm(false)} />}
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0F172A] text-white">
            <tr>
              <th className="p-3 text-right">اسم الثيم</th>
              <th className="p-3 text-right">المنصة</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme, idx) => (
              <motion.tr
                key={theme.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{theme.name}</td>
                <td className="p-3">{theme.platform === 'salla' ? '🚀 سلة' : '⚡ زد'}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 ml-3">✏️ تعديل</button>
                  <button onClick={() => deleteTheme(theme.id)} className="text-red-600 hover:text-red-800">🗑️ حذف</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}