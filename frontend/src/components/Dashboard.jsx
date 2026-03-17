import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Users, TrendingUp, ShoppingCart, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react'

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    returningCustomers: { value: '0', change: '+0%', trend: 'up' },
    traffic: { value: '45,231', change: '+8.2%', trend: 'up' },
    avgOrderValue: { value: '$84.32', change: '-2.1%', trend: 'down' },
    conversionRate: { value: '3.24%', change: '+0.5%', trend: 'up' },
    revenue: { value: '$124,563', change: '+15.3%', trend: 'up' },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch customers data from FastAPI
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/customers`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch customers data')
        }
        
        const data = await response.json()
        
        // Calculate returning customers (customers with more than 1 order)
        const customers = data?.data?.customers?.nodes || []
        const returningCustomers = customers.filter(customer => customer.numberOfOrders > 1)
        const returningCustomersCount = returningCustomers.length
        const totalCustomers = customers.length
        const returningPercentage = totalCustomers > 0 
          ? ((returningCustomersCount / totalCustomers) * 100).toFixed(1)
          : '0'
        
        setMetrics(prev => ({
          ...prev,
          returningCustomers: {
            value: returningCustomersCount.toString(),
            change: `${returningPercentage}% of total`,
            trend: returningCustomersCount > 0 ? 'up' : 'neutral',
          }
        }))
        
        setError(null)
      } catch (err) {
        console.error('Error fetching customers:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const metricCards = [
    {
      title: 'Returning Customers',
      value: metrics.returningCustomers.value,
      change: metrics.returningCustomers.change,
      trend: metrics.returningCustomers.trend,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Traffic',
      value: metrics.traffic.value,
      change: metrics.traffic.change,
      trend: metrics.traffic.trend,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Avg Order Value',
      value: metrics.avgOrderValue.value,
      change: metrics.avgOrderValue.change,
      trend: metrics.avgOrderValue.trend,
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Conversion Rate',
      value: metrics.conversionRate.value,
      change: metrics.conversionRate.change,
      trend: metrics.conversionRate.trend,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Revenue',
      value: metrics.revenue.value,
      change: metrics.revenue.change,
      trend: metrics.revenue.trend,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's your store overview</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-800">
              <p className="font-medium">Error loading customer data</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-xs mt-2">Make sure the FastAPI server is running on http://localhost:8000</p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          const isReturningCustomers = metric.title === 'Returning Customers'
          const showLoader = isReturningCustomers && loading
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${metric.bgColor}`}>
                  {showLoader ? (
                    <Loader2 className={`w-5 h-5 ${metric.color} animate-spin`} />
                  ) : (
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    {showLoader ? '...' : metric.value}
                  </div>
                  {!showLoader && (
                    <div className={`flex items-center text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : metric.trend === 'down' ? (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      ) : null}
                      {metric.change}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {isReturningCustomers ? 'customers with >1 order' : 'vs. last month'}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Info Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: 'New order received', time: '2 minutes ago', color: 'bg-green-100 text-green-800' },
                { event: 'Customer signed up', time: '15 minutes ago', color: 'bg-blue-100 text-blue-800' },
                { event: 'Product viewed', time: '1 hour ago', color: 'bg-purple-100 text-purple-800' },
                { event: 'Cart abandoned', time: '2 hours ago', color: 'bg-orange-100 text-orange-800' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="text-sm text-gray-700">{activity.event}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${activity.color}`}>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Premium T-Shirt', sales: 234, revenue: '$4,680' },
                { name: 'Running Shoes', sales: 187, revenue: '$8,415' },
                { name: 'Yoga Mat', sales: 156, revenue: '$2,340' },
                { name: 'Water Bottle', sales: 143, revenue: '$1,430' },
              ].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.sales} sales</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
