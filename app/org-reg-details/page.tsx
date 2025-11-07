'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
} from 'lucide-react';

interface Organization {
  _id: string;
  organizationName: string;
  organizationType?: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPersonName: string;
  contactPersonDesignation: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function OrganizationDetailsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrganizations = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/get-organizations?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      const data = await response.json();
      setOrganizations(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.contactPersonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading organization details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => fetchOrganizations(currentPage)} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Organization Registrations</h1>
          <p className="text-lg text-gray-600">View all organization partnership registrations</p>
          {pagination && (
            <Badge variant="secondary" className="mt-4 text-base px-4 py-2">
              Total: {pagination.totalRecords} Organizations
            </Badge>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by organization name, city, state, or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          {filteredOrganizations.map((org) => (
            <Card key={org._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{org.organizationName}</CardTitle>
                    {org.organizationType && (
                      <Badge variant="secondary" className="bg-white text-orange-600">
                        {org.organizationType}
                      </Badge>
                    )}
                  </div>
                  <Building2 className="h-8 w-8 opacity-80" />
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Organization Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${org.email}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {org.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${org.phone}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {org.phone}
                      </a>
                    </div>
                  </div>

                  {org.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          {org.website}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{org.address}</p>
                      <p className="text-sm text-gray-600">
                        {org.city}, {org.state} - {org.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Contact Person</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{org.contactPersonName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">{org.contactPersonDesignation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <a
                          href={`mailto:${org.contactPersonEmail}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {org.contactPersonEmail}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <a
                          href={`tel:${org.contactPersonPhone}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {org.contactPersonPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Registered: {formatDate(org.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredOrganizations.length === 0 && !loading && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No organizations found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  onClick={() => handlePageChange(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Page Info */}
        {pagination && (
          <div className="text-center mt-6 text-sm text-gray-600">
            Showing {(currentPage - 1) * pagination.recordsPerPage + 1} to{' '}
            {Math.min(currentPage * pagination.recordsPerPage, pagination.totalRecords)} of{' '}
            {pagination.totalRecords} organizations
          </div>
        )}
      </div>
    </div>
  );
}
