import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  X,
  Check,
  AlertCircle,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

const ManageBranches = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Downtown Branch',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'downtown@eliteservices.com',
      status: 'active',
      manager: 'John Smith',
      rating: 4.8,
      totalBookings: 245,
      revenue: 45600,
      hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      isMainBranch: true
    },
    {
      id: 2,
      name: 'Uptown Branch',
      address: '456 Park Avenue, New York, NY 10022',
      phone: '+1 (555) 234-5678',
      email: 'uptown@eliteservices.com',
      status: 'active',
      manager: 'Sarah Johnson',
      rating: 4.6,
      totalBookings: 189,
      revenue: 38900,
      hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      isMainBranch: false
    },
    {
      id: 3,
      name: 'Brooklyn Branch',
      address: '789 Atlantic Avenue, Brooklyn, NY 11217',
      phone: '+1 (555) 345-6789',
      email: 'brooklyn@eliteservices.com',
      status: 'inactive',
      manager: 'Mike Davis',
      rating: 4.4,
      totalBookings: 134,
      revenue: 28400,
      hours: 'Mon-Fri: 9AM-6PM',
      isMainBranch: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    manager: '',
    hours: '',
    status: 'active'
  });

  const handleAddBranch = () => {
    setEditingBranch(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      manager: '',
      hours: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
      hours: branch.hours,
      status: branch.status
    });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteBranch = (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
    setActiveDropdown(null);
  };

  const handleToggleStatus = (id) => {
    setBranches(branches.map(b => 
      b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b
    ));
    setActiveDropdown(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email || !formData.manager || !formData.hours) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingBranch) {
      setBranches(branches.map(b => 
        b.id === editingBranch.id ? { ...b, ...formData } : b
      ));
    } else {
      const newBranch = {
        id: Math.max(...branches.map(b => b.id)) + 1,
        ...formData,
        rating: 0,
        totalBookings: 0,
        revenue: 0,
        isMainBranch: false
      };
      setBranches([...branches, newBranch]);
    }
    
    setIsModalOpen(false);
  };

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || branch.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: branches.length,
    active: branches.filter(b => b.status === 'active').length,
    inactive: branches.filter(b => b.status === 'inactive').length,
    totalRevenue: branches.reduce((sum, b) => sum + b.revenue, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total Branches</span>
            <MapPin className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Active</span>
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Inactive</span>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats.inactive}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total Revenue</span>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ${(stats.totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
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
              onClick={handleAddBranch}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Branch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Branches List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                  {branch.isMainBranch && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded">
                      Main
                    </span>
                  )}
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  branch.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === branch.id ? null : branch.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>

                {activeDropdown === branch.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => handleEditBranch(branch)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Branch</span>
                    </button>
                    <button
                      onClick={() => handleToggleStatus(branch.id)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      {branch.status === 'active' ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          <span>Deactivate</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Activate</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteBranch(branch.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{branch.address}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{branch.phone}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{branch.email}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Manager: {branch.manager}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{branch.hours}</span>
              </div>
            </div>

            {/* Branch Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-lg font-bold text-gray-900">{branch.rating}</span>
                </div>
                <p className="text-xs text-gray-500">Rating</p>
              </div>

              <div>
                <p className="text-lg font-bold text-gray-900">{branch.totalBookings}</p>
                <p className="text-xs text-gray-500">Bookings</p>
              </div>

              <div>
                <p className="text-lg font-bold text-gray-900">${(branch.revenue / 1000).toFixed(1)}k</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No branches found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
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
                  Branch Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Downtown Branch"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  rows="2"
                  placeholder="Full address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="branch@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Manager *
                </label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Manager name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operating Hours *
                </label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Mon-Fri: 9AM-6PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                  {editingBranch ? 'Update Branch' : 'Add Branch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBranches;