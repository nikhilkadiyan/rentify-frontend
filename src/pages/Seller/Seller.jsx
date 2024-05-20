import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./Seller.css";
import PropertyList from "./PropertyList";

const Seller = () => {
  const { url, token, setToken, propertyList, getPropertyList } =
    useContext(StoreContext);

  let states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const [formData, setFormData] = useState({
    state: "Andhra Pradesh",
    district: "",
    pincode: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    hospitals: "",
    colleges: "",
    schools: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${url}/api/seller/addproperty`,
      formData,
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    if (response.data.success) {
      toast("New property added");
      getPropertyList();
      setFormData({
        state: "",
        district: "",
        pincode: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        hospitals: "",
        colleges: "",
        schools: "",
      });
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (localStorage.getItem("rentifytoken")) {
      setToken(localStorage.getItem("rentifytoken"));
    }
    getPropertyList();
  }, [getPropertyList()]);

  return (
    <>
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="state">State : </label>
            <select id="state" name="state" onChange={onChangeHandler} required>
              {states.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={onChangeHandler}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="bedrooms">Number of Bedrooms</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bathrooms">Number of Bathrooms</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hospitals">Nearby Hospitals</label>
            <input
              type="text"
              id="hospitals"
              name="hospitals"
              value={formData.hospitals}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="colleges">Nearby Colleges</label>
            <input
              type="text"
              id="colleges"
              name="colleges"
              value={formData.colleges}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="schools">Nearby Schools</label>
            <input
              type="text"
              id="schools"
              name="schools"
              value={formData.schools}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button className="sellersubmit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      {propertyList && <PropertyList propertyList={propertyList} />}
    </>
  );
};

export default Seller;
