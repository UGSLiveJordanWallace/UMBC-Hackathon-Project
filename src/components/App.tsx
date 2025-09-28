import { useState } from 'react';
import '../css/App.css'
import Navbar from './Navbar'
import Tabs from './Tabs';

function App() {
	const [tab, setTab] = useState<string>("create");
	return (
		<>
			<Navbar tab={tab} setTab={setTab}/>
			<div className="bg-stone-100 pt-15">
				<Tabs tab={tab}/>
			</div>
		</>
	)
}

export default App
