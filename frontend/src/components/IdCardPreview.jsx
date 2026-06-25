import React from 'react';

const IdCardPreview = ({ cardData }) => {
  if (!cardData) return null;

  return (
    <div className="flex justify-center print:block print:w-full">
      <div 
        id="print-section"
        className="relative bg-white w-full max-w-sm overflow-hidden shadow-2xl rounded-2xl print:shadow-none print:rounded-none print:max-w-none border border-gray-200 print:border-none"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Top Diagonal Shape */}
        <div 
          className="absolute top-0 left-0 w-full h-32 bg-blue-600 print:bg-blue-600"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        ></div>

        {/* School Logo */}
        {cardData.schoolLogo && (
          <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full p-1 shadow-sm flex items-center justify-center">
            <img 
              src={cardData.schoolLogo} 
              alt="School Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        )}

        {/* Profile Photo */}
        <div className="relative pt-12 flex justify-center z-10">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden">
            <img 
              src={cardData.studentPhoto || 'https://via.placeholder.com/150'} 
              alt={cardData.studentName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Details */}
        <div className="text-center mt-4 px-6 z-10 relative">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{cardData.studentName}</h2>
          <p className="text-blue-600 font-medium text-sm mt-1">{cardData.schoolName || 'School Name'}</p>
        </div>

        {/* Detailed Info Grid */}
        <div className="mt-4 px-6 text-xs text-gray-700 pb-28">
          <div className="grid grid-cols-[1fr_2fr] gap-y-1 mb-2 font-medium">
            <div className="text-gray-900 font-bold">ID No</div>
            <div className="truncate">: {cardData.studentId}</div>
            
            <div className="text-gray-900 font-bold">Class/Sec</div>
            <div className="truncate">: {cardData.class} - {cardData.section}</div>

            <div className="text-gray-900 font-bold">Blood Grp</div>
            <div className="truncate">: {cardData.bloodGroup}</div>

            <div className="text-gray-900 font-bold">Email</div>
            <div className="truncate">: {cardData.studentEmail}</div>
            
            <div className="text-gray-900 font-bold">Address</div>
            <div className="truncate">: {cardData.address}</div>
            
            <div className="text-gray-900 font-bold">Guardian Ph</div>
            <div className="truncate">: {cardData.guardianPhone}</div>

            <div className="text-gray-900 font-bold">DOB</div>
            <div>: {cardData.dob ? new Date(cardData.dob).toLocaleDateString() : 'N/A'}</div>

            <div className="text-gray-900 font-bold">Issue Date</div>
            <div>: {cardData.issueDate ? new Date(cardData.issueDate).toLocaleDateString() : 'N/A'}</div>
            
            <div className="text-gray-900 font-bold">Expiry</div>
            <div>: {cardData.expiryDate ? new Date(cardData.expiryDate).toLocaleDateString() : 'N/A'}</div>
            
            <div className="text-gray-900 font-bold">Position</div>
            <div>: {cardData.position || 'Student'}</div>
          </div>
        </div>

        {/* Bottom Diagonal Shape */}
        <div 
          className="absolute bottom-0 left-0 w-full h-24 bg-teal-800 print:bg-teal-800"
          style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        ></div>
      </div>
    </div>
  );
};

export default IdCardPreview;
