'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Building
} from 'lucide-react';

interface School {
  _id: string;
  schoolName: string;
  schoolEmail: string;
  district: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  board: string;
  authorizedPersonName: string;
  authorizedPersonEmail: string;
  designation: string;
  phoneNo: string;
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

export default function SchoolDetailsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSchools = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/school-register?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }
      const data = await response.json();
      setSchools(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools(currentPage);
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
      minute: '2-digit'
    });
  };

  const filteredSchools = schools.filter(school =>
    school.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.board.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.authorizedPersonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading school details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => fetchSchools(currentPage)} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              School Registrations
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            View all school partnership registrations
          </p>
          {pagination && (
            <Badge variant="secondary" className="mt-4 text-base px-4 py-2">
              Total: {pagination.totalRecords} Schools
            </Badge>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by school name, district, city, board, or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          {filteredSchools.map((school) => (
            <Card key={school._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{school.schoolName}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-white text-blue-600">
                        {school.board}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-400 text-white">
                        {school.district}
                      </Badge>
                    </div>
                  </div>
                  <GraduationCap className="h-8 w-8 opacity-80" />
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* School Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">School Email</p>
                      <a href={`mailto:${school.schoolEmail}`} className="text-sm font-medium text-blue-600 hover:underline">
                        {school.schoolEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href={`tel:${school.phoneNo}`} className="text-sm font-medium text-blue-600 hover:underline">
                        {school.phoneNo}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Board</p>
                      <p className="text-sm font-medium text-gray-900">
                        {school.board}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">
                        {school.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {school.district}, {school.city}, {school.state} - {school.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Authorized Person</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{school.authorizedPersonName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">{school.designation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <a href={`mailto:${school.authorizedPersonEmail}`} className="text-sm text-blue-600 hover:underline">
                          {school.authorizedPersonEmail}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <a href={`tel:${school.phoneNo}`} className="text-sm text-blue-600 hover:underline">
                          {school.phoneNo}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Registered: {formatDate(school.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSchools.length === 0 && !loading && (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No schools found</p>
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
              {Array.from({ length: Math.min(pagination.totalPages, 10) }, (_, i) => {
                // Show first 3, last 3, and pages around current page
                const pageNum = i + 1;
                const shouldShow =
                  pageNum <= 3 ||
                  pageNum > pagination.totalPages - 3 ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (!shouldShow && pageNum === 4) {
                  return <span key={pageNum} className="px-2">...</span>;
                }

                if (!shouldShow) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'default' : 'outline'}
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
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
            Showing {((currentPage - 1) * pagination.recordsPerPage) + 1} to{' '}
            {Math.min(currentPage * pagination.recordsPerPage, pagination.totalRecords)} of{' '}
            {pagination.totalRecords} schools
          </div>
        )}
      </div>
    </div>
  );
}
