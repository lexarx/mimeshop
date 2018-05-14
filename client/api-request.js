export default async function(method, url, body) {
	const response = await fetch(`/api/${url}`, {
		method,
		body: body && JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}