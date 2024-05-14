import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PdfComponent from './PdfComponent';

const PdfContainer = ({displayData}) => {
  const generatePDF = async () => {
    const blob = await pdf(<PdfComponent />);
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <PDFDownloadLink document={<PdfComponent displayData={displayData} />} fileName="document.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download Summary'
      }
    </PDFDownloadLink>
  );
};



export default PdfContainer;
