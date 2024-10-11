// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchAllItems } from "../helpers/ApiCalls";
// import {
//   AccesoryWrapper,
//   AccesoryItem,
//   EquipmentWrapper,
//   EquipmentItem,
//   StyledButton,
//   DisplaySquare,
// } from "../style/EquipmentsAndAccesoryStyled"; 

// function AccesoriesAndEquipments() {
//   const navigate = useNavigate();
//   const [equipments, setEquipments] = useState([]);
//   const [accessories, setAccessories] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({
//     equipment: [],
//     accessories: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const [equipmentsResponse, accessoriesResponse] = await Promise.all([
//         fetchAllItems(import.meta.env.VITE_EQUIPMENTS_ENDPOINT),
//         fetchAllItems(import.meta.env.VITE_ACCESORIES_ENDPOINT),
//       ]);
//       setEquipments(equipmentsResponse.payload);
//       setAccessories(accessoriesResponse.payload);
//     };
//     fetchData();
//   }, []);

//   const handleSelectItem = (type, id, name, price) => {
//     setSelectedItems((prevState) => {
//       const updatedItems = [...prevState[type]];
//       const existingItem = updatedItems.find((item) => item.id === id);
//       if (!existingItem) {
//         updatedItems.push({ id, name, price });
//       }
//       return { ...prevState, [type]: updatedItems };
//     });
//   };

//   const handleAddToEstimate = () => {
//     const params = new URLSearchParams({
//       equipments: JSON.stringify(selectedItems.equipment),
//       accessories: JSON.stringify(selectedItems.accessories),
//     });
//     navigate(`/semi_estimate?${params.toString()}`);
//   };

//   return (
//     <div>
//       <EquipmentWrapper>
//         <h3>Equipments</h3>
//         <div className="equipment-grid">
//           {equipments.map((equipment) => (
//             <EquipmentItem key={equipment.id}>
//               <div>
//                 <h4>{equipment.name}</h4>
//                 <p><strong>Model:</strong> {equipment.model_number}</p>
//                 <p><strong>Brand:</strong> {equipment.brand}</p>
//                 <p><strong>Description:</strong> {equipment.description}</p>
//                 <p><strong>Price:</strong> ${equipment.price}</p>
//               </div>
//               <StyledButton
//                 onClick={() => handleSelectItem("equipment", equipment.id, equipment.name, equipment.price)}
//               >
//                 Add to Estimate
//               </StyledButton>
//             </EquipmentItem>
//           ))}
//         </div>
//       </EquipmentWrapper>

//       <AccesoryWrapper>
//         <h3>Accessories</h3>
//         <div className="accessory-grid">
//           {accessories.map((accessory) => (
//             <AccesoryItem key={accessory.id}>
//               <div>
//                 <h4>{accessory.name}</h4>
//                 <p><strong>Description:</strong> {accessory.description}</p>
//                 <p><strong>Price:</strong> ${accessory.price}</p>
//               </div>
//               <StyledButton
//                 onClick={() => handleSelectItem("accessories", accessory.id, accessory.name, accessory.price)}
//               >
//                 Add to Estimate
//               </StyledButton>
//             </AccesoryItem>
//           ))}
//         </div>
//       </AccesoryWrapper>

//       <DisplaySquare>
//         <h3>Summary of Selected Items:</h3>
//         <ul>
//           {selectedItems.equipment.map((item) => (
//             <li key={item.id}>
//               {item.name} - ${item.price}
//             </li>
//           ))}
//           {selectedItems.accessories.map((item) => (
//             <li key={item.id}>
//               {item.name} - ${item.price}
//             </li>
//           ))}
//         </ul>
//       </DisplaySquare>

//       <StyledButton onClick={handleAddToEstimate}>Add to Estimate</StyledButton>
//     </div>
//   );
// }

// export default AccesoriesAndEquipments;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllItems } from "../helpers/ApiCalls";
import {
  AccesoryWrapper,
  AccesoryItem,
  EquipmentWrapper,
  EquipmentItem,
  StyledButton,
  DisplaySquare,
} from "../style/EquipmentsAndAccesoryStyled"; 

function AccesoriesAndEquipments() {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    equipment: [],
    accessories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [equipmentsResponse, accessoriesResponse] = await Promise.all([
        fetchAllItems(import.meta.env.VITE_EQUIPMENTS_ENDPOINT),
        fetchAllItems(import.meta.env.VITE_ACCESORIES_ENDPOINT),
      ]);
      setEquipments(equipmentsResponse.payload);
      setAccessories(accessoriesResponse.payload);
    };
    fetchData();
  }, []);

  const handleSelectItem = (type, id, name, price) => {
    setSelectedItems((prevState) => {
      const updatedItems = [...prevState[type]];
      const existingItem = updatedItems.find((item) => item.id === id);
      if (!existingItem) {
        updatedItems.push({ id, name, price });
      }
      return { ...prevState, [type]: updatedItems };
    });
  };

  const handleAddToEstimate = () => {
    const params = new URLSearchParams({
      equipments: JSON.stringify(selectedItems.equipment),
      accessories: JSON.stringify(selectedItems.accessories),
    });
    navigate(`/semi_estimate?${params.toString()}`);
  };

  return (
    <div>
      <EquipmentWrapper>
        <h3>Equipments</h3>
        <div className="equipment-grid">
          {equipments.map((equipment) => (
            <EquipmentItem key={equipment.id}>
              <div>
                <h4>{equipment.name}</h4>
                <p><strong>Model:</strong> {equipment.model_number}</p>
                <p><strong>Brand:</strong> {equipment.brand}</p>
                <p><strong>Description:</strong> {equipment.description}</p>
                <p><strong>Price:</strong> ${equipment.price}</p>
              </div>
              <StyledButton
                onClick={() => handleSelectItem("equipment", equipment.id, equipment.name, equipment.price)}
              >
                Add to Estimate
              </StyledButton>
            </EquipmentItem>
          ))}
        </div>
      </EquipmentWrapper>

      <AccesoryWrapper>
        <h3>Accessories</h3>
        <div className="accessory-grid">
          {accessories.map((accessory) => (
            <AccesoryItem key={accessory.id}>
              <div>
                <h4>{accessory.name}</h4>
                <p><strong>Description:</strong> {accessory.description}</p>
                <p><strong>Price:</strong> ${accessory.price}</p>
              </div>
              <StyledButton
                onClick={() => handleSelectItem("accessories", accessory.id, accessory.name, accessory.price)}
              >
                Add to Estimate
              </StyledButton>
            </AccesoryItem>
          ))}
        </div>
      </AccesoryWrapper>

      <DisplaySquare>
        <h3>Summary of Selected Items:</h3>
        <ul>
          {selectedItems.equipment.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
          {selectedItems.accessories.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </DisplaySquare>

      <StyledButton onClick={handleAddToEstimate}>Add to Estimate</StyledButton>
    </div>
  );
}

export default AccesoriesAndEquipments;
