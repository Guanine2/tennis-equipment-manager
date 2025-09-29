import React from 'react';

export default function EquipmentList({ equipment }) {
  const renderItems = (type) => (
    <ul className="list-disc pl-5 text-sm text-gray-700">
      {equipment[type].map((item, idx) => (
        <li key={idx}>{item.brand} – {item.name}</li>
      ))}
    </ul>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
      {['racquets', 'shoes', 'bags'].map((type) => (
        <div key={type} className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold capitalize mb-3">{type}</h2>
          {renderItems(type)}
        </div>
      ))}
    </div>
  );
}
