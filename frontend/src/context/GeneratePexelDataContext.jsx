import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GeneratePexelDataContext = createContext();

export const GeneratePexelDataProvider = ({ children }) => {
	const [pexelData, setPexelData] = useState([]);
	const query = "Yoga Excercises";
	const apiUrl = `https://api.pexels.com/videos/search?query=${query}&orientation=landscape`;

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
