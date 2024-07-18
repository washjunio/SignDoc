import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import SignatureCanvas from 'react-signature-canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; 

const ContractPage = () => {
  const location = useLocation();
  const { documentHtml } = location.state || {};

  const [modalOpen, setModalOpen] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [htmlContent, setHtmlContent] = useState(documentHtml);
  const [mobileView, setMobileView] = useState(false);
  const sigCanvas = useRef(null);

  useEffect(() => {
    setHtmlContent(documentHtml);
  }, [documentHtml]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleOpenSignatureModal = () => {
    setModalOpen(true);
  };

  const handleCloseSignatureModal = () => {
    setModalOpen(false);
  };

  const handleSignatureSave = () => {
    const signatureImg = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const updatedHtml = htmlContent.replace(/{{lesseeSignature}}/g, `<img src="${signatureImg}" alt="Signature" style="width: 100px; height: auto;" />`);
    
    setHtmlContent(updatedHtml);
    setSignatureSaved(true);
    setModalOpen(false);
  };

  const handleDownloadPDF = () => {
    if (!htmlContent) return;

    const opt = {
      margin: 0.5,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { avoid: 'tr' },
    };

    html2pdf().from(document.getElementById('document-preview')).set(opt).save();
  };

  const handleCheckboxChange = (e) => {
    setMobileView(e.target.checked);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className={`contract-page container ${mobileView ? 'mobile-view' : ''}`} style={{ width: mobileView ? '800px' : '100%' }}>
      <div id="document-preview" className="document-preview" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleDownloadPDF} disabled={!signatureSaved}>Download PDF</button>
        {!signatureSaved ? (
          <button className="btn btn-secondary me-2" onClick={handleOpenSignatureModal}>Sign</button>
        ) : (
          <button className="btn btn-warning me-2" onClick={handleReset}>Reset</button>
        )}
        <label>
          <input type="checkbox" className="form-check-input me-1" checked={mobileView} onChange={handleCheckboxChange} />
          Page View
        </label>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseSignatureModal}></button>
            </div>
            <div className="modal-body">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ className: 'sigCanvas w-100' }}
              />
            </div>
            <div className="modal-footer d-flex justify-content-start">
              <button type="button" className="btn btn-secondary me-auto" onClick={handleCloseSignatureModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSignatureSave}>Save Signature</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractPage;
