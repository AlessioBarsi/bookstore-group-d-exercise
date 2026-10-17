import Navbar from "../Navbar/Navbar";

function Header() {
    return (
        <div className="flex justify-between bg-secondary items-start p-1">
            <div className="header-title">
                <div className="font-bold text-ink">The <span className="text-primary">Quiet </span>Page </div>
                <div className="italic">Independent Bookstore</div>
            </div>
            <Navbar />
        </div>
    )
}

export default Header;