import FavoriteButton from "../FavoriteButton/FavoriteButton";
const API_URL = import.meta.env.VITE_API_URL;

function ProductCard({
    id,
    image,
    title,
    author,
    publisher,
    description
}) {
    return (
        <div className="bg-primary/30 rounded-lg border-2 border-secondary p-2 flex flex-col items-center text-center gap-2">

            {image ? (
                <img
                    src={`${API_URL}/uploads/book-covers/${image}`}
                    alt={`Cover of ${title}`}
                    className="max-w-full h-75 object-contain rounded mb-1"
                />
            ) : (
                <img 
                    src="/images/default-cover.png"
                    className="h-75 w-full flex items-center justify-center text-dark/50 text-sm" /> 
            )}

            <h3 className="font-heading text-2xl font-bold text-ink leading-tight">{title}</h3>
            <p className="italic text-dark text-sm">{author}</p>
            <p className="text-dark/70 text-xs">{publisher}</p>

            <p className="text-ink/80 text-sm leading-relaxed line-clamp-3">
                {description}
            </p>

            <div className="flex justify-center items-center gap-2 mt-auto w-full pt-2">
                <button className="primary-button">
                    Add To Cart
                </button>
                <button className="secondary-button">
                    Reviews
                </button>
                <FavoriteButton bookId={id} />
            </div>

        </div>
    )
}

export default ProductCard;