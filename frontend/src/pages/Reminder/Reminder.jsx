import "./Reminder.css";
import { useState } from "react";
import { TimePicker } from "react-ios-time-picker";
import button from "../../components/Button/Button";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context/UserDataContext";
import { useContext } from "react";
import axios from "axios";
import Logo from "../../components/Logo/Logo";

const Reminder = () => {
	const { userData } = useContext(UserDataContext);
	const [timeValue, setTimeValue] = useState("10:00 AM");
	const [selectedDays, setSelectedDays] = useState([
		"sunday",
		"monday",
		"tuesday",
		"friday",
		"saturday",
	]);

	const saveTime = pickedTime => {
		setTimeValue(pickedTime);
	};

	/* 	const saveTime2 = event => {
		const selectedTime = event.target.value;
		setTimeValue(selectedTime);
	}; */

	const handleDayChange = event => {
		const selectedDay = event.target.value;
		if (event.target.checked) {
			// ausgewaehlten Tag zum Array hinzufuegen
			setSelectedDays(prevSelectedDays => [...prevSelectedDays, selectedDay]);
		} else {
			// Tag vom Array entfernen
			setSelectedDays(prevSelectedDays =>
				prevSelectedDays.filter(day => day !== selectedDay),
			);
		}
	};

	console.log(userData);

	const setReminder = async e => {
		e.preventDefault();
		try {
			const id = userData._id;

			//fetch user by ID
			const response = await axios.get(`/api/user/${id}`);
			const fetchedUserData = response.data;

			//udated Data
			const updatedUserData = {
				...fetchedUserData,
				reminderTime: timeValue,
				reminderDays: selectedDays,
			};

			// send updated properties to the backend for update
			await axios.put(`/api/user/${id}`, updatedUserData);

			//navigate to home
			nav("/home");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='main-wrapper reminder'>
			<Logo className={"logo-black"} />
			<h2>What time would you like to meditate?</h2>
			<p>
				Any time you can choose but We recommend first thing in the morning.
			</p>
			<div className='time-picker-div'>
				<TimePicker onChange={saveTime} value={timeValue} use12Hours />
			</div>

			{/* <input type='time' onChange={saveTime2} /> */}

			<h2>Which day would you like to meditate?</h2>
			<p>Everyday is best, but we recommend picking at least five. </p>

			<div className='dayPicker'>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='SU'
						value='sunday'
						checked={selectedDays.includes("sunday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='SU'>SU</label>
				</div>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='M'
						value='monday'
						checked={selectedDays.includes("monday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='M'>M</label>
				</div>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='T'
						value='tuesday'
						checked={selectedDays.includes("tuesday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='T'>T</label>
				</div>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='W'
						value='wednesday'
						checked={selectedDays.includes("wednesday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='W'>W</label>
				</div>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='TH'
						value='thursday'
						checked={selectedDays.includes("thursday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='TH'>TH</label>
				</div>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='F'
						value='friday'
						checked={selectedDays.includes("friday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='F'>F</label>
				</div>
				<div className='dayPickerOption'>
					<input
						type='checkbox'
						id='S'
						value='saturday'
						checked={selectedDays.includes("saturday")}
						onChange={handleDayChange}
					/>
					<label htmlFor='S'>S</label>
				</div>
			</div>
			<div className='btn-wrapper'>
				<form className='column' onSubmit={setReminder}>
					<Button text='save' />
					<Link to='/home'>NO THANKS</Link>
				</form>
			</div>
		</div>
	);
};

export default Reminder;
