function NavbarButton ({title, link}) {
    return (
        <a className="nav-button" href={`/${link}`} as="button">
            {title}
        </a>
    )
}

export default NavbarButton;