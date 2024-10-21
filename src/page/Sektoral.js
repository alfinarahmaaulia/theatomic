import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import React Select
import "./Sektoral.css";

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [DariTahun, setDariTahun] = useState("");
  const [SampaiTahun, setSampaiTahun] = useState("");
  const [selectedOPD, setSelectedOPD] = useState(null); // Ubah ke null untuk React Select
  const [selectedUrusan, setSelectedUrusan] = useState("");
  const [dataHasil, setDataHasil] = useState([]);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // jumlah item per halaman
  const [totalData, setTotalData] = useState(0);

  // Ambil data OPD saat komponen di-mount
  useEffect(() => {
    const fetchDataOPD = async () => {
      try {
        const response = await axios.get("http://116.206.212.234:4000/list-opd");
        const formattedOPDs = response.data.map((opd) => ({
          value: opd.id_opd,
          label: opd.nama_opd,
        }));
        setDataOPD(formattedOPDs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataOPD();
  }, [currentPage]);

  // Mengambil data urusan berdasarkan OPD yang dipilih
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
// Fungsi untuk menangani pencarian data
const handleSearch = async (e) => {
  if (e) {
    e.preventDefault(); // hanya memanggil preventDefault jika ada event
  }

  setLoading(true);
  setCurrentPage(1); // Reset ke halaman 1 ketika pencarian baru dilakukan

  try {
    const response = await axios.get("http://116.206.212.234:4000/data-sektoral", {
      params: {
        id_user_opd: selectedOPD ? selectedOPD.value : "",
        kode_urusan: selectedUrusan,
        dari_tahun: DariTahun,
        sampai_tahun: SampaiTahun,
        page: 1, // Pastikan page dikirim sebagai halaman pertama
        per_page: itemsPerPage, // Sesuaikan dengan parameter API
      },
    });

    // Log response to check the result
    console.log("API Response:", response);

    setDataHasil(response.data);

    // Cek apakah API mengembalikan header x-pagination-total-count
    const totalItems = response.headers["x-pagination-total-count"];
    setTotalData(totalItems ? parseInt(totalItems, 10) : 0); // Set total data jika header tersedia

    setError(null);
  } catch (error) {
    setError("Terjadi kesalahan saat mengambil data.");
    console.log("API Error:", error); // Log error for debugging
  } finally {
    setLoading(false);
  }
};


  // Hitung total halaman
  const totalPages = Math.ceil(totalData / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Cek batasan halaman
    setCurrentPage(pageNumber);
  };

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Cari Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
          {/* Menggunakan React Select */}
          <Select
            options={opds}
            className="sektoral-input react-select-container"
            classNamePrefix="react-select" // Menambahkan prefix untuk gaya default react-select
            value={selectedOPD}
            onChange={handleOPDChange}
            placeholder="Pilih OPD"
            isClearable
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
            <i className="fas fa-search" style={{ marginRight: "6px" }}></i>
            Cari
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
  <p>Loading...</p>
) : (
  <div className="result-table table-striped">
    {/* Menampilkan total halaman di sebelah kiri dan total data di sebelah kanan */}
    <div className="data-info-container">
      <div style={{ textAlign: "left" }}>
        <p>Total Halaman: {totalPages}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p>Total Data: {totalData}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>No</th>
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
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{item.uraian_dssd}</td>
              <td>{item.satuan}</td>
              <td>{item.jenis_string}</td>
              <td>{item.kategori_string}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              Tidak ada data yang tersedia
            </td>
          </tr>
        )}
      </tbody>
    </table>
    
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <p>Page {currentPage} of {totalPages}</p>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || dataHasil.length === 0}
      >
        Next
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Sektoral;
