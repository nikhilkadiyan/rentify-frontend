import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [token, setToken] = useState("");
  const [propertyList, setPropertyList] = useState([]);

  const getPropertyList = async () => {
    const response = await axios.get(`${url}/api/seller/propertylist`, {
      headers: {
        token: `${token}`,
      },
    });
    console.log(response.data.properties);
    if (response.data.success) {
      setPropertyList(response.data.properties);
    }
  };

  const contextValue = {
    url,
    token,
    setToken,
    propertyList,
    getPropertyList,
  };

  useEffect(() => {
    async function startingApp() {
      if (localStorage.getItem("rentifytoken")) {
        setToken(localStorage.getItem("rentifytoken"));
      }
      console.log(token);
    }
    startingApp();
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
