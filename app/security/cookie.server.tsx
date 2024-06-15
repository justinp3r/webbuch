import { createCookie } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const authToken = createCookie("has-user-visited10");  