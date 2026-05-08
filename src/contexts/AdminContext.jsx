import { createContext, useState, useContext } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(true) // خليها true دلوقتي، بعدين غيريها
  const [themes, setThemes] = useState([])
  const [categories, setCategories] = useState([])
  const [links, setLinks] = useState([])

  const login = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => setIsAdmin(false)

  return (
    <AdminContext.Provider value={{
      isAdmin,
      login,
      logout,
      themes, setThemes,
      categories, setCategories,
      links, setLinks
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}