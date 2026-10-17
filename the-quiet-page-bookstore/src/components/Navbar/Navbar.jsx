import NavbarButton from "../NavbarButton/NavbarButton";

function Navbar() {
    return (
        <div className="flex space-between justify-center gap-1">
            <NavbarButton title="Home" link="#" />
            <NavbarButton title="Store" link="store" />
            <NavbarButton title="Events" link="events" />
            <NavbarButton title="About" link="about" />
        </div>
    )
}

export default Navbar;