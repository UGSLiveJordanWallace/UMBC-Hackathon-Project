import type { DietRecord } from "./DietPlan"

export default function Table({ data }: { data: DietRecord[] }) {
	const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	return (
		<div className="bg-white shadow-md rounded-sm">
			<span className={"h-20 flex flex-row justify-center items-center odd:bg-stone-200"}>
				<h3 className="w-1/12 md:w-1/10 h-full flex flex-col justify-center p-2 text-lg md:text-xl text-center">Day</h3>
				<h3 className="w-1/12 md:w-1/10 h-full flex flex-col justify-center p-2 text-lg md:text-xl text-center">Meal</h3>
				<h3 className="w-3/12 md:w-2/10 h-full flex flex-col justify-center p-2 text-lg md:text-xl text-center">Menu Item</h3>
				<h3 className="w-5/12 md:w-5/10 h-full flex flex-col justify-center p-2 text-lg md:text-xl text-center">Health Assessment</h3>
				<h3 className="w-2/12 md:w-1/10 h-full flex flex-col justify-center p-2 text-lg md:text-xl text-center">Homecook</h3>
			</span>
			<div className="max-h-70 overflow-y-auto overflow-x-auto inset-shadow-md no-scrollbar">
				{data && data.map((record: DietRecord, key) => {
					return <span key={key} className={"h-20 flex flex-row justify-center items-center odd:bg-stone-200"}>
						<h3 className="w-1/12 md:w-1/10 h-full flex flex-col justify-center p-2 text-lg md:text-2xl text-center border-r-1 border-grey-100">{days[Number(record.day)-1]}</h3>
						<h3 className="w-1/12 md:w-1/10 h-full flex flex-col justify-center p-2 text-lg md:text-2xl text-center border-r-1 border-grey-100">{record.meal}</h3>
						<h3 className="w-3/12 md:w-2/10 h-full flex flex-col justify-center p-2 text-lg md:text-xl text-center border-r-1 border-grey-100">{record.menu_item}</h3>
						<h3 className="w-5/12 md:w-5/10 h-full flex flex-col justify-center p-2 text-lg md:text-lg text-center border-r-1 border-grey-100">{record.health_asmt}</h3>
						<h3 className="w-2/12 md:w-1/10 h-full flex flex-col justify-center p-2 text-lg md:text-2xl text-center">{record.hc ? "Yes" : "No"}</h3>
					</span>
				})}
			</div>
		</div>
	)
}
