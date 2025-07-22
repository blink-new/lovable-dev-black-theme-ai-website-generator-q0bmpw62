import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { HomePage } from '@/pages/HomePage'
import { WorkspacePage } from '@/pages/WorkspacePage'
import { TemplatesPage } from '@/pages/TemplatesPage'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/workspace/:projectId" element={<WorkspacePage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App