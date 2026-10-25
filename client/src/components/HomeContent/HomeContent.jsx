import Events from "../HomeEvents/HomeEvents";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

function HomeContent() {
    const [books, setBooks] = useState([]);
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/books`)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then((data) => {
                setBooks(data);

                const categories = [...new Set(data.map((book) => book.genre.name))];
                setOptions(['all', ...categories]);
            })
            .catch((error) => console.error('Error loading books:', error));
    }, []);

    return (
        <div className="mx-1 my-2 md:mx-3">

            <div className="flex justify-between items-start my-4">
                <h2 className="text-3xl font-bold text-ink">
                    <span className="text-primary">Bestsellers</span> This Season
                </h2>
                <button className="primary-button" onClick={() => { setIsOpen(!isOpen) }}>
                    {filter}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5.23 8.23a.75.75 0 011.06 0L10 11.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 9.29a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-bg border border-dark/20 rounded-lg shadow-lg overflow-hidden z-20">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setFilter(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition
                                ${filter === option
                                        ? 'bg-primary/20 text-ink font-bold'
                                        : 'text-ink/80 hover:bg-dark/10'
                                    }`
                                }
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books
                    .filter((book) => filter === 'all' || book.genre.name === filter)
                    .map((book) => (
                        <ProductCard
                            key={book.id}
                            image={book.cover}
                            title={book.title}
                            author={book.author.name}
                            publisher={book.publisher}
                            description={book.description}
                        />
                    ))
                }
            </div>

            <div>
                <Events />
            </div>
        </div>
    )
}

export default HomeContent;