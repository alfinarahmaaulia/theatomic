import React, { useEffect, useState } from 'react';
import './DigitalBookList.css'; // Impor CSS
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

// Set workerSrc untuk pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`; // Versi PDF.js worker

// Komponen untuk menampilkan daftar buku digital dan detailnya
const DigitalBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://116.206.212.234:4000/buku-digital');
        console.log(response.data); // Tambahkan ini untuk melihat data dari API
        if (response.data) {
          setBooks(response.data);
        } else {
          setError('Data tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data buku digital. Coba lagi.');
      } finally {
        setLoading(false);
      }
    };    
    fetchData();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleDetailClick = (book) => {
    setSelectedBook(book);
    setPageNumber(1); // Reset page number ketika buku dipilih
  };

  // Fungsi untuk membuka PDF di tab baru
  const openPDF = (filePath) => {
    const fullUrl = `http://116.206.212.234:4000${filePath.replace("handler/http", "")}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div className="book-list">
      <h2>Daftar Buku Digital</h2>
      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id_buku_digital}>
              <h3>{book.buku}</h3>
              <p>Tahun: {book.tahun}</p>
              <p>OPD: {book.nama_opd}</p>
             
              {/* Tombol untuk membuka PDF langsung */}
              <button className="open-pdf-button" onClick={() => openPDF(book.file)}>
                Detail
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedBook && selectedBook.file && (
        <div className="pdf-preview">
          <h3>Pratinjau Buku: {selectedBook.buku}</h3>
          <button onClick={() => setSelectedBook(null)}>Tutup</button>
          <Document
              file={`http://116.206.212.234:4000${selectedBook.file.replace("handler/http", "")}`}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => {
                console.error("Error loading document:", error);
                setError("Gagal memuat dokumen.");
              }}
            >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Halaman {pageNumber} dari {numPages}</p>
          <div className="pdf-controls">
            <button
              onClick={() => setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1)}
              disabled={pageNumber === 1}
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setPageNumber(pageNumber < numPages ? pageNumber + 1 : numPages)}
              disabled={pageNumber === numPages}
            >
              Berikutnya
            </button>
          </div>
          <a 
            href={`http://116.206.212.234:4000/${encodeURIComponent(selectedBook.file.replace("handler/http", ""))}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="download-button">Download PDF</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default DigitalBookList;
