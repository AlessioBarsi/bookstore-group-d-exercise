import NavbarButton from "../NavbarButton/NavbarButton";
import { useState } from "react";

function Navbar() {
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Store', href: '/store' },
        { name: 'Search', href: '/search' },
        { name: 'Cart', href: '/cart' },
        { name: 'Book Club', href: '/bookclub' },
        { name: 'Events', href: '/events' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Mobile only navbar with hamburger menu */}
            <div className="md:hidden flex justify-end">
                <button className="hamburger-button mb-1" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <div className="px-1">X</div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Animated Mobile Menu */}
            <div className={`
                md:hidden 
                flex flex-col gap-y-1 
                overflow-hidden
                transition-all duration-300 ease-in-out
                ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}
            `}>
                {links.map(element => (
                    <a key={element.name} href={element.href} className="nav-button text-center">
                        {element.name}
                    </a>
                ))}
            </div>

            {/* Desktop navbar */}
            <div className="hidden md:flex justify-between gap-1">
                {links.map(element => (
                    <a key={element.name} href={element.href} className="nav-button text-center">
                        {element.name}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Navbar;