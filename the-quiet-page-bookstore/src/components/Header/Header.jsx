import Navbar from "../Navbar/Navbar";

function Header() {
    return (
        <div className="flex justify-between bg-primary items-center p-1">
            <div>The Quiet Page Bookstore</div>
            <Navbar />
        </div>
    )
}

export default Header;