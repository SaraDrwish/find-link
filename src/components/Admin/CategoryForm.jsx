import { useState } from 'react'
import { mockThemes } from '../../data/mockData'

export default function CategoryForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [themeId, setThemeId] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!themeId) {
      alert('الرجاء اختيار الثيم')
      return
    }
    onSubmit({ name, themeId })
    setName('')
    setThemeId('')
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">➕ إضافة فئة جديدة</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="اسم الفئة (مثال: متاجر الزينة)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          required
        />
        <select
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          required
        >
          <option value="">اختر الثيم</option>
          {mockThemes.map(theme => (
            <option key={theme.id} value={theme.id}>
              {theme.name} ({theme.platform === 'salla' ? 'سلة' : 'زد'})
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-3 mt-4">
        <button type="submit" className="bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-[#059669] transition btn-glow">
          ✅ حفظ الفئة
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
          ❌ إلغاء
        </button>
      </div>
    </form>
  )
}