import { useState } from 'react';
import { 
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreVertical,
  X,
  Clock,
  DollarSign,
  Tag,
  TrendingUp,
  Users,
  Star,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ServiceList = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Premium Hair Styling',
      category: 'Hair Care',
      description: 'Professional hair styling service with premium products',
      price: 75,
      duration: 60,
      isActive: true,
      bookings: 156,
      revenue: 11700,
      rating: 4.8,
      tags: ['Popular', 'Premium'],
      branch: 'All Branches'
    },
    {
      id: 2,
      name: 'Manicure & Pedicure',
      category: 'Nail Care',
      description: 'Complete nail care service with gel polish options',
      price: 45,
      duration: 45,
      isActive: true,
      bookings: 203,
      revenue: 9135,
      rating: 4.9,
      tags: ['Popular'],
      branch: 'Downtown Branch'
    },
    {
      id: 3,
      name: 'Deep Tissue Massage',
      category: 'Wellness',
      description: 'Therapeutic massage for muscle tension relief',
      price: 120,
      duration: 90,
      isActive: true,
      bookings: 89,
      revenue: 10680,
      rating: 4.7,
      tags: ['Premium', 'Wellness'],
      branch: 'Uptown Branch'
    },
    {
      id: 4,
      name: 'Facial Treatment',
      category: 'Skincare',
      description: 'Rejuvenating facial with organic products',
      price: 95,
      duration: 60,
      isActive: false,
      bookings: 67,
      revenue: 6365,
      rating: 4.6,
      tags: ['Organic'],
      branch: 'All Branches'
    },
    {
      id: 5,
      name: 'Hair Coloring',
      category: 'Hair Care',
      description: 'Professional hair coloring and highlights',
      price: 150,
      duration: 120,
      isActive: true,
      bookings: 124,
      revenue: 18600,
      rating: 4.9,
      tags: ['Premium', 'Popular'],
      branch: 'Downtown Branch'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    branch: 'All Branches',
    tags: [],
    isActive: true
  });

  const categories = ['Hair Care', 'Nail Care', 'Skincare', 'Wellness', 'Makeup'];
  const availableTags = ['Popular', 'Premium', 'Organic', 'Wellness', 'New'];
  const branches = ['All Branches', 'Downtown Branch', 'Uptown Branch', 'Brooklyn Branch'];

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      duration: '',
      branch: 'All Branches',
      tags: [],
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      branch: service.branch,
      tags: service.tags,
      isActive: service.isActive
    });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
    setActiveDropdown(null);
  };

  const handleToggleStatus = (id) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    setActiveDropdown(null);
  };

  const handleDuplicateService = (service) => {
    const newService = {
      ...service,
      id: Math.max(...services.map(s => s.id)) + 1,
      name: `${service.name} (Copy)`,
      bookings: 0,
      revenue: 0
    };
    setServices([...services, newService]);
    setActiveDropdown(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.duration) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { 
              ...s, 
              ...formData, 
              price: parseFloat(formData.price),
              duration: parseInt(formData.duration)
            } 
          : s
      ));
    } else {
      const newService = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        bookings: 0,
        revenue: 0,
        rating: 0
      };
      setServices([...services, newService]);
    }
    
    setIsModalOpen(false);
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && service.isActive) ||
                         (filterStatus === 'inactive' && !service.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    totalRevenue: services.reduce((sum, s) => sum + s.revenue, 0),
    totalBookings: services.reduce((sum, s) => sum + s.bookings, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total Services</span>
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Active Services</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total Bookings</span>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total Revenue</span>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ${(stats.totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button
              onClick={handleAddService}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition">
            {/* Service Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {service.category}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === service.id ? null : service.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeDropdown === service.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => handleEditService(service)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Service</span>
                      </button>
                      <button
                        onClick={() => handleDuplicateService(service)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Duplicate</span>
                      </button>
                      <button
                        onClick={() => handleToggleStatus(service.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        {service.isActive ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{service.description}</p>

              {/* Tags */}
              {service.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-semibold ${
                  service.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {service.isActive ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3" />
                      <span>Inactive</span>
                    </>
                  )}
                </span>
                <span className="text-xs text-gray-500">{service.branch}</span>
              </div>
            </div>

            {/* Service Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-lg font-bold text-gray-900">${service.price}</p>
                    <p className="text-xs text-gray-500">Price</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-lg font-bold text-gray-900">{service.duration}m</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900">{service.rating || '0.0'}</span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">{service.bookings}</p>
                  <p className="text-xs text-gray-500">Bookings</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">${(service.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={handleAddService}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Service</span>
          </button>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Premium Hair Styling"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  rows="3"
                  placeholder="Describe your service..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="75"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="60"
                    min="0"
                    step="15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available At
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        formData.tags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Service is active and bookable
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;