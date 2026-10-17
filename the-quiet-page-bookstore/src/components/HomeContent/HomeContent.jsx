import ProductCard from "../ProductCard/ProductCard";

function HomeContent() {
    return (
        <div>

            Home Content
            <ProductCard image='sample-cover-1.png'
                title="Book Title"
                author="Book Author"
                publihser="Book Publisher"
                description="A book about a very long story"
            />
        </div>
    )
}

export default HomeContent;