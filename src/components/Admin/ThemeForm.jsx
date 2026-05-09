import { useState } from 'react';

export default function ThemeForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('salla');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('الرجاء إدخال اسم الثيم');
    onSubmit({ name, platform });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-[#150543]"> إضافة ثيم جديد➕</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="اسم الثيم (مثال: ثيم دارك)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a46df6]"
          required
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a46df6]"
        >
          <option value="salla">  منصة سلة</option>
          <option value="zid">  منصة زد</option>
        </select>
      </div>
      <div className="flex gap-3 mt-6">
        <button type="submit" className="bg-[#a46df6] text-white px-6 py-2 rounded-xl hover:bg-[#150543] transition">
           إضافة الثيم✅
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition">
           إلغاء❌
        </button>
      </div>
    </form>
  );
}