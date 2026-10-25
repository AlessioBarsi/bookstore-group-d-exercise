import { Link } from "react-router";

function NavbarButton ({title, link}) {
    return (
        <Link className="nav-button" to={`/${link}`} as="button">
            {title}
        </Link>
    )
}

export default NavbarButton;