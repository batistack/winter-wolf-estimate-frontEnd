import React, { useState, useEffect } from "react";
import { fetchAllItems } from "../helpers/ApiCalls";
import {
  FinalEstimateContainer,
  EstimateHeader,
  EstimateBlock,
  EstimateParagraph,
  HighlightText,
  StyledLink
} from "../style/FinalEstimateStyled";
import { Link } from "react-router-dom";
function Finalestimate() {
  const [finalEstimates, setFinalEstimates] = useState([]);
  const endPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allFinalEstimates = await fetchAllItems(endPoint);
        if (allFinalEstimates.success) {
          console.log(allFinalEstimates, "here final estimates");
          setFinalEstimates(allFinalEstimates.payload);
        } else {
          console.error("Error fetching final estimates", allFinalEstimates);
        }
      } catch (err) {
        console.error("Error fetching final estimates", err);
      }
    };
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <StyledLink to={`/oneEstimate/:id`}>

    <FinalEstimateContainer>
      <EstimateHeader>Estimated Already Created</EstimateHeader>
      {finalEstimates.map((finalEstimate, index) => (
        <EstimateBlock key={index}>
          <EstimateParagraph>
            On{" "}
            <HighlightText>
              {formatDate(finalEstimate.created_at)}
            </HighlightText>{" "}
            a project estimate was generated with a labor cost of{" "}
            <HighlightText>${finalEstimate.labor_cost}</HighlightText>,
            equipment cost of{" "}
            <HighlightText>${finalEstimate.equipment_cost}</HighlightText>, and
            accessories cost of{" "}
            <HighlightText>${finalEstimate.accessories_cost}</HighlightText>,
            resulting in a subtotal of{" "}
            <HighlightText>${finalEstimate.subtotal}</HighlightText>. After
            applying a tax of (8.875%){" "}
            <HighlightText>${finalEstimate.tax}</HighlightText>, the total cost
            amounted is{" "}
            <HighlightText>${finalEstimate.total_cost}</HighlightText>. The
            final total, when divided into installments, was calculated as{" "}
            <HighlightText>${finalEstimate.final_total_divided}</HighlightText>.
          </EstimateParagraph>
        </EstimateBlock>
      ))}
    </FinalEstimateContainer>
    </StyledLink>
  );
}

export default Finalestimate;
