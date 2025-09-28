import { useState, useRef, type SetStateAction } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import type { DietRecord } from "./DietPlan";

export default function Create({ data, setData }: { data: DietRecord[], setData: React.Dispatch<SetStateAction<DietRecord[]>> }) {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
	const [allergies, setAllergies] = useState<string[]>([]);
	const homeCookedRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setLoading(true);

		navigator.geolocation.getCurrentPosition(async (position) => {
			if (ingredients.length === 0 || dietaryRestrictions.length === 0 || allergies.length === 0) {
				return;
			}

			const request: {
				geolocation: string,
				ingredientList: string[],
				dietaryRestrictions: string[],
				allergies: string[],
				numHCMeals: number
			} = {
				geolocation: `latitude: ${position.coords.latitude} longitude: ${position.coords.longitude}`,
				ingredientList: ingredients,
				dietaryRestrictions: dietaryRestrictions,
				allergies: allergies,
				numHCMeals: (homeCookedRef.current) ? Number(homeCookedRef.current.value) : 0,
			}

			let response: Response & { errorMessage?: string } = await fetch('http://localhost:5000/handle_post', {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(request)
			})
			if (response.errorMessage) {
				setLoading(false);
				setError("Server Error: " + response.errorMessage);
				return;
			}

			const dietData = await response.json();
			setData(JSON.parse(dietData));
			setLoading(false);
		})
	}

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			{error.length !== 0 && <div className="bg-red-100 p-3 rounded-md shadow-lg mb-10">
				<h3 className="text-2xl text-red-500">Server Error</h3>
				<p className="text-lg text-red-500">{error}</p>
			</div>}
			{loading && <div className="flex flex-row justify-center items-center gap-4 p-3 rounded-md shadow-lg mb-10">
				<HashLoader />
				<p className="text-lg text-black">Loading...</p>
			</div>}
			<h2 className="text-center text-3xl">Create Your Diet</h2>
			<form className="w-full flex flex-row gap-4 mb-3 justify-center items-center">
				<EditableList list={ingredients} setList={setIngredients} placeholder="Ingredients"/>
				<EditableList list={dietaryRestrictions} setList={setDietaryRestrictions} placeholder="Dietary Restrictions" />
				<EditableList list={allergies} setList={setAllergies} placeholder="Allergies" />
				<span>
					<h4>Home Cooked Meals per Week</h4>
					<input className="p-1 outline-none border-b-1 border-black bg-stone-200" placeholder="Out of 7 days" ref={homeCookedRef} type="number" name="home-cooked"/>
				</span>
			</form>			
			<button onClick={handleSubmit} disabled={loading} className="p-2 text-xl border border-black rounded-sm shadow-md">Generate</button>
		</div>
	)
}

function EditableList({ list, setList, placeholder }: { list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, placeholder: string }) {
	const addRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex flex-col justify-space-between">
			{list.map((val, key) => {
				return <div className="w-full flex flex-row justify-between items-center mb-1" key={key}>
				<input className="p-1 outline-none border-b-1 border-black bg-stone-200" onChange={(e) => {
					const temp = list.map((listVal, listKey) => {
						if (listKey === key) {
							return e.target.value;
						} else {
							return listVal;
						}
					});
					setList(temp);
				}} value={val}/>
				<FaRegTrashAlt className="mx-1" onClick={() => {
					const temp = list.filter((_listVal, listKey) => {
						return listKey !== key;
					})
					setList(temp)
				}}/>
				</div>
			})}
			<input type="text" className="p-1 outline-none border-b-1 border-black bg-stone-200" ref={addRef} placeholder={placeholder}/>
			<button className="w-full text-lg shadow-sm rounded-b-md" onClick={(e) => {
				e.preventDefault();
				if (addRef.current?.value && !list.includes(addRef.current.value)) {
					setList([...list, addRef.current?.value])
				}
			}}>Add</button>
		</div>
	)
}
