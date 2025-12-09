'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, AlertCircle, CheckCircle, AlertTriangle, Calendar, MapPin, Building2 } from 'lucide-react';

interface Recall {
  id: string;
  recallNumber: string;
  source: string;
  title: string;
  productDescription: string;
  reasonForRecall: string;
  companyName: string;
  classification: string | null;
  distributionPattern: string | null;
  state: string | null;
  recallInitiationDate: string;
  productType: string | null;
  hazard: string | null;
  status: string;
  imageUrl: string | null;
  sourceUrl: string | null;
}

interface RecallStats {
  total: number;
  bySource: Record<string, number>;
  byClassification: Record<string, number>;
  last30Days: number;
}

export default function RecallsPage() {
  const [recalls, setRecalls] = useState<Recall[]>([]);
  const [stats, setStats] = useState<RecallStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    source: '',
    classification: '',
    state: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch recalls
  useEffect(() => {
    fetchRecalls();
  }, [searchQuery, filters, page]);

  // Fetch stats
  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchRecalls() {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        query: searchQuery,
        page: page.toString(),
        limit: '20',
        ...filters,
      });

      const response = await fetch(`/api/recalls/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setRecalls(data.recalls);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch recalls:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const response = await fetch('/api/recalls/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }

  async function updateRecalls() {
    try {
      setLoading(true);
      const response = await fetch('/api/recalls/update?days=60');
      const data = await response.json();

      if (data.success) {
        alert(`Successfully updated ${data.results.total} recalls!`);
        fetchRecalls();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to update recalls:', error);
      alert('Failed to update recalls. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function getClassificationColor(classification: string | null) {
    switch (classification) {
      case 'Class I':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Class II':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Class III':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  function getClassificationIcon(classification: string | null) {
    switch (classification) {
      case 'Class I':
        return <AlertCircle className="w-4 h-4" />;
      case 'Class II':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Class III':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  }

  function getSourceColor(source: string) {
    switch (source) {
      case 'FDA':
        return 'bg-blue-100 text-blue-800';
      case 'USDA':
        return 'bg-green-100 text-green-800';
      case 'CPSC':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Government Recalls</h1>
              <p className="mt-1 text-sm text-gray-600">
                Real-time data from FDA, USDA, and CPSC
              </p>
            </div>
            <button
              onClick={updateRecalls}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Updating...' : 'Update Recalls'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-600">Total Recalls</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-600">Last 30 Days</div>
              <div className="mt-2 text-3xl font-bold text-blue-600">{stats.last30Days}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-600">Class I (High Risk)</div>
              <div className="mt-2 text-3xl font-bold text-red-600">
                {stats.byClassification['Class I'] || 0}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-600">Sources</div>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  FDA: {stats.bySource.FDA || 0}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  USDA: {stats.bySource.USDA || 0}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  CPSC: {stats.bySource.CPSC || 0}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recalls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Source Filter */}
            <div>
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Sources</option>
                <option value="FDA">FDA</option>
                <option value="USDA">USDA</option>
                <option value="CPSC">CPSC</option>
              </select>
            </div>

            {/* Classification Filter */}
            <div>
              <select
                value={filters.classification}
                onChange={(e) => setFilters({ ...filters, classification: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Classifications</option>
                <option value="Class I">Class I (High Risk)</option>
                <option value="Class II">Class II (Medium Risk)</option>
                <option value="Class III">Class III (Low Risk)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recalls List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading recalls...</p>
          </div>
        ) : recalls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No recalls found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters, or click "Update Recalls" to fetch the latest data.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recalls.map((recall) => (
              <div
                key={recall.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getSourceColor(recall.source)}`}>
                        {recall.source}
                      </span>
                      {recall.classification && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded border flex items-center gap-1 ${getClassificationColor(
                            recall.classification
                          )}`}
                        >
                          {getClassificationIcon(recall.classification)}
                          {recall.classification}
                        </span>
                      )}
                      {recall.productType && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {recall.productType}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{recall.title}</h3>

                    {/* Company and Location */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {recall.companyName}
                      </div>
                      {recall.state && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {recall.state}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(recall.recallInitiationDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Reason */}
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Reason:</strong> {recall.reasonForRecall}
                    </p>

                    {/* Distribution */}
                    {recall.distributionPattern && (
                      <p className="text-sm text-gray-600">
                        <strong>Distribution:</strong> {recall.distributionPattern}
                      </p>
                    )}
                  </div>

                  {/* Image */}
                  {recall.imageUrl && (
                    <img
                      src={recall.imageUrl}
                      alt={recall.title}
                      className="w-24 h-24 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Recall #: {recall.recallNumber}</span>
                  {recall.sourceUrl && (
                    <a
                      href={recall.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
