import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Insights from './components/Insights'
import CampaignGenerator from './components/CampaignGenerator'
import Connections from './components/Connections'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'insights':
        return <Insights />
      case 'campaign':
        return <CampaignGenerator />
      case 'connections':
        return <Connections />
      default:
        return <Dashboard />
    }
  }

  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </Router>
  )
}

export default App
