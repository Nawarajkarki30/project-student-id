import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdCardStore } from '../store/idCardStore';
import Navbar from '../components/common/Navbar';

const AdminDashboard = () => {
  const { idCards, fetchAllIdCards, isLoading, error } = useIdCardStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllIdCards();
  }, [fetchAllIdCards]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllIdCards(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ID Cards Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage all student ID cards</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-400 hover:text-blue-600">
                🔍
              </button>
            </form>
            
            <Link
              to="/admin/add-id"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap shadow-sm hover:shadow"
            >
              + Add ID Card
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : idCards.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🪪</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900">No ID Cards Found</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first student ID card.'}
            </p>
            {!searchTerm && (
              <Link
                to="/admin/add-id"
                className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create ID Card
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {idCards.map((card) => (
              <Link 
                key={card._id} 
                to={`/admin/id/${card._id}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group cursor-pointer"
              >
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <img 
                      src={card.studentPhoto} 
                      alt={card.studentName}
                      className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
                    />
                  </div>
                </div>
                <div className="pt-12 pb-6 px-4 text-center">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition truncate">
                    {card.studentName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{card.studentId}</p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                    Class {card.class} - Sec {card.section}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
