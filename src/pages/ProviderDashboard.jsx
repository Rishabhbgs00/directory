import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Calendar, 
  Star, 
  DollarSign, 
  Users, 
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Package,
  BarChart3
} from 'lucide-react';

const ProviderDashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 12450,
    viewsChange: 15.3,
    totalBookings: 234,
    bookingsChange: 8.7,
    averageRating: 4.6,
    ratingChange: 0.3,
    totalEarnings: 145890,
    earningsChange: 22.5,
    pendingBookings: 12,
    confirmedBookings: 45,
    completedBookings: 177,
    totalReviews: 189
  });

  const [recentBookings, setRecentBookings] = useState([
    {
      id: '#BKG-001',
      customer: 'Rajesh Kumar',
      service: 'Wedding Photography',
      date: '2024-12-15',
      time: '10:00 AM',
      amount: 15000,
      status: 'pending',
      phone: '+91 98765 43210',
      createdAt: '2 hours ago'
    },
    {
      id: '#BKG-002',
      customer: 'Priya Sharma',
      service: 'Birthday Decoration',
      date: '2024-12-10',
      time: '6:00 PM',
      amount: 8500,
      status: 'confirmed',
      phone: '+91 98765 43211',
      createdAt: '5 hours ago'
    },
    {
      id: '#BKG-003',
      customer: 'Amit Verma',
      service: 'Corporate Event Planning',
      date: '2024-12-08',
      time: '9:00 AM',
      amount: 25000,
      status: 'completed',
      phone: '+91 98765 43212',
      createdAt: '1 day ago'
    },
    {
      id: '#BKG-004',
      customer: 'Sneha Reddy',
      service: 'Pre-Wedding Shoot',
      date: '2024-12-07',
      time: '3:00 PM',
      amount: 12000,
      status: 'cancelled',
      phone: '+91 98765 43213',
      createdAt: '2 days ago'
    }
  ]);

  const [recentReviews, setRecentReviews] = useState([
    {
      id: 1,
      customer: 'Ankit Gupta',
      rating: 5,
      service: 'Wedding Photography',
      comment: 'Excellent service! Very professional and creative work.',
      date: '2024-12-01',
      avatar: 'AG'
    },
    {
      id: 2,
      customer: 'Neha Patel',
      rating: 4,
      service: 'Birthday Decoration',
      comment: 'Good service, decoration was beautiful. Slightly delayed.',
      date: '2024-11-28',
      avatar: 'NP'
    },
    {
      id: 3,
      customer: 'Vikram Singh',
      rating: 5,
      service: 'Corporate Event',
      comment: 'Outstanding! Managed everything perfectly.',
      date: '2024-11-25',
      avatar: 'VS'
    }
  ]);

  const [topServices, setTopServices] = useState([
    { name: 'Wedding Photography', bookings: 45, revenue: 675000, growth: 15 },
    { name: 'Birthday Decoration', bookings: 38, revenue: 323000, growth: 12 },
    { name: 'Corporate Events', bookings: 32, revenue: 800000, growth: -5 },
    { name: 'Pre-Wedding Shoot', bookings: 28, revenue: 336000, growth: 22 }
  ]);

  const [viewsData, setViewsData] = useState([
    { day: 'Mon', views: 120 },
    { day: 'Tue', views: 150 },
    { day: 'Wed', views: 180 },
    { day: 'Thu', views: 140 },
    { day: 'Fri', views: 200 },
    { day: 'Sat', views: 250 },
    { day: 'Sun', views: 220 }
  ]);

  const StatCard = ({ icon: Icon, title, value, change, changeType, color = "orange" }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}-50 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${changeType === 'up' ? 'text-green-600' : changeType === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
          {changeType === 'up' ? <TrendingUp className="w-4 h-4" /> : changeType === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
          {change ? `${Math.abs(change)}%` : '—'}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        label: 'Pending', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
        icon: Clock,
        dotColor: 'bg-yellow-500'
      },
      confirmed: { 
        label: 'Confirmed', 
        color: 'bg-blue-100 text-blue-700 border-blue-200', 
        icon: CheckCircle,
        dotColor: 'bg-blue-500'
      },
      completed: { 
        label: 'Completed', 
        color: 'bg-green-100 text-green-700 border-green-200', 
        icon: CheckCircle,
        dotColor: 'bg-green-500'
      },
      cancelled: { 
        label: 'Cancelled', 
        color: 'bg-red-100 text-red-700 border-red-200', 
        icon: XCircle,
        dotColor: 'bg-red-500'
      }
    };
    return configs[status] || configs.pending;
  };

  const maxViews = Math.max(...viewsData.map(d => d.views));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/provider/business-setup"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Package className="w-5 h-5" />
            Manage Business
          </Link>
          <Link
            to="/provider/service-list"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            <ArrowUpRight className="w-5 h-5" />
            Add Service
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Eye}
          title="Profile Views"
          value={stats.totalViews.toLocaleString()}
          change={stats.viewsChange}
          changeType="up"
          color="blue"
        />
        <StatCard 
          icon={Calendar}
          title="Total Bookings"
          value={stats.totalBookings}
          change={stats.bookingsChange}
          changeType="up"
          color="green"
        />
        <StatCard 
          icon={Star}
          title="Average Rating"
          value={stats.averageRating}
          change={stats.ratingChange}
          changeType="up"
          color="yellow"
        />
        <StatCard 
          icon={DollarSign}
          title="Total Earnings"
          value={`₹${(stats.totalEarnings / 1000).toFixed(1)}K`}
          change={stats.earningsChange}
          changeType="up"
          color="orange"
        />
      </div>

      {/* Booking Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-900">{stats.pendingBookings}</span>
          </div>
          <p className="text-sm font-medium text-yellow-800">Pending Bookings</p>
          <p className="text-xs text-yellow-600 mt-1">Awaiting confirmation</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">{stats.confirmedBookings}</span>
          </div>
          <p className="text-sm font-medium text-blue-800">Confirmed Bookings</p>
          <p className="text-xs text-blue-600 mt-1">Upcoming events</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-900">{stats.completedBookings}</span>
          </div>
          <p className="text-sm font-medium text-green-800">Completed</p>
          <p className="text-xs text-green-600 mt-1">Successfully delivered</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">{stats.totalReviews}</span>
          </div>
          <p className="text-sm font-medium text-purple-800">Total Reviews</p>
          <p className="text-xs text-purple-600 mt-1">Customer feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
              <p className="text-sm text-gray-500 mt-1">Latest booking requests and confirmations</p>
            </div>
            <Link to="/provider/booking-requests" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => {
                  const statusConfig = getStatusConfig(booking.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.customer}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {booking.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.service}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.date}</p>
                          <p className="text-xs text-gray-500">{booking.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{booking.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`}></span>
                          {statusConfig.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Views Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Weekly Views</h2>
            <p className="text-sm text-gray-500 mt-1">Profile views this week</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {viewsData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.day}</span>
                    <span className="text-sm font-bold text-gray-900">{data.views}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(data.views / maxViews) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Top Services</h2>
              <p className="text-sm text-gray-500 mt-1">Best performing services</p>
            </div>
            <Link to="/provider/service-list" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              Manage →
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-xs text-gray-500">{service.bookings} bookings</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{(service.revenue / 1000).toFixed(0)}K</p>
                  <div className={`flex items-center gap-1 text-xs font-medium ${service.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {service.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(service.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
              <p className="text-sm text-gray-500 mt-1">Latest customer feedback</p>
            </div>
            <Link to="/provider/reviews" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{review.customer}</h3>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-500">Service: {review.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/provider/service-list" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all">
            <Package className="w-8 h-8 mb-2" />
            <h3 className="font-semibold">Manage Services</h3>
            <p className="text-sm text-orange-100 mt-1">Add or edit services</p>
          </Link>
          <Link to="/provider/booking-requests" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all">
            <Calendar className="w-8 h-8 mb-2" />
            <h3 className="font-semibold">View Bookings</h3>
            <p className="text-sm text-orange-100 mt-1">Manage appointments</p>
          </Link>
          <Link to="/provider/gallery" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all">
            <Eye className="w-8 h-8 mb-2" />
            <h3 className="font-semibold">Update Gallery</h3>
            <p className="text-sm text-orange-100 mt-1">Showcase your work</p>
          </Link>
          <Link to="/provider/earnings" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all">
            <BarChart3 className="w-8 h-8 mb-2" />
            <h3 className="font-semibold">View Analytics</h3>
            <p className="text-sm text-orange-100 mt-1">Track performance</p>
          </Link>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900">Complete Your Profile</h3>
          <p className="text-sm text-blue-700 mt-1">
            Add more services and photos to get 3x more bookings! Complete business setup to increase visibility.
          </p>
          <Link to="/provider/business-setup" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 mt-2">
            Complete Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;