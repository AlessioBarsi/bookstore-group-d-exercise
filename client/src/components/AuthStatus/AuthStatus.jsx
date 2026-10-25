import { Link } from "react-router";
import { authClient } from "../../lib/auth-client";

function AuthStatus() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return null;

    if (!session) return <Link to="/login">Log in</Link>;

    return (
        <div className="flex items-center gap-2">
            <span>{session.user.name}</span>
            <button onClick={() => authClient.signOut()}>Log out</button>
        </div>
    );
}

export default AuthStatus;