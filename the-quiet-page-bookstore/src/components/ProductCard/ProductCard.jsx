function ProductCard({
    image,
    title,
    author,
    publisher,
    description
}) {
    return (
        <div className="bg-bg rounded-lg border-2 border-secondary p-2 flex flex-col items-center text-center gap-2">

            <img
                src={`/images/book-covers/${image}`}
                alt={`Cover of ${title}`}
                className="max-w-full h-75 object-contain rounded mb-1"
            />

            <h3 className="font-bold text-ink text-lg leading-tight">{title}</h3>
            <p className="italic text-dark text-sm">{author}</p>
            <p className="text-dark/70 text-xs">{publisher}</p>

            <p className="text-ink/80 text-sm leading-relaxed line-clamp-3">
                {description}
            </p>

            <div className="flex gap-2 mt-auto w-full pt-2">
                <button className="flex-1 bg-dark text-secondary rounded py-2 px-6 cursor-pointer font-bold transition hover:bg-ink text-sm">
                    Add To Cart
                </button>
                <button className="flex-1 bg-secondary text-dark rounded py-2 px-6 cursor-pointer font-bold transition hover:brightness-110 text-sm">
                    Reviews
                </button>
            </div>

        </div>
    )
}

export default ProductCard;