import React, { useEffect, useState } from "react";
import { fetchAllItems } from "../helpers/ApiCalls";
import { StyledLink } from "../style/FinalEstimateStyled";
import {
  EstimateContainer,
  Title,
  ClientInfo,
  ClientInfoTitle,
  ClientDetail,
  CostDetail,
  NoEstimateMessage,
  EstimateListContainer,
  EstimateBox,
  SearchBar,
  SearchOptions,
} from "../style/EstimateStyled";

function Estimates({ formatDateTime }) {
  const [estimates, setEstimates] = useState([]);
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name"); 
  const estimateEndPoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const finalEstimateEndPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [estimateResponse, finalEstimateResponse] = await Promise.all([
          fetchAllItems(estimateEndPoint),
          fetchAllItems(finalEstimateEndPoint),
        ]);

        if (estimateResponse.success && finalEstimateResponse.success) {
          const estimateData = estimateResponse.payload;
          const finalEstimateData = finalEstimateResponse.payload;

          const mergedEstimates = estimateData.map((estimateItem) => {
            const finalEstimate = finalEstimateData.find(
              (finalItem) => finalItem.estimate_id === estimateItem.id
            );
            return {
              ...estimateItem,
              finalEstimate,
            };
          });

          setEstimates(mergedEstimates);
          setFilteredEstimates(mergedEstimates); // Initialize filtered estimates with all data
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [estimateEndPoint, finalEstimateEndPoint]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    let filtered = [];
    if (searchBy === "id") {
      filtered = estimates.filter((estimate) =>
        estimate.id.toString().includes(e.target.value)
      );
    } else if (searchBy === "name") {
      filtered = estimates.filter((estimate) =>
        estimate.client_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    }

    setFilteredEstimates(filtered);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <EstimateContainer>
      <Title>Estimate Details and Costs</Title>

      {/* Search Bar */}
      <SearchBar>
        <input
          type="text"
          placeholder={`Search Estimate by ${
            searchBy === "id" ? "Estimate ID" : "Client Name"
          }`}
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchBar>
      <SearchOptions>
        <label>
          <input
            type="radio"
            name="searchBy"
            value="name"
            checked={searchBy === "name"}
            onChange={handleSearchByChange}
          />
          Search by Client Name
        <label>
          <input
            type="radio"
            name="searchBy"
            value="id"
            checked={searchBy === "id"}
            onChange={handleSearchByChange}
          />
          Search by Estimate ID
        </label>
        </label>
      </SearchOptions>

      <EstimateListContainer>
        {filteredEstimates.length > 0 ? (
          filteredEstimates.map((estimateItem, index) => (
            <EstimateBox key={index}>
              <StyledLink to={`/oneEstimate/${estimateItem.id}`}>
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
              </StyledLink>
              <CostDetail>
                <strong>Investment Cost:</strong> $
                {estimateItem.finalEstimate.total_cost}
              </CostDetail>
              <ClientDetail>
                <strong>Created On:</strong>{" "}
                {formatDateTime(estimateItem.created_at)}
              </ClientDetail>
            </EstimateBox>
          ))
        ) : (
          <NoEstimateMessage>No estimates available</NoEstimateMessage>
        )}
      </EstimateListContainer>
    </EstimateContainer>
  );
}

export default Estimates;
