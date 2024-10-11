// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   AccesoryWrapper,
//   AccesoryItem,
//   AccesoryTitle,
//   AccesoryDescription,
//   AccesoryPrice,
//   AddToEstimateButton,
//   StyledButton,
// } from "../style/EquipmentsAndAccesoryStyled";
// import { fetchAllItems } from "../helpers/ApiCalls";

// function Accessories() {
//   const [accessories, setAccessories] = useState([]);
//   const [selectedAccessories, setSelectedAccessories] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [alertMessage, setAlertMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const endPoint = import.meta.env.VITE_ACCESORIES_ENDPOINT;

//   // Safeguard to prevent accessing null state
//   const floorIndex = location.state?.floorIndex;
//   const roomIndex = location.state?.roomIndex;
//   const room = location.state?.room;

//   useEffect(() => {
//     if (floorIndex === undefined || roomIndex === undefined) {
//       console.error("Missing floor or room index. Redirecting to estimate.");
//       navigate("/semi_estimate"); 
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const allAccessories = await fetchAllItems(endPoint);
//         if (allAccessories.success) {
//           setAccessories(allAccessories.payload);
//           const initialQuantities = {};
//           allAccessories.payload.forEach((acc) => {
//             initialQuantities[acc.id] = 1; // Initialize quantities
//           });
//           setQuantities(initialQuantities);
//         } else {
//           console.error("Error fetching accessories");
//         }
//       } catch (err) {
//         console.error("Error fetching accessories", err);
//       }
//     };
//     fetchData();
//   }, [endPoint, floorIndex, roomIndex, navigate]);

//   const handleAddToEstimate = (accessoryId) => {
//     const quantity = quantities[accessoryId];
//     const accessory = accessories.find((acc) => acc.id === accessoryId);
//     const existingAccessory = selectedAccessories.find(
//       (acc) => acc.id === accessoryId
//     );
//     if (existingAccessory) {
//       existingAccessory.quantity += quantity;
//     } else {
//       setSelectedAccessories((prev) => [
//         ...prev,
//         { ...accessory, quantity },
//       ]);
//     }
//     setAlertMessage(`${quantity} ${accessory.name} added to estimate`);
//     setTimeout(() => setAlertMessage(""), 2000);
//   };

//   const handleQuantityChange = (accessoryId, quantity) => {
//     setQuantities((prev) => ({ ...prev, [accessoryId]: quantity }));
//   };

//   const handleBackToEstimate = () => {
//     navigate("/semi_estimate", {
//       state: {
//         selectedAccessories,
//         floorIndex,
//         roomIndex,
//       },
//     });
//   };

//   return (
//     <AccesoryWrapper>
//       <h3>Select Accessories for {room?.roomName || "Room"}</h3>
//       {alertMessage && <p style={{ color: "blue" }}>{alertMessage}</p>}
//       {accessories.map((accessory) => (
//         <AccesoryItem key={accessory.id}>
//           <AccesoryTitle>{accessory.name}</AccesoryTitle>
//           <AccesoryDescription>{accessory.description}</AccesoryDescription>
//           <AccesoryPrice>${accessory.price}</AccesoryPrice>
//           <input
//             type="number"
//             min="1"
//             value={quantities[accessory.id]}
//             onChange={(e) =>
//               handleQuantityChange(accessory.id, Number(e.target.value))
//             }
//           />
//           <AddToEstimateButton
//             onClick={() => handleAddToEstimate(accessory.id)}
//           >
//             Add to Estimate
//           </AddToEstimateButton>
//         </AccesoryItem>
//       ))}
//       <StyledButton onClick={handleBackToEstimate}>Back to Estimate</StyledButton>
//     </AccesoryWrapper>
//   );
// }

// export default Accessories;