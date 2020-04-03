
const { protocol, hostname, port } = window.location;
export const apiEndpoint = `${protocol}//${hostname}:${port}/api`;
export const wsEndpoint = `${protocol === 'https' ? 'wss' : 'ws'}://${hostname}:${port}`;

export const USER_TOKEN_PROP = 'user_token';