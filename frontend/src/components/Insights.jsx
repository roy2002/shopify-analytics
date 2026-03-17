import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { TrendingUp, Users, Target } from 'lucide-react'

const Insights = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
        <p className="text-gray-500 mt-2">Discover patterns and trends in your data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-50">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Customer Behavior</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your returning customer rate has increased by 12.5% this month. 
              Peak shopping hours are between 2-4 PM.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-50">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Audience Segments</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your top customer segment is 25-34 year olds, accounting for 38% of total revenue.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-50">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">Conversion Opportunities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              234 customers abandoned carts this week. Consider sending recovery emails to boost conversions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Insights
