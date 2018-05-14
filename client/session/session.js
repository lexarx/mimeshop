import apiRequest from 'api-request';

let sessionId;

export async function startSession() {
	const response = await apiRequest('POST', 'start-session', {
		sessionId: localStorage.getItem('sessionId')
	});
	sessionId = response.sessionId;
	localStorage.setItem('sessionId', sessionId);
}

export function getSessionId() {
	return sessionId;
}