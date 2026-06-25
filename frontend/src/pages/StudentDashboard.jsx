import React, { useEffect } from 'react';
import { useIdCardStore } from '../store/idCardStore';
import Navbar from '../components/common/Navbar';
import IdCardPreview from '../components/IdCardPreview';
import { useAuthStore } from '../store/authStore';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { fetchMyIdCard, myIdCard, isLoading, error } = useIdCardStore();

  useEffect(() => {
    fetchMyIdCard();
  }, [fetchMyIdCard]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 print:p-0 print:m-0 flex flex-col items-center">
        
        <div className="w-full mb-8 text-center print:hidden">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-500 mt-2">View and print your student ID card here.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 print:hidden">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center shadow-sm w-full print:hidden">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        ) : !myIdCard ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center w-full max-w-2xl print:hidden">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🪪</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No ID Card Found</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Your school administration has not created an ID card for your email address yet. 
              Please contact your school administrator to get your ID card generated.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="mb-8 print:mb-0 w-full flex justify-center">
              <IdCardPreview cardData={myIdCard} />
            </div>
            
            <button
              onClick={handlePrint}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1 print:hidden flex items-center gap-2"
            >
              <span>🖨️</span> Print My ID Card
            </button>

            <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm max-w-md text-center print:hidden border border-blue-100">
              <p className="font-semibold mb-1">Printing Instructions</p>
              <p>For the best result, ensure "Background Graphics" is turned on in your print settings, and margins are set to "None".</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
