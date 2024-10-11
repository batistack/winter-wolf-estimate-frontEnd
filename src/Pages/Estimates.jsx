import React, { useEffect, useState } from "react";
import { fetchAllItems } from "../helpers/ApiCalls";
import { jsPDF } from "jspdf";
import { Bar } from "react-chartjs-2";
import {
  EstimateContainer,
  Title,
  ClientInfo,
  ClientInfoTitle,
  ClientDetail,
  JobBreakdown,
  JobTitle,
  StyledButton,
  FloorSection,
  FloorTitle,
  RoomSection,
  RoomTitle,
  ItemList,
  Item,
  CostBreakdown,
  CostTitle,
  CostDetail,
  NoEstimateMessage,
  EstimateListContainer,
  EstimateBox,
} from "../style/EstimateStyled";
import { Link, useParams } from "react-router-dom";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

function Estimates() {
  const [estimates, setEstimates] = useState([]);
  const [chartData, setChartData] = useState({});
  const { id } = useParams();
  const estimateEndPoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const finalEstimateEndPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch estimates and final estimates in parallel
        const [estimateResponse, finalEstimateResponse] = await Promise.all([
          fetchAllItems(estimateEndPoint),
          fetchAllItems(finalEstimateEndPoint),
        ]);

        if (estimateResponse.success && finalEstimateResponse.success) {
          const estimateData = estimateResponse.payload;
          const finalEstimateData = finalEstimateResponse.payload;

          // Merge final estimates with estimates based on estimate_id
          const mergedEstimates = estimateData.map((estimateItem) => {
            const finalEstimate = finalEstimateData.find(
              (finalItem) => finalItem.estimate_id === estimateItem.id
            );
            return {
              ...estimateItem,
              finalEstimate, // Attach the corresponding final estimate to the estimate
            };
          });

          setEstimates(mergedEstimates);

          // Prepare data for the chart
          const labels = mergedEstimates.map(
            (estimate) => estimate.client_name
          );
          const totalCosts = mergedEstimates.map(
            (estimate) => estimate.finalEstimate?.total_cost || 0
          );
          const laborCosts = mergedEstimates.map(
            (estimate) => estimate.finalEstimate?.labor_cost || 0
          );
          const equipmentCosts = mergedEstimates.map(
            (estimate) => estimate.finalEstimate?.equipment_cost || 0
          );
          const materialsCost = mergedEstimates.map(
            (estimate) => estimate.finalEstimate?.accessories_cost
          );
          const createdDates = mergedEstimates.map(
            (estimate) => estimate.created_at.split("T")[0] // Date only (YYYY-MM-DD)
          );

          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Labor Cost",
                data: laborCosts,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "Equipment Cost",
                data: equipmentCosts,
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
              },
              {
                label: "Materials Cost",
                data: materialsCost,
                backgroundColor: "black",
                borderColor: "rgba(000,000,000)",
                borderWidth: 1,
              },
              {
                label: "Total Cost",
                data: totalCosts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
            createdDates: createdDates,
          });
        } else {
          console.error(
            "Error fetching data",
            estimateResponse,
            finalEstimateResponse
          );
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [estimateEndPoint, finalEstimateEndPoint]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Comparative Estimate Costs by Client",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const createdAt = chartData.createdDates[index]; // Access created date
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${datasetLabel}: $${value} (Created: ${createdAt})`;
          },
        },
      },
    },
  };

  const generatePDF = (estimateItem) => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let verticalPosition = 80;

    // Define colors
    const primaryColor = "#182d40"; // Dark blue for headers
    const textColor = "#404040"; // Dark gray for text
    const lightGray = "#f4f4f4"; // Light gray background
    const separatorColor = "#d1d1d1"; // Line separator color

    // Add Branding Elements (Watermark in Background)
    doc.setFontSize(40);
    doc.setTextColor(220, 220, 220); // Very light gray for watermark
    doc.text("Winter Wolf Tech", pageWidth / 4, pageHeight / 2, {
      angle: 45,
      opacity: 0.1,
    });

    // Header Section
    doc.setFillColor(primaryColor); // Dark blue header
    doc.rect(margin, 20, pageWidth - margin * 2, 50, "F");
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

    verticalPosition = 100;
    doc.setLineWidth(1);
    doc.setDrawColor(separatorColor);
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition); // Line separator
    verticalPosition += 30;

    // Client Information Section
    doc.setFillColor(primaryColor); // Background color for section
    doc.rect(margin, verticalPosition - 20, pageWidth - margin * 2, 30, "F");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White for section title
    doc.text("Client Information", margin + 10, verticalPosition);

    verticalPosition += 40;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor); // Dark gray for client details

    // Client details text
    doc.text(
      `Client Name: ${estimateItem.client_name}`,
      margin + 10,
      verticalPosition
    );
    verticalPosition += 15;
    doc.text(
      `Client Address: ${estimateItem.client_address}`,
      margin + 10,
      verticalPosition
    );
    verticalPosition += 15;
    doc.text(
      `Client Phone: ${estimateItem.client_phone}`,
      margin + 10,
      verticalPosition
    );

    verticalPosition += 40;
    doc.setLineWidth(0.5);
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition); // Line separator
    verticalPosition += 30;

    // Job Breakdown Section
    doc.setFillColor(primaryColor); // Background for job breakdown
    doc.rect(margin, verticalPosition - 20, pageWidth - margin * 2, 30, "F");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White text for section title
    doc.text("Job Breakdown", margin + 10, verticalPosition);
    verticalPosition += 40;

    if (estimateItem.details && estimateItem.details.floors) {
      estimateItem.details.floors.forEach((floor) => {
        doc.setFontSize(12);
        doc.setTextColor(primaryColor); // Dark blue for floor titles
        doc.text(`Floor: ${floor.floor_name}`, margin + 10, verticalPosition);
        verticalPosition += 15;

        floor.rooms.forEach((room) => {
          doc.setTextColor(textColor); // Dark gray for room details
          doc.text(`Room: ${room.room_name}`, margin + 20, verticalPosition);
          verticalPosition += 15;

          // Equipment section
          if (room.equipment.length > 0) {
            room.equipment.forEach((equipment) => {
              doc.text(
                `Equipment: ${equipment.name} (x${equipment.quantity})`,
                margin + 40,
                verticalPosition
              );
              verticalPosition += 10;
            });
          }

          // Accessories section
          if (room.accessories.length > 0) {
            room.accessories.forEach((accessory) => {
              doc.text(
                `Accessories: ${accessory.name} (x${accessory.quantity})`,
                margin + 40,
                verticalPosition
              );
              verticalPosition += 10;
            });
          }

          verticalPosition += 20; // Space between rooms
        });
      });
    }

    verticalPosition += 20;
    doc.setLineWidth(0.5);
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition); // Line separator
    verticalPosition += 30;

    // Cost Breakdown Section with lines and styling
    doc.setFillColor(primaryColor); // Background color for cost breakdown title
    doc.rect(margin, verticalPosition - 20, pageWidth - margin * 2, 30, "F");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White for cost breakdown section
    doc.text("Cost Breakdown", margin + 10, verticalPosition);
    verticalPosition += 40;

    // Background for cost breakdown table
    doc.setFillColor(lightGray);
    doc.rect(margin, verticalPosition - 10, pageWidth - margin * 2, 130, "F");

    // Cost Breakdown Table with right alignment
    const labelX = margin + 10;
    const valueX = pageWidth - margin - 100; // Right-align values
    verticalPosition += 5;

    doc.setTextColor(textColor);
    doc.setFontSize(12);
    doc.text("Labor Cost:", labelX, verticalPosition);
    doc.text(
      `$${estimateItem.finalEstimate?.labor_cost || "N/A"}`,
      valueX,
      verticalPosition,
      { align: "right" }
    );
    verticalPosition += 15;

    doc.text("Equipment Cost:", labelX, verticalPosition);
    doc.text(
      `$${estimateItem.finalEstimate?.equipment_cost || "N/A"}`,
      valueX,
      verticalPosition,
      { align: "right" }
    );
    verticalPosition += 15;

    doc.text("Accessories Cost:", labelX, verticalPosition);
    doc.text(
      `$${estimateItem.finalEstimate?.accessories_cost || "N/A"}`,
      valueX,
      verticalPosition,
      { align: "right" }
    );
    verticalPosition += 15;

    doc.text("Subtotal:", labelX, verticalPosition);
    doc.text(
      `$${estimateItem.finalEstimate?.subtotal || "N/A"}`,
      valueX,
      verticalPosition,
      { align: "right" }
    );
    verticalPosition += 15;

    doc.text("Tax:", labelX, verticalPosition);
    doc.text(
      `$${estimateItem.finalEstimate?.tax || "N/A"}`,
      valueX,
      verticalPosition,
      { align: "right" }
    );
    verticalPosition += 15;

    // M/C before Total Cost
    if (estimateItem.market_cap) {
      doc.text("M/C:", labelX, verticalPosition);
      doc.text(`$${estimateItem.market_cap}`, valueX, verticalPosition, {
        align: "right",
      });
      verticalPosition += 15;
    }

    doc.text("Total Cost:", labelX, verticalPosition);
    doc.text(
      `$${estimateItem.finalEstimate?.total_cost || "N/A"}`,
      valueX,
      verticalPosition,
      { align: "right" }
    );

    // Footer Branding with background
    doc.setFillColor(primaryColor);
    doc.rect(0, pageHeight - 60, pageWidth, 40, "F"); // Footer background

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White for footer text
    doc.text(
      "Winter Wolf Tech | Contact: contact@winterwolftech.com",
      margin,
      pageHeight - 30
    );

    // Save the PDF
    doc.save(`Estimate_${estimateItem.id}.pdf`);
  };

  return (
    <EstimateContainer>
      <Title>Estimate Details and Costs</Title>

      <EstimateListContainer>
        {estimates.length > 0 ? (
          estimates.map((estimateItem, index) => (
            <EstimateBox key={index}>
              {/* Client Information */}
              <ClientInfo>
                <ClientInfoTitle>Client Information</ClientInfoTitle>
                <ClientDetail>
                  <strong>Name:</strong> {estimateItem.client_name}
                </ClientDetail>
                <ClientDetail>
                  <strong>Address:</strong> {estimateItem.client_address}
                </ClientDetail>
                <ClientDetail>
                  <strong>Phone:</strong> {estimateItem.client_phone}
                </ClientDetail>
              </ClientInfo>

              <JobBreakdown>
                <JobTitle>Jobs Breakdown</JobTitle>
                {/* Floors, Rooms, Equipment, Accessories */}
                {estimateItem.details &&
                  estimateItem.details.floors &&
                  estimateItem.details.floors.map((floor, floorIndex) => (
                    <FloorSection key={floorIndex}>
                      <FloorTitle>Floor: {floor.floor_name}</FloorTitle>
                      {floor.rooms &&
                        floor.rooms.map((room, roomIndex) => (
                          <RoomSection key={roomIndex}>
                            <RoomTitle>Room: {room.room_name}</RoomTitle>
                            {room.equipment && room.equipment.length > 0 && (
                              <div>
                                <strong>Equipment:</strong>
                                <ItemList>
                                  {room.equipment.map(
                                    (equipment, equipmentIndex) => (
                                      <Item key={equipmentIndex}>
                                        {equipment.name} (x{equipment.quantity})
                                      </Item>
                                    )
                                  )}
                                </ItemList>
                              </div>
                            )}
                            {room.accessories &&
                              room.accessories.length > 0 && (
                                <div>
                                  <strong>Accessories:</strong>
                                  <ItemList>
                                    {room.accessories.map(
                                      (accessory, accessoryIndex) => (
                                        <Item key={accessoryIndex}>
                                          {accessory.name} (x
                                          {accessory.quantity})
                                        </Item>
                                      )
                                    )}
                                  </ItemList>
                                </div>
                              )}
                          </RoomSection>
                        ))}
                    </FloorSection>
                  ))}
              </JobBreakdown>

              {/* Cost Breakdown */}
              <CostBreakdown>
                <CostTitle>Cost Breakdown</CostTitle>
                {estimateItem.finalEstimate ? (
                  <>
                    <CostDetail>
                      <strong>Equipment Cost:</strong> $
                      {estimateItem.finalEstimate.equipment_cost}
                    </CostDetail>
                    <CostDetail>
                      <strong>Accessories Cost:</strong> $
                      {estimateItem.finalEstimate.accessories_cost}
                    </CostDetail>
                    <CostDetail>
                      <strong>Tax:</strong> ${estimateItem.finalEstimate.tax}
                    </CostDetail>
                    <CostDetail>
                      <strong>Labor Cost:</strong> $
                      {estimateItem.finalEstimate.labor_cost}
                    </CostDetail>
                    <CostDetail>
                      <strong>Subtotal:</strong> $
                      {estimateItem.finalEstimate.subtotal}
                    </CostDetail>
                    {estimateItem.market_cap !== null && (
                      <CostDetail>
                        <strong>M/C:</strong> ${estimateItem.market_cap}
                      </CostDetail>
                    )}
                    <CostDetail>
                      <strong>Total Cost:</strong> $
                      {estimateItem.finalEstimate.total_cost}
                    </CostDetail>
                  </>
                ) : (
                  <NoEstimateMessage>
                    No final estimate available for this item
                  </NoEstimateMessage>
                )}
              </CostBreakdown>
              <StyledButton onClick={() => generatePDF(estimateItem)}>
                Create PDF for this Estimate
              </StyledButton>
            </EstimateBox>
          ))
        ) : (
          <NoEstimateMessage>No estimates available</NoEstimateMessage>
        )}
      </EstimateListContainer>
      <div style={{ width: "80%", margin: "0 auto", padding: "20px 0" }}>
        {chartData?.datasets && <Bar data={chartData} options={options} />}
      </div>
    </EstimateContainer>
    
  );
}

export default Estimates;
