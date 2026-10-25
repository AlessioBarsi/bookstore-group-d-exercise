import Navbar from "../Navbar/Navbar";

function Header() {
    return (
        <div className="flex justify-between bg-secondary items-center p-1 gap-2">
            <div className="header-title mx-2 shrink-0 whitespace-nowrap">
                <div className="font-heading text-3xl font-bold text-ink">The <span className="text-primary">Quiet </span>Page </div>
                <div className="italic">Independent Bookstore</div>
            </div>
            <Navbar />
        </div>
    );
}

export default Header;