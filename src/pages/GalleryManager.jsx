import { useState } from 'react';
import { Upload, ImageIcon, Video, X, Eye, Download, Star, Trash2, Edit2, Plus, Grid, List, Search, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';

const GalleryManager = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
      title: 'Main Store Front',
      category: 'exterior',
      uploadDate: '2024-12-01',
      size: '2.4 MB',
      featured: true,
      views: 234
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
      title: 'Interior Design',
      category: 'interior',
      uploadDate: '2024-12-02',
      size: '1.8 MB',
      featured: false,
      views: 189
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
      title: 'Team Photo',
      category: 'team',
      uploadDate: '2024-12-03',
      size: '3.1 MB',
      featured: false,
      views: 156
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600',
      title: 'Products Display',
      category: 'products',
      uploadDate: '2024-12-04',
      size: '2.7 MB',
      featured: true,
      views: 312
    },
    {
      id: 5,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
      title: 'Business Tour',
      category: 'tour',
      uploadDate: '2024-12-05',
      size: '15.2 MB',
      duration: '2:34',
      featured: false,
      views: 445
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Media', count: galleryItems.length },
    { id: 'exterior', name: 'Exterior', count: galleryItems.filter(i => i.category === 'exterior').length },
    { id: 'interior', name: 'Interior', count: galleryItems.filter(i => i.category === 'interior').length },
    { id: 'products', name: 'Products', count: galleryItems.filter(i => i.category === 'products').length },
    { id: 'team', name: 'Team', count: galleryItems.filter(i => i.category === 'team').length },
    { id: 'tour', name: 'Virtual Tour', count: galleryItems.filter(i => i.category === 'tour').length }
  ];

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setUploadProgress(progress);
        }

        const isVideo = file.type.startsWith('video/');
        const newItem = {
          id: Date.now() + i,
          type: isVideo ? 'video' : 'image',
          url: URL.createObjectURL(file),
          thumbnail: isVideo ? 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600' : URL.createObjectURL(file),
          title: file.name.split('.')[0],
          category: 'products',
          uploadDate: new Date().toISOString().split('T')[0],
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          duration: isVideo ? '0:00' : null,
          featured: false,
          views: 0
        };

        setGalleryItems(prev => [newItem, ...prev]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedItems.length} selected items?`)) {
      setGalleryItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const toggleFeatured = (id) => {
    setGalleryItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  const toggleSelection = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const openPreview = (item) => {
    setPreviewItem(item);
    setShowPreview(true);
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gallery Manager</h1>
          <p className="text-gray-600">Upload and manage your business photos and videos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">{galleryItems.filter(i => i.type === 'image').length}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Photos</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Video className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-800">{galleryItems.filter(i => i.type === 'video').length}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Videos</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-800">{galleryItems.filter(i => i.featured).length}</span>
            </div>
            <p className="text-gray-600 text-sm">Featured Items</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">{galleryItems.reduce((sum, i) => sum + i.views, 0)}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Views</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Upload Media</h2>
          </div>

          {isUploading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-600">
                      Images (PNG, JPG up to 5MB) or Videos (MP4 up to 50MB)
                    </p>
                  </div>
                </div>
              </label>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{selectedItems.length} selected</span>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === cat.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-gray-100">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No media found</h3>
            <p className="text-gray-600">Upload some photos or videos to get started</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredItems.map(item => (
              viewMode === 'grid' ? (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all group">
                  <div className="relative aspect-square">
                    <img
                      src={item.type === 'video' ? item.thumbnail : item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            onClick={() => openPreview(item)}
                            className="flex-1 bg-white text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => toggleFeatured(item.id)}
                            className={`p-2 rounded-lg transition-all ${
                              item.featured ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                          >
                            <Star className="w-5 h-5" fill={item.featured ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'video'
                          ? 'bg-purple-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {item.type === 'video' ? (
                          <span className="flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            {item.duration}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            Photo
                          </span>
                        )}
                      </span>
                    </div>

                    {item.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" fill="currentColor" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="w-5 h-5 rounded border-2 border-white shadow-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{item.size}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{item.uploadDate}</p>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                    
                    <img
                      src={item.type === 'video' ? item.thumbnail : item.url}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        {item.featured && (
                          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          {item.type === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                          {item.type === 'video' ? item.duration : 'Photo'}
                        </span>
                        <span>{item.size}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views} views
                        </span>
                        <span>{item.uploadDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openPreview(item)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleFeatured(item.id)}
                        className={`p-2 rounded-lg transition-all ${
                          item.featured ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star className="w-5 h-5" fill={item.featured ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {showPreview && previewItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{previewItem.title}</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {previewItem.type === 'video' ? (
                  <video
                    src={previewItem.url}
                    controls
                    className="w-full rounded-xl"
                  />
                ) : (
                  <img
                    src={previewItem.url}
                    alt={previewItem.title}
                    className="w-full rounded-xl"
                  />
                )}

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Upload Date</p>
                    <p className="font-semibold text-gray-800">{previewItem.uploadDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">File Size</p>
                    <p className="font-semibold text-gray-800">{previewItem.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Category</p>
                    <p className="font-semibold text-gray-800 capitalize">{previewItem.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Views</p>
                    <p className="font-semibold text-gray-800">{previewItem.views}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;