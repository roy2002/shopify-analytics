import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Megaphone, Sparkles } from 'lucide-react'

const CampaignGenerator = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Campaign Generator</h1>
        <p className="text-gray-500 mt-2">Create and manage your marketing campaigns</p>
      </div>

      <Card className="bg-white max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-orange-50">
              <Megaphone className="w-5 h-5 text-orange-600" />
            </div>
            <CardTitle className="text-lg">New Campaign</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Suggestions</span>
            </div>
            <p className="text-gray-600">
              Campaign generation tools coming soon. This feature will help you create targeted 
              campaigns based on customer insights and behavior patterns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignGenerator
