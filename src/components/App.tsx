import { useEffect, useState } from 'react';
import '../css/App.css'
import Navbar from './Navbar'
import Create from "./Create";
import DietPlan, { type DietRecord } from "./DietPlan";

function App() {
	const [tab, setTab] = useState<string>("create");
	const [data, setData] = useState<DietRecord[]>([]);

	useEffect(() => {
		if (data.length != 0) {
			setTab("diet-plan");
		}
	}, [data])

	return (
		<>
			<Navbar tab={tab} setTab={setTab}/>
			<div className="bg-stone-100 pt-15">
				{tab === "create" && <Create data={data} setData={setData}/>}
				{tab === "diet-plan" && <DietPlan data={data} setTab={setTab}/>}
			</div>
		</>
	)
}

export default App
