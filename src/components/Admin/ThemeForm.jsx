import { useState } from 'react'

export default function ThemeForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [platform, setPlatform] = useState('salla')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, nameEn, platform })
    setName('')
    setNameEn('')
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">إضافة ثيم جديد</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="اسم الثيم (عربي)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="اسم الثيم (English)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="salla">سلة</option>
          <option value="zid">زد</option>
        </select>
      </div>
      
      <div className="flex gap-3 mt-4">
        <button type="submit" className="bg-[#10B981] text-white px-6 py-2 rounded hover:bg-[#059669]">
          ✅ حفظ
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
          ❌ إلغاء
        </button>
      </div>
    </form>
  )
}