import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

function HomeContent() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/data/books.json')
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error loading books:', error));
    }, []);

    return (
        <div className="mx-1 md:mx-3">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book) => (
                    <ProductCard
                        key={book.title}
                        image={book.image}
                        title={book.title}
                        author={book.author}
                        publisher={book.publisher}
                        description={book.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomeContent;