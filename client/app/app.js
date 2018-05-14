import React from 'react'
import './app.css'
import { render } from 'react-dom'
import { startSession } from 'session/session';
import Page from 'page/page';

(async () => {
	await startSession();
	const container = document.getElementById('app');
	render(<Page/>, container);
})();