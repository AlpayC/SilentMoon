import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { VideoDataContext } from "../../context/VideoDataContext";
import Logo from "../../components/Logo/Logo";
import { UserDataContext } from "../../context/UserDataContext";
import ExerciseSlider from "../../components/ExerciseSlider/ExerciseSlider";
import RandomHomeCard from "../../components/RandomHomeCard/RandomHomeCard";

const Home = () => {
	const { exerciseData } = useContext(VideoDataContext);
	const { userData } = useContext(UserDataContext);
	console.log(userData);
	const [greeting, setGreeting] = useState("");

	// generate greeting
	let newGreeting = "";

	useEffect(() => {
		const currentHour = new Date().getHours();
		if (currentHour >= 5 && currentHour < 12) {
			newGreeting = "Good morning";
		} else if (currentHour >= 12 && currentHour < 18) {
			newGreeting = "Good afternoon";
		} else {
			newGreeting = "Good night";
		}

		setGreeting(newGreeting);
	}, []);
	// generate greeting end

	useEffect(() => {
		console.log(exerciseData.data);
	}, [exerciseData]);

	return (
		<div className='main-wrapper'>
			<Logo className={"logo-black"} />
			<h2>
				{greeting} {userData} {/* spaeter z.B. userData.name */}
			</h2>
			<p>We hope you have a good day</p>
			<section className='suggestions'>
				<RandomHomeCard data={exerciseData} category={"yoga"} />
			</section>
			{/* Search Bar */}
			<h2>Recomended Yoga for you</h2>
			<ExerciseSlider data={exerciseData} category={"yoga"} />
			<h2>Recomended Meditation for you</h2>
			{/* NavBar */}
		</div>
	);
};

export default Home;
