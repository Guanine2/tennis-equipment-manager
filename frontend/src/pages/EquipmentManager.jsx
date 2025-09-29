import React, { useState } from 'react';
import EquipmentForm from '../components/EquipmentForm';
import EquipmentList from '../components/EquipmentList';
import ProfileDropdown from '../components/ProfileDropdown';
import Taskbar from '../components/Taskbar'
import '../index.css';

const initialEquipment = {
  racquets: [],
  shoes: [],
  bags: [],
};

export default function EquipmentManager() {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [inputs, setInputs] = useState({
    type: 'racquets',
    name: '',
    brand: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const addEquipment = () => {
    if (!inputs.name || !inputs.brand) return;

    setEquipment((prev) => ({
      ...prev,
      [inputs.type]: [...prev[inputs.type], { name: inputs.name, brand: inputs.brand }],
    }));

    setInputs((prev) => ({ ...prev, name: '', brand: '' }));
  };

  return (
    <div className="relative">
      <Taskbar></Taskbar>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <EquipmentForm
          inputs={inputs}
          handleInputChange={handleInputChange}
          addEquipment={addEquipment}
        />
        <EquipmentList equipment={equipment} />
      </div>
    </div>
  );
}
