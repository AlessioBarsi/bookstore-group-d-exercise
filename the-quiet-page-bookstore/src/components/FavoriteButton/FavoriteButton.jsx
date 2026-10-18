import { useState } from "react";

function FavoriteButton() {
    const [isFavorite, setFavorite] = useState(false);
    return (
        <div>
            <button
                onClick={() => setFavorite(!isFavorite)}
                className="text-red-500 cursor-pointer transition-transform hover:scale-110 mt-1"
                aria-label="Add to favorites"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 transition ${isFavorite ? 'scale-110' : ''}`}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.778-.715-1.652-2.377-2.778-4.312-2.778C5.099 3.75 3 5.765 3 8.25c0 7.58 9 12.25 9 12.25s9-4.67 9-12.25z" />
                </svg>
            </button>
        </div>
    )
}

export default FavoriteButton;