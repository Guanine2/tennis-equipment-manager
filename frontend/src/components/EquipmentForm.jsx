import React, { useEffect, useState } from "react";

export default function EquipmentForm({ currentUser }) {
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const [racquets, setRacquets] = useState([]);
  const [filteredRacquets, setFilteredRacquets] = useState([]);
  const [selectedRacquetId, setSelectedRacquetId] = useState(null);
  const [playerRacquets, setPlayerRacquets] = useState([]);

  // Fetch brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:3001/brand");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);

  // Fetch all racquets
  useEffect(() => {
    const fetchRacquets = async () => {
      try {
        const res = await fetch("http://localhost:3001/racquets");
        const data = await res.json();
        setRacquets(data);
      } catch (err) {
        console.error("Error fetching racquets:", err);
      }
    };
    fetchRacquets();
  }, []);

  // Filter racquets by selected brand
  useEffect(() => {
    if (brandId) {
      setFilteredRacquets(
        racquets.filter(r => r.brand.id === parseInt(brandId))
      );
    } else {
      setFilteredRacquets([]);
    }
  }, [brandId, racquets]);

  // Add player racquet
  const addEquipment = () => {
    const racquet = racquets.find(r => r.id === parseInt(selectedRacquetId));
    if (!racquet) return;

    const newPlayerRacquet = {
      racquet_id: racquet.id,
      racquet_name: racquet.name,
      brand_name: racquet.brand.name,
      head_in: racquet.head_in,
      weight_g: racquet.weight_g,
      string_type: "",
      string_tension: "",
      tension_unit: ""
    };

    setPlayerRacquets([...playerRacquets, newPlayerRacquet]);

    // Only send to backend if user is logged in
    if (currentUser?.firebase_uid) {
      fetch("http://localhost:3001/player_racquet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebase_uid: currentUser.firebase_uid,
          racquet_id: racquet.id
        })
      }).catch(err => console.error(err));
    }

    setBrandId(null);
    setSelectedRacquetId(null);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      {/* Brand dropdown */}
      <select
        value={brandId || ""}
        onChange={e => setBrandId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select a brand</option>
        {brands.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      {/* Racquet dropdown */}
      <select
        value={selectedRacquetId || ""}
        onChange={e => setSelectedRacquetId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select a racquet</option>
        {filteredRacquets.map(r => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <button
        onClick={addEquipment}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ➕ Add Racquet
      </button>

      {/* Player racquet cards */}
      {playerRacquets.map((pr, idx) => (
        <div key={idx} className="border p-3 rounded space-y-2">
          <div><strong>{pr.brand_name} {pr.racquet_name}</strong></div>
          <div>Head: {pr.head_in}" | Weight: {pr.weight_g}g</div>
          <input
            placeholder="String Type"
            value={pr.string_type}
            onChange={e => {
              const copy = [...playerRacquets];
              copy[idx].string_type = e.target.value;
              setPlayerRacquets(copy);
            }}
            className="border rounded px-2 py-1 w-full"
          />
          <input
            placeholder="Tension"
            value={pr.string_tension}
            onChange={e => {
              const copy = [...playerRacquets];
              copy[idx].string_tension = e.target.value;
              setPlayerRacquets(copy);
            }}
            className="border rounded px-2 py-1 w-full"
          />
          <input
            placeholder="Tension Unit"
            value={pr.tension_unit}
            onChange={e => {
              const copy = [...playerRacquets];
              copy[idx].tension_unit = e.target.value;
              setPlayerRacquets(copy);
            }}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      ))}
    </div>
  );
}
