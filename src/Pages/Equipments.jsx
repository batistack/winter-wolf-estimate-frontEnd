// import React, { useEffect, useState } from "react";
// import { fetchAllItems } from "../helpers/ApiCalls";
// import {
//   EquipmentWrapper,
//   EquipmentItem,
//   EquipmentTitle,
//   EquipmentBrand,
//   EquipmentModel,
//   EquipmentDescription,
//   EquipmentPrice,
// } from "../style/EquipmentStyted"
// function Equipments() {
//   const [equipments, setEquipments] = useState([]);
//   const endPoint = import.meta.env.VITE_EQUIPMENTS_ENDPOINT;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allEquipments = await fetchAllItems(endPoint);
//         if (allEquipments.success) {
//           setEquipments(allEquipments.payload);
//         } else {
//           console.error("error fetching equipments");
//         }
//       } catch (err) {
//         console.error("error fetchind data", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <EquipmentWrapper>
//       <h3>Equipments</h3>
//       {equipments.map((equipment, index) => (
//         <EquipmentItem key={index}>
//           <EquipmentBrand>BRAND: {equipment.brand}</EquipmentBrand>
//           <EquipmentTitle>NAME: {equipment.name}</EquipmentTitle>
//           <EquipmentModel>MODEL NUMBER: {equipment.model_number}</EquipmentModel>
//           <EquipmentDescription>{equipment.description}</EquipmentDescription>
//           <EquipmentPrice>PRICE: ${equipment.price}</EquipmentPrice>
//         </EquipmentItem>
//       ))}
//     </EquipmentWrapper>
//   );
// }

// export default Equipments;

