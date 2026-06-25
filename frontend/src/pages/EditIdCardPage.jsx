import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIdCardStore } from '../store/idCardStore';
import Navbar from '../components/common/Navbar';
import IdCardForm from '../components/admin/IdCardForm';

const EditIdCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchIdCardById, selectedIdCard, updateIdCard, isLoading, error } = useIdCardStore();
  const [initFinished, setInitFinished] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (id) {
        await fetchIdCardById(id);
        setInitFinished(true);
      }
    };
    init();
  }, [id, fetchIdCardById]);

  const handleSubmit = async (formData) => {
    try {
      await updateIdCard(id, formData);
      navigate(`/admin/id/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!initFinished || (isLoading && !selectedIdCard)) {
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
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 mb-4 inline-flex items-center gap-1 font-medium">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit ID Card</h1>
          <p className="text-gray-500 mt-1">Update details for {selectedIdCard.studentName}</p>
        </div>

        <IdCardForm initialData={selectedIdCard} onSubmit={handleSubmit} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default EditIdCardPage;
