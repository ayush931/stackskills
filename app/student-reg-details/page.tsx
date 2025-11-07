'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  GraduationCap,
  School,
  Cake,
  UserCircle,
} from 'lucide-react';

interface Student {
  _id: string;
  fullName: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender?: string;
  school: string;
  grade: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
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

export default function StudentDetailsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/get-students?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
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

  const formatDateOfBirth = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.parentName && student.parentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => fetchStudents(currentPage)} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Student Registrations</h1>
          </div>
          <p className="text-lg text-gray-600">View all student registrations</p>
          {pagination && (
            <Badge variant="secondary" className="mt-4 text-base px-4 py-2">
              Total: {pagination.totalRecords} Students
            </Badge>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, school, grade, city, or parent name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          {filteredStudents.map((student) => (
            <Card key={student._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{student.fullName}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-white text-purple-600">
                        Grade {student.grade}
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-400 text-white">
                        Age: {calculateAge(student.dateOfBirth)} years
                      </Badge>
                    </div>
                  </div>
                  <UserCircle className="h-8 w-8 opacity-80" />
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Student Info */}
                <div className="space-y-3">
                  {student.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a
                          href={`mailto:${student.email}`}
                          className="text-sm font-medium text-purple-600 hover:underline"
                        >
                          {student.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${student.phone}`}
                        className="text-sm font-medium text-purple-600 hover:underline"
                      >
                        {student.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Cake className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDateOfBirth(student.dateOfBirth)}
                      </p>
                    </div>
                  </div>

                  {student.gender && (
                    <div className="flex items-start gap-3">
                      <UserCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="text-sm font-medium text-gray-900">{student.gender}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <School className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">School</p>
                      <p className="text-sm font-medium text-gray-900">{student.school}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Grade</p>
                      <p className="text-sm font-medium text-gray-900">{student.grade}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{student.address}</p>
                      <p className="text-sm text-gray-600">
                        {student.city}, {student.state} - {student.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Parent Info - Only show if at least one parent field exists */}
                {(student.parentName || student.parentPhone || student.parentEmail) && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Parent/Guardian Information
                    </p>

                    <div className="space-y-3">
                      {student.parentName && (
                        <div className="flex items-start gap-3">
                          <UserCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-sm font-medium text-gray-900">
                              {student.parentName}
                            </p>
                          </div>
                        </div>
                      )}

                      {student.parentPhone && (
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <a
                              href={`tel:${student.parentPhone}`}
                              className="text-sm text-purple-600 hover:underline"
                            >
                              {student.parentPhone}
                            </a>
                          </div>
                        </div>
                      )}

                      {student.parentEmail && (
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <a
                              href={`mailto:${student.parentEmail}`}
                              className="text-sm text-purple-600 hover:underline"
                            >
                              {student.parentEmail}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Registration Date */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Registered: {formatDate(student.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No students found</p>
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
                const pageNum = i + 1;
                const shouldShow =
                  pageNum <= 3 ||
                  pageNum > pagination.totalPages - 3 ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (!shouldShow && pageNum === 4) {
                  return (
                    <span key={pageNum} className="px-2">
                      ...
                    </span>
                  );
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
            Showing {(currentPage - 1) * pagination.recordsPerPage + 1} to{' '}
            {Math.min(currentPage * pagination.recordsPerPage, pagination.totalRecords)} of{' '}
            {pagination.totalRecords} students
          </div>
        )}
      </div>
    </div>
  );
}
