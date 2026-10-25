import NavbarButton from "../NavbarButton/NavbarButton";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";

function Navbar() {
    const { data: session, isPending } = authClient.useSession();

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Store', href: 'store' },
        { name: 'Cart', href: 'cart' },
        { name: 'Book Club', href: 'bookclub' },
        { name: 'Events', href: 'events' },
        { name: 'About', href: 'about' },
        { name: 'Contact', href: 'contact' },
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Mobile only navbar with hamburger menu */}
            <div className="md:hidden flex gap-2 items-center justify-end">
                <div className="text-primary font-bold truncate max-w-28">{session?.user.name}</div>                <button className="hamburger-button mb-1" onClick={() => setIsOpen(!isOpen)}>
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
                    <NavbarButton key={element.name} title={element.name} link={element.href} />
                ))}
                {!isPending && (
                    session ?
                        (<NavbarButton title="Logout" link="logout" />) :
                        (<NavbarButton title="Login" link="login" />)
                )}
            </div>

            {/* Desktop navbar */}
            <div className="hidden md:flex items-center justify-between gap-1 mx-2">
                {links.map(element => (
                    <NavbarButton key={element.name} title={element.name} link={element.href} />
                ))}
                {!isPending && (
                    session ?
                        (<NavbarButton title="Logout" link="logout" />) :
                        (<NavbarButton title="Login" link="login" />)
                )}
                <div className="text-primary text-2xl mx-2 mb-1 font-bold max-w-28">{session?.user.name}</div>
            </div>
        </div>
    )
}

export default Navbar;