'use client';

import { useState, useEffect } from 'react';

interface Recall {
  id: string;
  recallNumber: string;
  productDescription: string;
  company: string;
  recallDate: string;
  source: string;
  classification: string | null;
  reason: string | null;
  distribution: string | null;
}

interface UpdateStatus {
  fda: 'idle' | 'loading' | 'success' | 'error';
  usda: 'idle' | 'loading' | 'success' | 'error';
  cpsc: 'idle' | 'loading' | 'success' | 'error';
}

export default function RecallsPage() {
  const [recalls, setRecalls] = useState<Recall[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [classificationFilter, setClassificationFilter] = useState('all');
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    fda: 'idle',
    usda: 'idle',
    cpsc: 'idle',
  });
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchRecalls();
  }, []);

  const fetchRecalls = async () => {
    try {
      const response = await fetch('/api/recalls/search');
      const data = await response.json();
      setRecalls(data.recalls || []);
    } catch (error) {
      console.error('Error fetching recalls:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRecalls = async (source: 'fda' | 'usda' | 'cpsc' | 'all') => {
    setMessage(null);
    
    if (source === 'all') {
      // Update all sources sequentially
      await updateSingleSource('fda');
      await updateSingleSource('usda');
      await updateSingleSource('cpsc');
      setMessage({ type: 'success', text: 'All recalls updated successfully!' });
      fetchRecalls();
    } else {
      await updateSingleSource(source);
      fetchRecalls();
    }
  };

  const updateSingleSource = async (source: 'fda' | 'usda' | 'cpsc') => {
    setUpdateStatus(prev => ({ ...prev, [source]: 'loading' }));
    
    try {
      const response = await fetch(`/api/recalls/update-${source}`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUpdateStatus(prev => ({ ...prev, [source]: 'success' }));
        setMessage({ type: 'success', text: `${data.source}: ${data.message}` });
      } else {
        setUpdateStatus(prev => ({ ...prev, [source]: 'error' }));
        setMessage({ type: 'error', text: `${data.source}: ${data.error}` });
      }
    } catch (error) {
      setUpdateStatus(prev => ({ ...prev, [source]: 'error' }));
      setMessage({ type: 'error', text: `Error updating ${source.toUpperCase()} recalls` });
    }
  };

  const filteredRecalls = recalls.filter(recall => {
    const matchesSearch = recall.productDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recall.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'all' || recall.source.toLowerCase() === sourceFilter.toLowerCase();
    const matchesClassification = classificationFilter === 'all' || recall.classification === classificationFilter;
    return matchesSearch && matchesSource && matchesClassification;
  });

  const getClassificationColor = (classification: string | null) => {
    if (!classification) return 'bg-gray-100 text-gray-800';
    if (classification.includes('I')) return 'bg-red-100 text-red-800';
    if (classification.includes('II')) return 'bg-yellow-100 text-yellow-800';
    if (classification.includes('III')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: 'idle' | 'loading' | 'success' | 'error') => {
    if (status === 'loading') return '⏳';
    if (status === 'success') return '✅';
    if (status === 'error') return '❌';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Recalls</h1>
          <p className="text-gray-600">Real-time data from FDA, USDA, and CPSC</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Government APIs can be slow. Click individual buttons to update each source separately (1-2 min each), or "Update All" to fetch everything at once (3-5 min total).
            </p>
          </div>
        </div>

        {/* Update Buttons */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => updateRecalls('fda')}
              disabled={updateStatus.fda === 'loading'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {updateStatus.fda === 'loading' ? 'Updating FDA...' : 'Update FDA'}
              {getStatusIcon(updateStatus.fda)}
            </button>
            
            <button
              onClick={() => updateRecalls('usda')}
              disabled={updateStatus.usda === 'loading'}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {updateStatus.usda === 'loading' ? 'Updating USDA...' : 'Update USDA'}
              {getStatusIcon(updateStatus.usda)}
            </button>
            
            <button
              onClick={() => updateRecalls('cpsc')}
              disabled={updateStatus.cpsc === 'loading'}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {updateStatus.cpsc === 'loading' ? 'Updating CPSC...' : 'Update CPSC'}
              {getStatusIcon(updateStatus.cpsc)}
            </button>
            
            <button
              onClick={() => updateRecalls('all')}
              disabled={Object.values(updateStatus).some(s => s === 'loading')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              {Object.values(updateStatus).some(s => s === 'loading') ? 'Updating...' : 'Update All'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {message.text}
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search recalls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sources</option>
            <option value="FDA">FDA</option>
            <option value="USDA">USDA</option>
            <option value="CPSC">CPSC</option>
          </select>
          
          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Classifications</option>
            <option value="Class I">Class I (High Risk)</option>
            <option value="Class II">Class II (Medium Risk)</option>
            <option value="Class III">Class III (Low Risk)</option>
          </select>
        </div>

        {/* Recalls List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recalls...</p>
          </div>
        ) : filteredRecalls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">No recalls found</p>
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search or filters, or click "Update Recalls" to fetch the latest data.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecalls.map((recall) => (
              <div key={recall.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{recall.productDescription}</h3>
                    <p className="text-gray-600">{recall.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {recall.source}
                    </span>
                    {recall.classification && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getClassificationColor(recall.classification)}`}>
                        {recall.classification}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Recall #:</strong> {recall.recallNumber}</p>
                  <p><strong>Date:</strong> {new Date(recall.recallDate).toLocaleDateString()}</p>
                  {recall.reason && <p><strong>Reason:</strong> {recall.reason}</p>}
                  {recall.distribution && <p><strong>Distribution:</strong> {recall.distribution}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
