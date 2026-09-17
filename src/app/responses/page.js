'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserShield,
  faHeartbeat,
  faClock,
  faSearch,
  faFilter,
  faChevronDown,
  faChevronUp,
  faEye,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faDownload,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import ClientDetailModal from './ClientDetailModal';

const RISK_PROFILES = ['Conservative', 'Moderate', 'Balanced', 'Aggressive', 'Very Aggressive'];
const OCCUPATION_TYPES = ['Salaried', 'Self-Employed', 'Business Owner', 'Retired', 'Student', 'Other'];
const TAX_SLABS = ['No Tax', '5% Slab', '10% Slab', '15% Slab', '20% Slab', '30% Slab', 'Old Regime', 'New Regime'];

const RISK_PROFILE_COLORS = {
  Conservative: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Balanced: 'bg-blue-100 text-blue-800',
  Aggressive: 'bg-orange-100 text-orange-800',
  'Very Aggressive': 'bg-red-100 text-red-800',
};

const INSURANCE_STATUS_COLORS = {
  true: 'bg-green-100 text-green-800',
  false: 'bg-red-100 text-red-800',
};

function maskSensitive(value, type = 'pan') {
  if (!value) return '—';
  if (type === 'pan') {
    return value.length > 4 ? `${value.slice(0, 3)}****${value.slice(-1)}` : '****';
  }
  if (type === 'aadhar') {
    return value.length > 4 ? `**** **** ${value.slice(-4)}` : '****';
  }
  return value;
}

function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function formatDateTime(dateString) {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '—';
  }
}

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ResponsesDashboard() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    conservativeClients: 0,
    noLifeInsurance: 0,
    noHealthInsurance: 0,
    recentClients: [],
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    riskProfile: '',
    occupationType: '',
    hasLifeInsurance: '',
    hasHealthInsurance: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [showFilters, setShowFilters] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const response = await fetch('/api/clients/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.riskProfile) params.append('riskProfile', filters.riskProfile);
      if (filters.occupationType) params.append('occupationType', filters.occupationType);
      if (filters.hasLifeInsurance) params.append('hasLifeInsurance', filters.hasLifeInsurance);
      if (filters.hasHealthInsurance) params.append('hasHealthInsurance', filters.hasHealthInsurance);

      const response = await fetch(`/api/clients/filtered?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch clients');
      }
      const data = await response.json();
      setClients(data.clients);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchStats();
    fetchClients();
  }, [fetchStats, fetchClients]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSort = (column) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      riskProfile: '',
      occupationType: '',
      hasLifeInsurance: '',
      hasHealthInsurance: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const hasActiveFilters = useMemo(
    () =>
      filters.search ||
      filters.riskProfile ||
      filters.occupationType ||
      filters.hasLifeInsurance ||
      filters.hasHealthInsurance,
    [filters]
  );

  const openClientDetail = async (client) => {
    try {
      const response = await fetch(`/api/clients/${client._id}`);
      if (!response.ok) throw new Error('Failed to fetch client details');
      const data = await response.json();
      setSelectedClient(data.client);
    } catch (err) {
      console.error('Error fetching client details:', err);
      setError('Failed to load client details');
    }
  };

  const closeClientDetail = () => {
    setSelectedClient(null);
  };

  const sortIcon = (column) => {
    if (filters.sortBy !== column) return <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />;
    return filters.sortOrder === 'asc' ? (
      <FontAwesomeIcon icon={faChevronUp} className="text-indigo-600" />
    ) : (
      <FontAwesomeIcon icon={faChevronDown} className="text-indigo-600" />
    );
  };

  if (loading && clients.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Responses</h1>
              <p className="mt-1 text-sm text-gray-600">
                Review and manage submitted client financial profiles
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchClients}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <FontAwesomeIcon icon={faSync} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <FontAwesomeIcon icon={faTimes} className="text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <FontAwesomeIcon icon={faTimes} size="xs" />
            </button>
          </div>
        )}

        {/* KPI Overview Section */}
        <section aria-labelledby="kpi-heading" className="mb-8">
          <h2 id="kpi-heading" className="sr-only">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              icon={faUsers}
              title="Total Clients"
              value={stats.totalClients}
              subtitle="All submitted responses"
              color="indigo"
              loading={statsLoading}
            />
            <KPICard
              icon={faUserShield}
              title="Conservative Risk"
              value={stats.conservativeClients}
              subtitle={`${stats.totalClients > 0 ? Math.round((stats.conservativeClients / stats.totalClients) * 100) : 0}% of total`}
              color="green"
              loading={statsLoading}
            />
            <KPICard
              icon={faHeartbeat}
              title="No Life Insurance"
              value={stats.noLifeInsurance}
              subtitle={`${stats.totalClients > 0 ? Math.round((stats.noLifeInsurance / stats.totalClients) * 100) : 0}% unprotected`}
              color="red"
              loading={statsLoading}
            />
            <KPICard
              icon={faClock}
              title="No Health Insurance"
              value={stats.noHealthInsurance}
              subtitle={`${stats.totalClients > 0 ? Math.round((stats.noHealthInsurance / stats.totalClients) * 100) : 0}% unprotected`}
              color="orange"
              loading={statsLoading}
            />
          </div>
        </section>

        {/* Filters & Search */}
        <section className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  aria-label="Search clients"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  aria-expanded={showFilters}
                >
                  <FontAwesomeIcon icon={faFilter} className={hasActiveFilters ? 'text-indigo-600' : 'text-gray-400'} />
                  Filters
                  {hasActiveFilters && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                      {[
                        filters.riskProfile,
                        filters.occupationType,
                        filters.hasLifeInsurance,
                        filters.hasHealthInsurance,
                      ].filter(Boolean).length}
                    </span>
                  )}
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border-b border-gray-200 animate-slide-down">
                <FilterSelect
                  label="Risk Profile"
                  value={filters.riskProfile}
                  onChange={(e) => handleFilterChange('riskProfile', e.target.value)}
                  options={RISK_PROFILES}
                  placeholder="All risk profiles"
                />
                <FilterSelect
                  label="Occupation"
                  value={filters.occupationType}
                  onChange={(e) => handleFilterChange('occupationType', e.target.value)}
                  options={OCCUPATION_TYPES}
                  placeholder="All occupations"
                />
                <FilterSelect
                  label="Life Insurance"
                  value={filters.hasLifeInsurance}
                  onChange={(e) => handleFilterChange('hasLifeInsurance', e.target.value)}
                  options={[
                    { value: 'true', label: 'Has Life Insurance' },
                    { value: 'false', label: 'No Life Insurance' },
                  ]}
                  placeholder="All"
                />
                <FilterSelect
                  label="Health Insurance"
                  value={filters.hasHealthInsurance}
                  onChange={(e) => handleFilterChange('hasHealthInsurance', e.target.value)}
                  options={[
                    { value: 'true', label: 'Has Health Insurance' },
                    { value: 'false', label: 'No Health Insurance' },
                  ]}
                  placeholder="All"
                />
                <FilterSelect
                  label="Sort By"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  options={[
                    { value: 'createdAt', label: 'Date Submitted' },
                    { value: 'clientName', label: 'Client Name' },
                    { value: 'riskProfile', label: 'Risk Profile' },
                    { value: 'occupationType', label: 'Occupation' },
                    { value: 'incomeTaxSlab', label: 'Tax Slab' },
                  ]}
                  placeholder="Sort by"
                />
              </div>
            )}
          </div>
        </section>

        {/* Client Table */}
        <section aria-labelledby="table-heading">
          <h2 id="table-heading" className="sr-only">
            Client Responses Table
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {loading ? (
              <TableSkeleton />
            ) : clients.length === 0 ? (
              <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearFilters} />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full" role="grid">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          { key: 'clientName', label: 'Client' },
                          { key: 'email', label: 'Email' },
                          { key: 'occupationType', label: 'Occupation' },
                          { key: 'riskProfile', label: 'Risk Profile' },
                          { key: 'incomeTaxSlab', label: 'Tax Slab' },
                          { key: 'number_of_dependents', label: 'Dependents' },
                          { key: 'hasLifeInsurance', label: 'Life Insurance' },
                          { key: 'hasHealthInsurance', label: 'Health Insurance' },
                          { key: 'createdAt', label: 'Submitted' },
                        ].map((col) => (
                          <th
                            key={col.key}
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort(col.key)}
                            style={{ userSelect: 'none' }}
                          >
                            <div className="flex items-center gap-1">
                              {col.label}
                              {sortIcon(col.key)}
                            </div>
                          </th>
                        ))}
                        <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {clients.map((client) => (
                        <ClientRow
                          key={client._id}
                          client={client}
                          onView={() => openClientDetail(client)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      Showing{' '}
                      <span className="font-medium">
                        {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                      </span>{' '}
                      to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium">{pagination.total}</span>{' '}
                      results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={!pagination.hasPrevPage || loading}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Previous page"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                      </button>
                      <div className="flex items-center gap-1" role="navigation" aria-label="Pagination">
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (pagination.page <= 3) {
                            pageNum = i + 1;
                          } else if (pagination.page >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = pagination.page - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                                pagination.page === pageNum
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                              aria-current={pagination.page === pageNum ? 'page' : undefined}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={!pagination.hasNextPage || loading}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Next page"
                      >
                        <FontAwesomeIcon icon={faArrowRight} size="sm" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={closeClientDetail}
        />
      )}
    </div>
  );
}

function KPICard({ icon, title, value, subtitle, color, loading }) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  const iconColorMap = {
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border ${colorMap[color]} p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <FontAwesomeIcon icon={icon} className={`text-xl ${iconColorMap[color]}`} />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}

function ClientRow({ client, onView }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
            {getInitials(client.clientName)}
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{client.clientName || '—'}</p>
            <p className="text-xs text-gray-500">{maskSensitive(client.pan, 'pan')}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{client.email || '—'}</td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {client.occupationType || '—'}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            RISK_PROFILE_COLORS[client.riskProfile] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {client.riskProfile || '—'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {client.incomeTaxSlab || '—'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 text-center">
        {client.number_of_dependents ?? '—'}
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            INSURANCE_STATUS_COLORS[client.hasLifeInsurance]
          }`}
        >
          {client.hasLifeInsurance ? 'Yes' : 'No'}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            INSURANCE_STATUS_COLORS[client.hasHealthInsurance]
          }`}
        >
          {client.hasHealthInsurance ? 'Yes' : 'No'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
        {formatDate(client.createdAt)}
      </td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={onView}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          aria-label={`View details for ${client.clientName}`}
        >
          <FontAwesomeIcon icon={faEye} size="xs" />
          View
        </button>
      </td>
    </tr>
  );
}

function TableSkeleton() {
  return (
    <div className="p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse border-b border-gray-200">
          <div className="flex items-center gap-4 p-4">
            <div className="w-9 h-9 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="w-10 h-6 bg-gray-200 rounded"></div>
            <div className="w-10 h-6 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="w-20 h-6 bg-gray-200 rounded ml-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="py-16 px-4 text-center">
      <FontAwesomeIcon icon={faUsers} className="text-gray-300 mx-auto mb-4 text-5xl" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {hasFilters ? 'No matching clients found' : 'No client responses yet'}
      </h3>
      <p className="text-gray-500 mb-6">
        {hasFilters
          ? 'Try adjusting your filters or search terms'
          : 'Client responses will appear here once submitted'}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}