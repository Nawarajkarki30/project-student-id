import React from 'react';

const IdCardPreview = ({ cardData }) => {
  if (!cardData) return null;

  return (
    <div className="flex justify-center print:block print:w-full">
      <div 
        id="print-section"
        className="relative bg-white w-full max-w-[380px] mx-auto overflow-hidden shadow-lg border border-gray-200 print:shadow-none print:border-none print:max-w-none"
      >
        {/* Top Diagonal Shape */}
        <div 
          className="absolute top-0 left-0 w-full h-40 bg-[#007BFF] print:bg-[#007BFF]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        ></div>

        {/* School Logo */}
        {cardData.schoolLogo && (
          <div className="absolute top-6 right-6 w-20 h-20 flex items-center justify-center z-20">
            <img 
              src={cardData.schoolLogo} 
              alt="School Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Profile Photo */}
        <div className="relative pt-12 flex justify-center z-10">
          <div className="w-40 h-40 rounded-full bg-black overflow-hidden shadow-md">
            <img 
              src={cardData.studentPhoto || 'https://via.placeholder.com/150'} 
              alt={cardData.studentName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Details */}
        <div className="text-center mt-5 px-4 z-10 relative">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">{cardData.studentName}</h2>
          <p className="text-[#007BFF] font-semibold text-lg mt-1">{cardData.schoolName || 'School Name'}</p>
        </div>

        {/* Detailed Info Grid */}
        <div className="mt-8 px-10 text-[15px] text-gray-900 pb-28 relative z-10">
          <div className="flex flex-col space-y-3 font-medium">
            <div className="flex">
              <span className="w-24 font-bold">Email</span>
              <span className="mx-2">:</span>
              <span className="truncate flex-1 font-semibold">{cardData.studentEmail}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold">Address</span>
              <span className="mx-2">:</span>
              <span className="truncate flex-1 font-semibold">{cardData.address}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold">DOB</span>
              <span className="mx-2">:</span>
              <span className="truncate flex-1 font-semibold">{cardData.dob ? new Date(cardData.dob).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold">Expiry</span>
              <span className="mx-2">:</span>
              <span className="truncate flex-1 font-semibold">{cardData.expiryDate ? new Date(cardData.expiryDate).toISOString().split('T')[0] : 'N/A'}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold">Position</span>
              <span className="mx-2">:</span>
              <span className="truncate flex-1 font-semibold">{cardData.position || 'Student'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Diagonal Shape */}
        <div 
          className="absolute bottom-0 left-0 w-full h-28 bg-[#0B5A7D] print:bg-[#0B5A7D]"
          style={{ clipPath: 'polygon(0 45%, 100% 0, 100% 100%, 0 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        ></div>
      </div>
    </div>
  );
};

export default IdCardPreview;
