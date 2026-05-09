import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// ------------------------------
//  البيانات الأولية (يدوية)
// ------------------------------
const manualThemesFallback = [
  { id: '1', name: 'ثيم عبايات (يدوي)', platform: 'salla', buyLink: '', demoLink: '', createdAt: '2025-01-15', fromApi: false },
  { id: '2', name: 'ثيم كيان (يدوي)', platform: 'zid', buyLink: '', demoLink: '', createdAt: '2025-01-16', fromApi: false },
];

const initialCategories = [
  { id: '1', name: 'متاجر الزينة', themeId: '1', createdAt: '2025-01-15' },
  { id: '2', name: 'متاجر العطور', themeId: '1', createdAt: '2025-01-15' },
  { id: '3', name: 'متاجر العبايات', themeId: '2', createdAt: '2025-01-16' },
  { id: '4', name: 'متاجر الإكسسوارات', themeId: 'all', createdAt: '2025-01-17' },
];

const initialLinks = [
  { id: '1', title: 'متجر زينة ليان', url: 'https://example.com/store1', themeId: '1', categoryId: '1', createdAt: '2025-01-15' },
  { id: '2', title: 'عطور دينا', url: 'https://example.com/store2', themeId: '1', categoryId: '2', createdAt: '2025-01-15' },
  { id: '3', title: 'عبايات الأصيل', url: 'https://example.com/store3', themeId: '2', categoryId: '3', createdAt: '2025-01-16' },
];

// ------------------------------
//  دوال التخزين المحلي
// ------------------------------
const loadData = (key, defaultData) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultData;
};

// محاكاة جلب بيانات API (استبدلي الرابط الفعلي لاحقاً)
const fetchThemesFromAPI = async () => {
  // TODO: استبدلي هذا الرابط برابط API الحقيقي
  const response = await fetch('https://tms.craffo.com/api/themes').catch(() => null);
  if (!response || !response.ok) return [];
  const data = await response.json();
  // نتوقع مصفوفة من الثيمات بالصيغة: { id, name, platform, buyLink, demoLink }
  return data.map(t => ({ ...t, fromApi: true, createdAt: new Date().toISOString().split('T')[0] }));
};

export function AdminProvider({ children }) {
  // الثيمات: تحميل من localStorage أو البيانات اليدوية
  const [themes, setThemes] = useState(() => loadData('craffo_themes', manualThemesFallback));
  const [categories, setCategories] = useState(() => loadData('craffo_categories', initialCategories));
  const [links, setLinks] = useState(() => loadData('craffo_links', initialLinks));
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('craffo_admin') === 'true');
  const [apiLoaded, setApiLoaded] = useState(false);

  // دمج بيانات API مع الثيمات الحالية (لا نكرر الـ id)
  const mergeThemesFromAPI = async () => {
    if (apiLoaded) return;
    const apiThemes = await fetchThemesFromAPI();
    if (apiThemes.length === 0) return;
    
    setThemes(prev => {
      // الاحتفاظ بالثيمات اليدوية (fromApi = false) أو التي تم تعديلها
      const manual = prev.filter(t => !t.fromApi);
      const apiNew = apiThemes.filter(apiT => !prev.some(p => p.id === apiT.id));
      const merged = [...manual, ...apiNew, ...prev.filter(t => t.fromApi && apiThemes.some(a => a.id === t.id))];
      return merged;
    });
    setApiLoaded(true);
  };

  useEffect(() => {
    mergeThemesFromAPI();
  }, []);

  // حفظ التغييرات في localStorage
  useEffect(() => { localStorage.setItem('craffo_themes', JSON.stringify(themes)); }, [themes]);
  useEffect(() => { localStorage.setItem('craffo_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('craffo_links', JSON.stringify(links)); }, [links]);
  useEffect(() => { localStorage.setItem('craffo_admin', isAdmin); }, [isAdmin]);

  // دوال المساعدة
  const login = (pwd) => { if (pwd === 'admin123') { setIsAdmin(true); return true; } return false; };
  const logout = () => setIsAdmin(false);

  const isThemeNameDuplicate = (name, excludeId = null, excludeFromApi = false) => {
    return themes.some(t => t.name === name && t.id !== excludeId);
  };

  // إضافة ثيم يدوي (fromApi = false)
  const addTheme = (newTheme) => {
    const { name, platform, buyLink = '', demoLink = '' } = newTheme;
    if (isThemeNameDuplicate(name)) throw new Error('اسم الثيم موجود بالفعل');
    const newId = Date.now().toString();
    setThemes([...themes, {
      id: newId, name, platform, buyLink, demoLink,
      createdAt: new Date().toISOString().split('T')[0],
      fromApi: false
    }]);
  };

  const updateTheme = (id, updated) => {
    if (isThemeNameDuplicate(updated.name, id)) throw new Error('اسم الثيم موجود بالفعل');
    setThemes(themes.map(t => t.id === id ? { ...t, ...updated, fromApi: false } : t));
  };

  const deleteTheme = (id) => {
    if (window.confirm('سيتم حذف كل شيء مرتبط بالثيم')) {
      setThemes(themes.filter(t => t.id !== id));
      setCategories(categories.filter(c => c.themeId !== id && c.themeId !== 'all'));
      setLinks(links.filter(l => l.themeId !== id));
    }
  };

  // دوال الفئات (بدون تغيير)
  const isCategoryNameDuplicate = (name, themeId, excludeId = null) => {
    if (themeId === 'all') {
      return categories.some(c => c.name === name && c.themeId === 'all' && c.id !== excludeId);
    } else {
      return categories.some(c => c.name === name && c.id !== excludeId && (c.themeId === themeId || c.themeId === 'all'));
    }
  };
  const addCategory = (newCat) => {
    if (isCategoryNameDuplicate(newCat.name, newCat.themeId)) throw new Error('الفئة موجودة');
    setCategories([...categories, { ...newCat, id: Date.now().toString() }]);
  };
  const updateCategory = (id, upd) => {
    if (isCategoryNameDuplicate(upd.name, upd.themeId, id)) throw new Error('الفئة موجودة');
    setCategories(categories.map(c => c.id === id ? { ...c, ...upd } : c));
  };
  const deleteCategory = (id) => {
    if (window.confirm('سيتم حذف الروابط المرتبطة')) {
      setCategories(categories.filter(c => c.id !== id));
      setLinks(links.filter(l => l.categoryId !== id));
    }
  };

  // دوال الروابط
  const addLink = (newLink) => setLinks([...links, { ...newLink, id: Date.now().toString() }]);
  const updateLink = (id, upd) => setLinks(links.map(l => l.id === id ? { ...l, ...upd } : l));
  const deleteLink = (id) => setLinks(links.filter(l => l.id !== id));

  // دوال الاستعلام
  const getCategoriesForTheme = (themeId) => categories.filter(c => c.themeId === themeId || c.themeId === 'all');
  const getLinksForTheme = (themeId) => links.filter(l => l.themeId === themeId);
  const getLinksForCategory = (categoryId) => links.filter(l => l.categoryId === categoryId);

  return (
    <AdminContext.Provider value={{
      isAdmin, themes, categories, links,
      login, logout,
      addTheme, updateTheme, deleteTheme,
      addCategory, updateCategory, deleteCategory,
      addLink, updateLink, deleteLink,
      getCategoriesForTheme, getLinksForTheme, getLinksForCategory,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() { return useContext(AdminContext); }