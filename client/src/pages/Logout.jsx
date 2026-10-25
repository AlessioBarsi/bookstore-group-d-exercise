import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        authClient.signOut().then(() => {
            navigate("/", { replace: true });
        });
    }, [navigate]);

    return <p>Logging out...</p>;
}

export default Logout;