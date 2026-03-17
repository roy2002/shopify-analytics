import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Link2, Check } from 'lucide-react'

const Connections = () => {
  const connections = [
    { name: 'Shopify Store', status: 'connected', color: 'text-green-600' },
    { name: 'Google Analytics', status: 'connected', color: 'text-green-600' },
    { name: 'Facebook Ads', status: 'not connected', color: 'text-gray-400' },
    { name: 'Mailchimp', status: 'not connected', color: 'text-gray-400' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connections</h1>
        <p className="text-gray-500 mt-2">Manage your integrations and connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {connections.map((connection, idx) => (
          <Card key={idx} className="bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-50">
                    <Link2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{connection.name}</CardTitle>
                </div>
                {connection.status === 'connected' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {connection.status === 'connected' ? (
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Manage connection
                </button>
              ) : (
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                  Connect
                </button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Connections
