import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { PDFContainer,StyledSelect,StyledButtonG } from '../style/PdfGenereStyled'


function PDFGenerator({ estimateItem }) {
  const [selectedType, setSelectedType] = useState("type1");

  // Function to generate Type 1 PDF
  const generatePDFType1 = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 40;
    let verticalPosition = 80
    const primaryColor = "#182d40"
    const textColor = "#404040"
    const lightGray = "#f4f4f4"
    doc.setFontSize(40)
    doc.setTextColor(220, 220 , 220)
    doc.text("Winter Wolf Tech" , pageWidth / 4, pageHeight / 2 , {
        angle: 45,
        opacity: 0.1
    });
    doc.setFillColor(primaryColor)
    doc.rect(margin , 20, pageWidth - margin * 2, 50 , "F")
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White text
    doc.text("Winter Wolf Tech", margin + 20, 50);
    doc.setFontSize(12);
    doc.text(`Estimate NO. ${estimateItem.id}`, pageWidth - margin - 120, 50);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      pageWidth - margin - 120,
      65
    );

    doc.text("Detailed Estimate Report (Type 1)", 20, 20);
    doc.text(`Client Name: ${estimateItem.client_name}`, 20, 40);
   
    doc.save(`Estimate_Type1_${estimateItem.id}.pdf`);
  };

  // Function to generate Type 2 PDF
  const generatePDFType2 = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    doc.text("Summary Estimate Report (Type 2)", 20, 20);
    doc.text(`Client Name: ${estimateItem.client_name}`, 20, 40);
    // Add more summarized content for PDF type 2...
    doc.save(`Estimate_Type2_${estimateItem.id}.pdf`);
  };

  // Function to generate Type 3 PDF
  const generatePDFType3 = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    doc.text("Custom Estimate Report (Type 3)", 20, 20);
    doc.text(`Client Name: ${estimateItem.client_name}`, 20, 40);
    // Add different content for PDF type 3...
    doc.save(`Estimate_Type3_${estimateItem.id}.pdf`);
  };

  // Function to handle PDF generation based on selected type
  const handleGeneratePDF = () => {
    if (selectedType === "type1") {
      generatePDFType1();
    } else if (selectedType === "type2") {
      generatePDFType2();
    } else if (selectedType === "type3") {
      generatePDFType3();
    }
  };

  return (
    <PDFContainer>
    <h3>Select PDF Version</h3>
    <StyledSelect value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
      <option value="type1">Clients Version</option>
      <option value="type2">Shop Version</option>
      <option value="type3"> Complete Version</option>
    </StyledSelect>
    <StyledButtonG onClick={handleGeneratePDF}>Generate PDF</StyledButtonG>
  </PDFContainer>
  );
}

export default PDFGenerator;
