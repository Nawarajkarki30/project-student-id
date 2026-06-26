import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useIdCardStore } from '../store/idCardStore';
import Navbar from '../components/common/Navbar';
import IdCardPreview from '../components/IdCardPreview';

const SingleIdCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchIdCardById, selectedIdCard, deleteIdCard, isLoading, error } = useIdCardStore();

  useEffect(() => {
    if (id) {
      fetchIdCardById(id);
    }
  }, [id, fetchIdCardById]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this ID card? This action cannot be undone.')) {
      try {
        await deleteIdCard(id);
        navigate('/admin/dashboard');
      } catch (err) {
        console.error('Delete failed', err);
        alert('Failed to delete ID card');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !selectedIdCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center shadow-sm">
            <h2 className="text-xl font-bold mb-2">Error Loading ID Card</h2>
            <p>{error || 'Card not found'}</p>
            <button onClick={() => navigate('/admin/dashboard')} className="mt-4 px-4 py-2 bg-red-100 rounded hover:bg-red-200">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 print:p-0 print:m-0">
        <div className="mb-8 print:hidden">
          <button onClick={() => navigate('/admin/dashboard')} className="text-gray-500 hover:text-blue-600 mb-4 inline-flex items-center gap-1 font-medium">
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">ID Card Details</h1>
          <p className="text-gray-500 mt-1">Review, edit, print, or delete this student's ID card.</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-[380px] mx-auto print:mx-0 print:max-w-none">
            <IdCardPreview cardData={selectedIdCard} />
            
            <div className="bg-gray-200 p-4 mt-4 flex justify-between gap-3 print:hidden">
              <Link
                to={`/admin/edit-id/${selectedIdCard._id}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0d6efd] text-white rounded hover:bg-blue-700 transition shadow-sm font-medium"
              >
                ✎ Edit
              </Link>

              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#dc3545] text-white rounded hover:bg-red-700 transition shadow-sm font-medium"
              >
                🗑️ Delete
              </button>
              
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#198754] text-white rounded hover:bg-green-700 transition shadow-sm font-medium"
              >
                🖨️ Print
              </button>
            </div>
          </div>

          <div className="w-full max-w-[380px] mt-4 p-5 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-600 bg-white print:hidden">
            <h3 className="text-md font-bold text-gray-900 mb-2">Printing Tips</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure "Background Graphics" is enabled in the print dialog.</li>
              <li>Set margins to "None" or "Minimum".</li>
              <li>Scale the print to 100% for standard ID card size.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleIdCardPage;
