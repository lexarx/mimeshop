const uid = require('uid');

const sessions = [];

function getSession(sessionId) {
	return sessions.find(session => session.id === sessionId) ||
		createSession(sessionId);
}

function createSession(sessionId) {
	const session = {
		id: sessionId || uid(10)
	};
	sessions.push(session);
	return session;
}

module.exports = {
	getSession,

	startSession({ sessionId }) {
		const session = getSession(sessionId);
		return {
			sessionId: session.id
		};
	}
};