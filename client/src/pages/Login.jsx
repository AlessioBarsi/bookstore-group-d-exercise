import { useState } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const { error } = await authClient.signIn.email({ email, password });

        setLoading(false);
        if (error) {
            setErrorMessage(error.message || "Login failed");
            return;
        }
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="px-2 max-w-sm mx-auto my-10 flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-ink">Log in</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-dark/30 rounded px-3 py-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-dark/30 rounded px-3 py-2"
            />

            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

            <button type="submit" className="primary-button" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
}

export default Login;