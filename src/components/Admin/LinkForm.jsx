import { useState } from 'react'
import { mockCategories } from '../../data/mockData'

export default function LinkForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [categoryId, setCategoryId] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!categoryId) {
      alert('الرجاء اختيار الفئة')
      return
    }
    onSubmit({ title, url, categoryId })
    setTitle('')
    setUrl('')
    setCategoryId('')
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">🔗 إضافة رابط جديد</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="عنوان المتجر (مثال: متجر عطور الفخامة)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          required
        />
        <input
          type="url"
          placeholder="رابط المتجر (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          required
        >
          <option value="">اختر الفئة</option>
          {mockCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-3 mt-4">
        <button type="submit" className="bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-[#059669] transition btn-glow">
          ✅ حفظ الرابط
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
          ❌ إلغاء
        </button>
      </div>
    </form>
  )
}