const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
}