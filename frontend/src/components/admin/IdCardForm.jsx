import React, { useState } from 'react';
import { uploadImageApi } from '../../api/uploadApi';

const IdCardForm = ({ initialData = {}, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    studentName: initialData.studentName || '',
    studentEmail: initialData.studentEmail || '',
    studentPassword: '', // Only for creation usually, or optional on edit
    studentId: initialData.studentId || '',
    class: initialData.class || '',
    section: initialData.section || '',
    dob: initialData.dob ? initialData.dob.split('T')[0] : '',
    bloodGroup: initialData.bloodGroup || '',
    address: initialData.address || '',
    guardianName: initialData.guardianName || '',
    guardianPhone: initialData.guardianPhone || '',
    schoolName: initialData.schoolName || '',
    schoolAddress: initialData.schoolAddress || '',
    schoolContact: initialData.schoolContact || '',
    issueDate: initialData.issueDate ? initialData.issueDate.split('T')[0] : '',
    expiryDate: initialData.expiryDate ? initialData.expiryDate.split('T')[0] : '',
    position: initialData.position || 'Student',
    studentPhoto: initialData.studentPhoto || '',
    schoolLogo: initialData.schoolLogo || '',
  });

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'photo') setUploadingPhoto(true);
    if (type === 'logo') setUploadingLogo(true);
    setErrorMsg('');

    try {
      const { data } = await uploadImageApi(file);
      if (type === 'photo') setFormData({ ...formData, studentPhoto: data.imageUrl });
      if (type === 'logo') setFormData({ ...formData, schoolLogo: data.imageUrl });
    } catch (err) {
      setErrorMsg('Image upload failed. Please try again.');
    } finally {
      if (type === 'photo') setUploadingPhoto(false);
      if (type === 'logo') setUploadingLogo(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentPhoto) {
      setErrorMsg('Student photo is required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images Section */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">Student Photo *</label>
            {formData.studentPhoto ? (
              <div className="relative inline-block">
                <img src={formData.studentPhoto} alt="Student" className="w-32 h-32 object-cover rounded-full border-4 border-gray-100 mx-auto" />
                <button type="button" onClick={() => setFormData({...formData, studentPhoto: ''})} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs">✕</button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'photo')} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                  {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                </label>
              </div>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
            {formData.schoolLogo ? (
              <div className="relative inline-block">
                <img src={formData.schoolLogo} alt="Logo" className="w-32 h-32 object-contain mx-auto" />
                <button type="button" onClick={() => setFormData({...formData, schoolLogo: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs">✕</button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="hidden" id="logo-upload" />
                <label htmlFor="logo-upload" className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                  {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Student Details */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-bold text-gray-900 border-b pb-2 mt-4">Student Details</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Email *</label>
          <input type="email" name="studentEmail" required value={formData.studentEmail} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {!initialData._id && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input type="password" name="studentPassword" required value={formData.studentPassword} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student ID / Roll No *</label>
          <input type="text" name="studentId" required value={formData.studentId} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
            <input type="text" name="class" required value={formData.class} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <input type="text" name="section" value={formData.section} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Guardian Details */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-bold text-gray-900 border-b pb-2 mt-4">Guardian Details</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
          <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
          <input type="text" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* School Details */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-bold text-gray-900 border-b pb-2 mt-4">School Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
          <input type="text" name="schoolName" required value={formData.schoolName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
          <input type="date" name="issueDate" required value={formData.issueDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input type="date" name="expiryDate" required value={formData.expiryDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || uploadingPhoto || uploadingLogo}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {isLoading ? 'Saving...' : initialData._id ? 'Update ID Card' : 'Create ID Card'}
        </button>
      </div>
    </form>
  );
};

export default IdCardForm;
