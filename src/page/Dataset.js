import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dataset.css'; // File CSS untuk styling

// Fungsi untuk menghitung selisih hari
const calculateDaysAgo = (modifiedDate) => {
  const today = new Date();
  const modified = new Date(modifiedDate);
  const timeDifference = today - modified;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Menghitung selisih hari
  return daysAgo;
};

const Dataset = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [producers, setProducers] = useState([]);
  const [filteredProducers, setFilteredProducers] = useState([]);
  const [searchProducer, setSearchProducer] = useState('');
  const [selectedProducer, setSelectedProducer] = useState('');

  // Fetch datasets from API
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get('http://116.206.212.234:4000/dataset');
        setDatasets(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch datasets');
      } finally {
        setLoading(false);
      }
    };
    fetchDatasets();
  }, []);

  // Fetch producers from API
  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await axios.get('http://116.206.212.234:4000/list-opd');
        const producersData = response.data.map((producer) => ({
          id: producer.id,
          nama_opd: producer.nama_opd,
        }));
        setProducers(producersData);
        setFilteredProducers(producersData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch producers');
      }
    };
    fetchProducers();
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

  // Filter dataset by selected producer
  const filteredDatasets = selectedProducer
    ? datasets.filter((dataset) => dataset.nama_opd === selectedProducer)
    : datasets;

  // Update producer filter based on search input
  const handleProducerSearch = (e) => {
    const inputValue = e.target.value;
    setSearchProducer(inputValue);

    if (inputValue === '') {
      setFilteredProducers(producers);
      setSelectedProducer('');
    } else {
      const searchResults = producers.filter((producer) =>
        producer.nama_opd.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredProducers(searchResults);
    }
  };

  // Handle when a producer is selected from the column
  const handleProducerClick = (producer) => {
    setSelectedProducer(producer.nama_opd);
    setSearchProducer(producer.nama_opd);
  };

  // Go back to dataset list
  const handleBackToList = () => {
    setSelectedDataset(null);
  };

  return (
    <div className="dataset-container">
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
          <p><strong>Kode DSSD:</strong> {selectedDataset.kode_dssd}</p> {/* Menambahkan Kode DSSD */}
          <p><strong>Description:</strong> {selectedDataset.description}</p>
          <p><strong>OPD:</strong> {selectedDataset.nama_opd}</p>
          <p><strong>Jenis:</strong> {selectedDataset.jenis_string}</p>
          <p><strong>Kategori:</strong> {selectedDataset.kategori_string}</p>
          <p><strong>Satuan:</strong> {selectedDataset.satuan}</p> {/* Menambahkan Satuan */}
          <a href={selectedDataset.download_url} target="_blank" rel="noopener noreferrer" className="download-link">
            Download Dataset
          </a>
        </div>
      ) : (
        <div className="dataset-layout">
          <div className="filter-box">
            <h3>Produsen Dataset</h3>
            <input
              type="text"
              value={searchProducer}
              onChange={handleProducerSearch}
              placeholder="Cari produsen..."
              className="producer-search"
            />
            <div className="producer-columns">
              {filteredProducers.map((producer) => (
                <div
                  key={producer.id}
                  className="producer-column"
                  onClick={() => handleProducerClick(producer)}
                >
                  <span>{producer.nama_opd}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dataset-list">
            <h2>Dataset List</h2>
            <ul>
  {filteredDatasets.map((dataset) => (
    <li
      key={dataset.id}
      className="dataset-item"
      onClick={() => handleItemClick(dataset.id)}
    >
      <img src="/data.png" alt="Data Icon" className="data-icon" />
      <div className="dataset-details">
        <h3>{dataset.uraian_dssd}</h3>
        <p className="dataset-description">{dataset.description}</p>
        <p className="dataset-meta">
          <span className="opd"><strong>OPD:</strong> {dataset.nama_opd}</span>
          <span className="modified">
            <strong>Modified:</strong> {new Date(dataset.modified).toLocaleString()} 
            {' '}({calculateDaysAgo(dataset.modified)} days ago)
          </span>
        </p>
      </div>
    </li>
  ))}
</ul>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dataset;
