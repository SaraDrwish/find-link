import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import ThemeForm from '../../components/Admin/ThemeForm';
import { motion } from 'framer-motion';

export default function ManageThemes() {
  const { themes, deleteTheme, addTheme } = useAdmin();
  const [showForm, setShowForm] = useState(false);

  const sallaThemes = themes.filter(t => t.platform === 'salla');
  const zidThemes = themes.filter(t => t.platform === 'zid');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#150543]"> إدارة الثيمات🎨 </h1>
          <p className="text-gray-500 text-sm">سلة (يمين) - زد (يسار)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#a46df6] text-white px-5 py-2 rounded-xl hover:bg-[#150543] transition"
        >
          {showForm ? '✖ إلغاء' : '+ إضافة ثيم جديد'}
        </button>
      </div>

      {showForm && <ThemeForm onSubmit={addTheme} onCancel={() => setShowForm(false)} />}

      <div className="grid md:grid-cols-2 gap-6">
        {/* جدول سلة */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-3 text-center">
            <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
               منصة سلة  
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-[#150543] border-b">
                <tr>
                  <th className="p-3 text-right">اسم الثيم</th>
                  <th className="p-3 text-center">تاريخ الإضافة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {sallaThemes.map((theme, idx) => (
                  <motion.tr key={theme.id} className="border-b hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                    <td className="p-3 font-medium">{theme.name}</td>
                    <td className="p-3 text-center text-sm text-gray-500">{theme.createdAt}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => deleteTheme(theme.id)} className="text-red-500 hover:text-red-700 transition"> حذف🗑️</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {sallaThemes.length === 0 && <div className="p-6 text-center text-gray-400">لا توجد ثيمات</div>}
        </div>

        {/* جدول زد */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#150543] to-[#a46df6] p-3 text-center">
            <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                منصة زد
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-[#150543] border-b">
                <tr>
                  <th className="p-3 text-right">اسم الثيم</th>
                  <th className="p-3 text-center">تاريخ الإضافة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {zidThemes.map((theme, idx) => (
                  <motion.tr key={theme.id} className="border-b hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                    <td className="p-3 font-medium">{theme.name}</td>
                    <td className="p-3 text-center text-sm text-gray-500">{theme.createdAt}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => deleteTheme(theme.id)} className="text-red-500 hover:text-red-700 transition"> حذف🗑️</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {zidThemes.length === 0 && <div className="p-6 text-center text-gray-400">لا توجد ثيمات</div>}
        </div>
      </div>
    </div>
  );
}