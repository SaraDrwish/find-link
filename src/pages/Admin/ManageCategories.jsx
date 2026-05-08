import { useState } from 'react'
import { mockCategories, mockThemes } from '../../data/mockData'
import CategoryForm from '../../components/Admin/CategoryForm'
import { motion } from 'framer-motion'

export default function ManageCategories() {
  const [categories, setCategories] = useState(mockCategories)
  const [showForm, setShowForm] = useState(false)
  
  const deleteCategory = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }
  
  const addCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: Date.now().toString() }])
    setShowForm(false)
  }
  
  // جلب اسم الثيم لكل فئة
  const getThemeName = (themeId) => {
    const theme = mockThemes.find(t => t.id === themeId)
    return theme ? theme.name : 'غير معروف'
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">📂 إدارة الفئات</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-[#059669] transition btn-glow"
        >
          {showForm ? '✖ إلغاء' : '+ إضافة فئة جديدة'}
        </button>
      </div>
      
      {showForm && <CategoryForm onSubmit={addCategory} onCancel={() => setShowForm(false)} />}
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0F172A] text-white">
            <tr>
              <th className="p-3 text-right">اسم الفئة</th>
              <th className="p-3 text-right">التابع لثيم</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, idx) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{category.name}</td>
                <td className="p-3">{getThemeName(category.themeId)}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 ml-3">✏️ تعديل</button>
                  <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-800">🗑️ حذف</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
