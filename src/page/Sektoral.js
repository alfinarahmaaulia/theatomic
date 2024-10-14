import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./Sektoral.css";

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [DariTahun, setDariTahun] = useState("");
  const [SampaiTahun, setSampaiTahun] = useState("");
  const [selectedOPD, setSelectedOPD] = useState(null);
  const [selectedUrusan, setSelectedUrusan] = useState("");
  const [dataHasil, setDataHasil] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Menampilkan 20 item per halaman
  const [totalPages, setTotalPages] = useState(0); // Menyimpan total halaman dari API

  useEffect(() => {
    const fetchDataOPD = async () => {
      try {
        const response = await axios.get("http://116.206.212.234:4000/list-opd");
        const uniqueOPDs = Array.from(
          new Map(response.data.map(item => [item.id_opd, item])).values()
        );
        setDataOPD(uniqueOPDs);
      } catch (error) {
        setError("Gagal mengambil data OPD.");
      } finally {
        setLoading(false);
      }
    };
    fetchDataOPD();
  }, []);

  const handleOPDChange = async (selectedOption) => {
    setSelectedOPD(selectedOption);
    setSelectedUrusan("");
    setLoading(true);

    if (selectedOption) {
      try {
        const response = await axios.get(
          `http://116.206.212.234:4000/data-sektoral/list-urusan-by-id-opd?id_user_opd=${selectedOption.value}`
        );
        setDataUrusan(response.data);
        setError(null);
      } catch (error) {
        setError("Gagal mengambil data urusan.");
      } finally {
        setLoading(false);
      }
    } else {
      setDataUrusan([]);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    // Validasi input
    if (!DariTahun || !SampaiTahun || !selectedOPD || !selectedUrusan) {
      setError("Semua field harus diisi.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Panggil API dengan parameter yang tepat
      const response = await axios.get("http://116.206.212.234:4000/data-sektoral", {
        params: {
          id_user_opd: selectedOPD.value, // Pastikan untuk menggunakan value dari selectedOPD
          kode_urusan: selectedUrusan,
          dari_tahun: DariTahun,
          sampai_tahun: SampaiTahun,
          page: currentPage,
          per_page: itemsPerPage,
        },
      });
  
      // Cek status respons
      if (response.status === 200) {
        const hasil = response.data.items || []; // Pastikan kunci sesuai dengan yang dikembalikan oleh API
        setDataHasil(hasil);
  
        // Cek jika tidak ada data
        if (hasil.length === 0) {
          setError("Tidak ada data yang ditemukan.");
        } else {
          setShowResults(true);
          setError(null);
        }
      } else {
        setError("Gagal mengambil data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      handleSearch(); // Panggil kembali search saat ganti halaman
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      handleSearch(); // Panggil kembali search saat ganti halaman
    }
  };

  const opdOptions = opds.map(opd => ({
    value: opd.id_opd,
    label: opd.nama_opd
  }));

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Cari Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
          {/* Dropdown OPD menggunakan react-select */}
          <Select
            options={opdOptions}
            value={selectedOPD}
            onChange={handleOPDChange}
            isClearable
            placeholder="Pilih OPD"
            className="react-select-container"
            classNamePrefix="react-select"
          />

          <select
            className="sektoral-input"
            value={selectedUrusan}
            onChange={(e) => setSelectedUrusan(e.target.value)}
            disabled={!selectedOPD}
          >
            <option value="">Pilih Urusan</option>
            {urusans.map((Urusan) => (
              <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>
                {Urusan.nama_urusan}
              </option>
            ))}
          </select>

          <input
            className="sektoral-input"
            type="number"
            placeholder="Dari Tahun"
            value={DariTahun}
            onChange={(e) => setDariTahun(e.target.value)}
            required
          />
          <input
            className="sektoral-input"
            type="number"
            placeholder="Sampai Tahun"
            value={SampaiTahun}
            onChange={(e) => setSampaiTahun(e.target.value)}
            required
          />
          <button className="sektoral-button" type="submit">
            <i className="fas fa-search" style={{ marginRight: "0px" }}></i>
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          showResults && (
            <div className="result-table table-striped">
              <table>
                <thead>
                  <tr>
                    <th>Uraian</th>
                    <th>Satuan</th>
                    <th>Jenis</th>
                    <th>Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHasil.length > 0 ? (
                    dataHasil.map((item, index) => (
                      <tr key={index}>
                        <td>{item.uraian_dssd}</td>
                        <td>{item.satuan}</td>
                        <td>{item.jenis_string}</td>
                        <td>{item.kategori_string}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Tidak ada data yang ditemukan</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  className="pagination-button prev-button"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>

                <span className="pagination-text">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="pagination-button next-button"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sektoral;
