function Footer() {
    return (
        <footer className="bg-dark text-bg/80">
            <div className="max-w-6xl mx-auto p-2 md:px-4 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div>
                    <h3 className="font-heading text-secondary font-bold text-xl mb-2">The Quiet Page</h3>
                    <p className="text-sm leading-relaxed">
                        Your local independent bookstore. Curating thoughtful stories and building a community of readers, one page at a time.
                    </p>
                </div>

                <div>
                    <h3 className="font-heading  text-secondary font-bold text-xl mb-2">Quick Links</h3>
                    <nav className="flex flex-col gap-1 text-sm">
                        <a href="/store" className="hover:text-secondary transition">Online Store</a>
                        <a href="/bookclub" className="hover:text-secondary transition">Book Club</a>
                        <a href="/events" className="hover:text-secondary transition">Events</a>
                        <a href="/about" className="hover:text-secondary transition">About Us</a>
                        <a href="/contact" className="hover:text-secondary transition">Contact</a>
                    </nav>
                </div>

                <div>
                    <h3 className="font-heading text-secondary font-bold text-xl mb-2">Visit Us</h3>
                    <div className="text-sm flex flex-col gap-1">
                        <p>1518 Bookworm Lane</p>
                        <p>Mon - Sat: 10am - 8pm</p>
                        <p>Sun: 11am - 6pm</p>
                    </div>
                </div>

            </div>

            <div className="border-t border-bg/20 text-center py-4 text-sm text-bg/50">
                <p>&copy; {new Date().getFullYear()} The Quiet Page. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;