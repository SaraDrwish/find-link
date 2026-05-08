import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-[#150543] mb-2">تسجيل الدخول</h2>
        <p className="text-center text-gray-400 mb-8">أدخل كلمة المرور للدخول إلى لوحة التحكم</p>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-xl mb-4" required />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-[#a46df6] text-white py-3 rounded-xl hover:bg-[#150543] transition">دخول</button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">(للتجربة: admin123)</p>
      </motion.div>
    </div>
  );
}