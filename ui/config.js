
const { protocol, hostname, port } = window.location;
export const apiEndpoint = `${protocol}//${hostname}:${port}/api`;
export const wsEndpoint = `wss://${hostname}:${port}`;

// export const apiEndpoint = `${protocol}//${hostname}:${3202}/api`;
// export const wsEndpoint = `ws://${hostname}:${3202}`;
export const USER_TOKEN_PROP = 'user_token';