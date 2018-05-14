jest.mock('api-request');
import { getSessionId, startSession } from './session'
import apiRequest from 'api-request'

test('starts a new session and saves session ID', async () => {
	apiRequest.mockImplementation((method, url) => {
		if (method === 'POST' && url === 'start-session') {
			return {sessionId: '123'};
		}
	});
	await startSession();
	expect(getSessionId()).toBe('123');
	expect(localStorage.getItem('sessionId')).toBe('123');
});

test('sends saved session ID', async () => {
	localStorage.setItem('sessionId', '345');
	apiRequest.mockReturnValue({ sessionId: '345' });
	await startSession();
	expect(apiRequest).toHaveBeenCalledWith('POST', 'start-session', { sessionId: '345' });
});