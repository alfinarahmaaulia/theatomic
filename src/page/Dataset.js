import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Import React Select
import './Dataset.css'; // CSS file for styling

const Dataset = () => {
  const [datasets, setDatasets] = useState([]); // State untuk menyimpan dataset
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null); // State untuk error handling
  const [selectedDataset, setSelectedDataset] = useState(null); // State untuk dataset terpilih
  const [opds, setOpds] = useState([]); // State untuk daftar OPD
  const [selectedOpd, setSelectedOpd] = useState(''); // State untuk OPD terpilih

  // Fetch datasets on component mount
  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true); // Set loading ke true
      try {
        const response = await axios.get('http://116.206.212.234:4000/dataset', {
          params: {
            opd: selectedOpd // Filter berdasarkan OPD jika ada
          }
        });
        setDatasets(response.data); // Simpan dataset yang diambil
        setError(null); // Reset error jika sukses
      } catch (err) {
        setError('Failed to fetch datasets'); // Set error message
      } finally {
        setLoading(false); // Set loading ke false
      }
    };
    fetchDatasets(); // Panggil fetch dataset saat component mount atau selectedOpd berubah
  }, [selectedOpd]);

  // Fetch OPD list on component mount
  useEffect(() => {
    const fetchOpds = async () => {
      try {
        const response = await axios.get('http://116.206.212.234:4000/list-opd');
        const opdOptions = response.data.map(opd => ({
          value: opd.nama_opd, // Set value untuk option
          label: opd.nama_opd,  // Label yang ditampilkan di dropdown
        }));
        setOpds(opdOptions); // Simpan data OPD ke format yang sesuai untuk React Select
        setError(null); // Reset error jika sukses
      } catch (err) {
        setError('Failed to fetch OPD list'); // Set error jika gagal
      }
    };
    fetchOpds(); // Panggil fetch OPD saat component mount
  }, []);

  // Fetch dataset details when an item is clicked
  const handleItemClick = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://116.206.212.234:4000/dataset/detail/${id}`);
      setSelectedDataset(response.data);
      setError(null);
    } catch (err) {
      //set eror jika gagal
      setError('Failed to fetch dataset details');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change (when OPD is selected)
  const handleOpdChange = (selectedOption) => {
    setSelectedOpd(selectedOption ? selectedOption.value : ''); // Set OPD terpilih atau kosongkan jika tidak ada
  };

  // Back to dataset list
  const handleBackToList = () => {
    setSelectedDataset(null); // Kembali ke daftar dataset
  };

  return (
    <div className="dataset-container">
      <div className="dataset-layout">
        {/* Filter box for OPD */}
        <div className="filter-box">
          <h3>Produsen Dataset</h3>
          {loading ? (
            <p>Loading Dataset list...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <Select
              className="producer-filter"
              options={opds}  // Pilihan OPD yang sudah diformat
              isClearable={true} // Opsi untuk mengosongkan pilihan
              placeholder="Cari Produsen Dataset..."
              onChange={handleOpdChange} // Handle ketika OPD dipilih
            />
          )}
        </div>

        {/* Dataset list or details */}
        <div className="dataset-list">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : selectedDataset ? (
            <div className="dataset-detail">
              <div className="back-button" onClick={handleBackToList}>
                <i className="fas fa-arrow-left"></i> Kembali
              </div>
              <h3>Details for: {selectedDataset.title}</h3>
              <p><strong>Uraian:</strong> {selectedDataset.uraian_dssd}</p>
              <p><strong>Description:</strong> {selectedDataset.description}</p>
              <p><strong>OPD:</strong> {selectedDataset.nama_opd}</p>
              <p><strong>Jenis:</strong> {selectedDataset.jenis_string}</p>
              <p><strong>Kategori:</strong> {selectedDataset.kategori_string}</p>
              <a href={selectedDataset.download_url} target="_blank" rel="noopener noreferrer" className="download-link">
                Download Dataset
              </a>
            </div>
          ) : (
            <>
              <h2>Dataset List</h2>
              <ul>
                {datasets.map((dataset) => (
                  <li
                    key={dataset.id}
                    className="dataset-item"
                    onClick={() => handleItemClick(dataset.id)}
                  >
                    <img src="/data1.png.png" alt="Data Icon" className="data-icon" />
                    <h3>{dataset.uraian_dssd}</h3>
                    <p>OPD: {dataset.nama_opd}</p>
                    <p>Modified: {new Date(dataset.modified).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dataset;
