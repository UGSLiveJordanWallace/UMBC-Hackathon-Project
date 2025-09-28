import type { SetStateAction } from "react";

export function TabButton({ name, value, tab, setTab }: { name: string, value: string, tab: string, setTab: React.Dispatch<SetStateAction<string>> }) {
	return <button className={"p-2 m-2 rounded-sm shadow-md " + (tab === value ? "bg-stone-300" : "bg-stone-100")} onClick={() => setTab(value)}>{name}</button>
}
