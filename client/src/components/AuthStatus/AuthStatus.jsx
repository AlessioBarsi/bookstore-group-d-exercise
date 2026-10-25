import { authClient } from "../../lib/auth-client";
import NavbarButton from "../NavbarButton/NavbarButton";

function AuthStatus() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return null;

    if (!session) return <div>
        <NavbarButton title="Login" link="login" />
    </div>;

    return (
        <div className="flex items-center gap-2">
            <span className="text-2xl ">
                Welcome, <span className="font-bold text-primary">
                    {session.user.name}
                </span>
            </span>
            <button className="logout-button" onClick={() => authClient.signOut()}>Log out</button>
        </div>
    );
}

export default AuthStatus;