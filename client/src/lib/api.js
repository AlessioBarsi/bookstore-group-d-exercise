import { API_URL } from "./config";

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
}