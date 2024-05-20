import React, { useContext } from "react";
import "./PropertyCard.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const PropertyCard = ({ property }) => {
  const { url, getPropertyList } = useContext(StoreContext);

  const deleteProperty = async (id) => {
    const response = await axios.delete(`${url}/api/seller/${id}`);
    if (response.data.success) {
      toast(response.data.message);
      getPropertyList();
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="property-card">
      <h3>Property Information</h3>
      <p>
        <strong>State:</strong> {property.state}
      </p>
      <p>
        <strong>District:</strong> {property.district}
      </p>
      <p>
        <strong>Pincode:</strong> {property.pincode}
      </p>
      <p>
        <strong>Address:</strong> {property.address}
      </p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms}
      </p>
      <p>
        <strong>Bathrooms:</strong> {property.bathrooms}
      </p>
      <p>
        <strong>Hospitals:</strong> {property.hospitals}
      </p>
      <p>
        <strong>Colleges:</strong> {property.colleges}
      </p>
      <p>
        <strong>Schools:</strong> {property.schools}
      </p>
      <button
        style={{
          backgroundColor: "#E59BE9",
          border: "none",
          padding: "5px",
          marginBottom: "5px",
          borderRadius: "5px",
          fontSize: "1rem",
        }}
      >
        Edit
      </button>
      <button
        onClick={() => deleteProperty(property._id)}
        style={{
          backgroundColor: "#C40C0C",
          border: "none",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "1rem",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default PropertyCard;
