import type { SetStateAction } from "react"
import Table from "./Table"

export type DietRecord = {
	day: string,
	meal: string,
	menu_item: string,
	health_asmt: string,
	hc: boolean | string
}
export default function DietPlan({ data, setTab }: { data: DietRecord[], setTab: React.Dispatch<SetStateAction<string>> }) {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<Table data={data}/>
			<button className="p-2 mt-3 text-xl border border-black rounded-sm shadow-md" onClick={() => setTab("create")}>Regenerate</button>
		</div>
	)
}

