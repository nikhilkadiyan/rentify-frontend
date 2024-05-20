import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ propertyList }) => {
  return (
    <div className="property-list">
      {propertyList.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
