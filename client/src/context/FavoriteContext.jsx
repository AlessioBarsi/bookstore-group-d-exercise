import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import { apiFetch } from "../lib/api";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const { data: session } = authClient.useSession();
    const userId = session?.user.id;
    const [favoriteIds, setFavoriteIds] = useState(new Set());

    // Load when someone logs in, clear when they log out or switch user
    useEffect(() => {
        if (!userId) {
            setFavoriteIds(new Set());
            return;
        }
        apiFetch("/api/favorites")
            .then((books) => setFavoriteIds(new Set(books.map((b) => b.id))))
            .catch((err) => console.error("Error loading favorites:", err));
    }, [userId]);

    async function toggleFavorite(bookId) {
        const isFavorite = favoriteIds.has(bookId);

        const update = (add) =>
            setFavoriteIds((prev) => {
                const next = new Set(prev);
                if (add) next.add(bookId);
                else next.delete(bookId);
                return next;
            });

        update(!isFavorite); // optimistic: the heart changes instantly
        try {
            await apiFetch(`/api/favorites/${bookId}`, {
                method: isFavorite ? "DELETE" : "POST",
            });
        } catch (err) {
            console.error("Error updating favorite:", err);
            update(isFavorite); // roll back if the server rejected it
        }
    }

    return (
        <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}