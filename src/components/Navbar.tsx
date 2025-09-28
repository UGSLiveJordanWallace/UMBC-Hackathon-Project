import type { SetStateAction } from "react";
import { TabButton } from "./Tabs";

export default function Navbar({ tab, setTab }: { tab: string, setTab: React.Dispatch<SetStateAction<string>>}) {
	return (
		<nav className="w-full fixed top-0 left-0 flex flex-row justify-between items-center p-1 bg-transparent shadow-lg backdrop-blur-sm">
			<span>
				<h1 className="text-4xl">Fast Diet</h1>
			</span>
			<span>
				<TabButton name="Create" value="create" tab={tab} setTab={setTab} />
				<TabButton name="Diet Plan" value="diet-plan" tab={tab} setTab={setTab} />
			</span>
		</nav>
	)
}
