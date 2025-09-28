import { useState, useRef } from "react";

export default function Create() {
	const ingredientRef = useRef<HTMLInputElement>(null);
	const [ingredients, setIngredients] = useState<string[]>([]);
	const dietaryRef = useRef<HTMLInputElement>(null);
	const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
	const allergiesRef = useRef<HTMLInputElement>(null);
	const [allergies, setAllergies] = useState<string[]>([]);

	const homeCookedRef = useRef<HTMLInputElement>(null);
	const dineOutRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<h2>Create Your Diet</h2>
				{ingredients.map((val, key) => {
					return <input onChange={(e) => {
						const temp = ingredients;
						temp[key] = e.target.value;
						setIngredients(temp);
					}} key={key} name="ingredient-list" value={}/>
				})}
				<input ref={ingredientRef}/>
				<button className="w-full" onClick={() => {
					if (ingredientRef.current?.value) {
						setIngredients([...ingredients, ingredientRef.current?.value])
					}
				}}>Add</button>
				<input name="dietary-restrictions"/>
				<input name="allergies"/>
				<input placeholder="Out of 7 days" ref={homeCookedRef} type="number" name="home-cooked"/>
				<input placeholder="Out of 7 days" ref={dineOutRef} type="number" name="dine-out"/>
			</form>			
		</div>
	)
}

function EditableList({ isEdit, list, setList }: { isEdit: boolean, list: unknown[],  }) {
	return (
		<>
			{list.map((val, key) => {
				if (isEdit) {
					return <input onChange={(e) => {
						const temp = list;
						temp[key] = e.target.value;
						set(temp);
					}} key={key}/>
				} else {
					return <h3 key={key}>{}</h3>
				}
			})}
			<input ref={ingredientRef}/>
			<button className="w-full" onClick={() => {
				if (ingredientRef.current?.value) {
					setIngredients([...ingredients, ingredientRef.current?.value])
				}
			}}>Add</button>
		</>
	)
	
}
