import React, { useState } from "react";

export function App() {
	const [showMessage, setShowMessage] = useState(false);

	function handleShowMessage() {
		setShowMessage(true);
	}

	return (
		<div>
			<p>Hello Word</p>

			<button type="button" onClick={handleShowMessage}>
				Show Message
			</button>
			<hr />

			{showMessage && <p id="showMessage">Test</p>}
		</div>
	);
}
