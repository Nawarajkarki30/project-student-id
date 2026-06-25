import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdCardStore } from '../store/idCardStore';
import Navbar from '../components/common/Navbar';
import IdCardForm from '../components/admin/IdCardForm';

const AddIdCardPage = () => {
  const { createIdCard, isLoading } = useIdCardStore();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createIdCard(formData);
      navigate('/admin/dashboard');
    } catch (error) {
      // Error handled by store and shown via form if needed, or toast
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 mb-4 inline-flex items-center gap-1 font-medium">
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New ID Card</h1>
          <p className="text-gray-500 mt-1">Fill in the details below to generate a student ID card and account.</p>
        </div>

        <IdCardForm onSubmit={handleSubmit} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default AddIdCardPage;
