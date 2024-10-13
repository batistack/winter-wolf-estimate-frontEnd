import styled from "styled-components";

// Colors
const primaryColor = "#182d40";
const secondaryColor = "#ffffff";
const blueColor = "#009bdf";
const darkGrey = "#2e2e2e";
const lightGrey = "#e8e8e8";
const darkText = "#171717";

// Container
export const SemiEstimateContainer = styled.div`
  background-color: ${lightGrey};
  color: ${darkText};
  padding: 2rem;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
export const ScrollableItemList = styled.div`
  max-height: 400px; /* Adjust the height as needed */
  overflow-y: auto; /* Enables vertical scrolling */
  background-color: #f9f9f9; /* Light background for contrast */
  border: 1px solid #ddd; /* Subtle border */
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;

  /* Customize scrollbar for a modern look */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Scrollbar track background */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Scrollbar handle */
    border-radius: 10px; /* Rounded edges */
    border: 2px solid #f1f1f1; /* Padding around handle */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Handle hover effect */
  }
`;


// Title
export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${primaryColor};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Search Container
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

// Search Results
export const SearchResult = styled.li`
  list-style: none;
  padding: 0.5rem;
  margin: 0.3rem 0;
  background-color: ${secondaryColor};
  border: 1px solid ${darkGrey};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${lightGrey};
  }
`;

// Selected Item Container
export const SelectedItemContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${lightGrey};
  border: 1px solid ${darkGrey};
  border-radius: 4px;
`;

export const SelectionButton = styled.button`
  background-color: ${({ $active }) => ($active ? primaryColor: primaryColor)};
  color: ${({ $active }) => ($active ? secondaryColor : 'white')};
  border: 1px solid ${primaryColor};
  padding: 0.6rem 1.2rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: ${primaryColor};
    color: white;
  }
`;

// Add Item Button
export const AddItemButton = styled.button`
  background-color: ${primaryColor};
  color: ${secondaryColor};
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${darkGrey};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Styled Button for Actions
export const StyledButton = styled.button`
  background-color: ${primaryColor};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 2rem;

  &:hover {
    background-color: ${primaryColor};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

// Input Fields
export const TextInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${darkGrey};
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

export const NumberInput = styled.input`
  width: 120px;
  padding: 0.5rem;
  border: 1px solid ${primaryColor};
  border-radius: 4px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 60px;
    padding: 0.4rem;
  }
`;

// Generate PDF Button
// export const GeneratePDFButton = styled.button`
//   background-color: ${blueColor};
//   color: ${secondaryColor};
//   border: none;
//   padding: 0.8rem 1.5rem;
//   font-size: 1rem;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   margin-top: 2rem;

//   &:hover {
//     background-color: ${darkGrey};
//   }

//   @media (max-width: 768px) {
//     padding: 0.6rem 1.2rem;
//     font-size: 0.9rem;
//   }
// `;
export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// Summary Section
export const SummarySection = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid ${darkGrey};
  border-radius: 4px;
  background-color: ${secondaryColor};

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;


export const ItemListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const ItemButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  flex: 1 0 21%; /* Adjust the percentage to control the number of items per row */
  text-align: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// Summary Table
export const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
`;

export const TableData = styled.td`
  padding: 12px;
`;

export const SummaryItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const CostBreakdown = styled.div`
  margin-bottom: 20px;
  background-color: #f1f3f5;
  padding: 15px;
  border-radius: 8px;
  h3 {
    font-size: 1.2rem;
    color: #007bff;
  }
`;

export const DisplaySquare = styled.div`
  background-color: ${lightGrey};
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  border: 1px solid ${darkGrey};
  width: 100%;
  max-width: 800px;
`;


// Page Container
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${secondaryColor};
  color: ${darkText};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Section Container
export const SectionContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${lightGrey};
  border-radius: 8px;
  border: 1px solid ${darkGrey};
`;

// Section Title
export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${primaryColor};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Estimate Detail
export const EstimateDetail = styled.div`
  padding: 1rem;
  background-color: ${secondaryColor};
  border-radius: 8px;
  border: 1px solid ${darkGrey};
  margin-bottom: 1rem;
`;

// Estimate Block (for labels and values)
export const EstimateBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

// Label
export const Label = styled.span`
  font-weight: bold;
  color: ${darkText};
`;

// Value
export const Value = styled.span`
  color: ${darkGrey};
`;

// Section Divider (Horizontal line)
export const SectionDivider = styled.hr`
  border: 1px solid ${lightGrey};
  margin: 1rem 0;
`;

// SubTitle (for smaller section titles within a section)
export const SubTitle = styled.h3`
  font-size: 1.5rem;
  color: ${primaryColor};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;




export const EquipmentWrapper = styled.div`
  margin-bottom: 20px;
`;

export const AccesoryWrapper = styled.div`
  margin-bottom: 20px;
`;
