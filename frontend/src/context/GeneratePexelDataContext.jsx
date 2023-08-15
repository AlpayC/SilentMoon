import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GeneratePexelDataContext = createContext();

export const GeneratePexelDataProvider = ({ children }) => {
  const [pexelData, setPexelData] = useState([]);
  const query = "yoga exercise";
  //   const apiUrl2 = `https://api.pexels.com/videos/search?query=${query}&orientation=landscape`;
  const apiKey = import.meta.env.VITE_PIXABAY_API;
  const apiUrl =
    `http://pixabay.com/api/videos/?key=${apiKey}&q=` +
    encodeURIComponent(query);

  useEffect(() => {
    const fetchPexelData = async () => {
      try {
        const { data } = await axios.get(apiUrl);
        setPexelData(data);
      } catch (error) {
        console.error("Error fetching Pexels data:", error);
      }
    };
    fetchPexelData();
  }, []);

  return (
    <GeneratePexelDataContext.Provider value={{ pexelData, setPexelData }}>
      {children}
    </GeneratePexelDataContext.Provider>
  );
};
