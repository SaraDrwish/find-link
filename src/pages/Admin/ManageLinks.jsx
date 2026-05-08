import { useState } from 'react'
import { mockLinks, mockCategories } from '../../data/mockData'
import LinkForm from '../../components/Admin/LinkForm'
import { motion } from 'framer-motion'

export default function ManageLinks() {
  const [links, setLinks] = useState(mockLinks)
  const [showForm, setShowForm] = useState(false)
  
  const deleteLink = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الرابط؟')) {
      setLinks(links.filter(l => l.id !== id))
    }
  }
  
  const addLink = (newLink) => {
    setLinks([...links, { ...newLink, id: Date.now().toString() }])
    setShowForm(false)
  }
  
  // جلب اسم الفئة لكل رابط
  const getCategoryName = (categoryId) => {
    const category = mockCategories.find(c => c.id === categoryId)
    return category ? category.name : 'غير معروف'
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">🔗 إدارة الروابط</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-[#059669] transition btn-glow"
        >
          {showForm ? '✖ إلغاء' : '+ إضافة رابط جديد'}
        </button>
      </div>
      
      {showForm && <LinkForm onSubmit={addLink} onCancel={() => setShowForm(false)} />}
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0F172A] text-white">
            <tr>
              <th className="p-3 text-right">عنوان الرابط</th>
              <th className="p-3 text-right">URL</th>
              <th className="p-3 text-right">الفئة</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, idx) => (
              <motion.tr
                key={link.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{link.title}</td>
                <td className="p-3">
                  <a href={link.url} target="_blank" className="text-blue-600 hover:underline">
                    {link.url}
                  </a>
                </td>
                <td className="p-3">{getCategoryName(link.categoryId)}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 ml-3">✏️ تعديل</button>
                  <button onClick={() => deleteLink(link.id)} className="text-red-600 hover:text-red-800">🗑️ حذف</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}