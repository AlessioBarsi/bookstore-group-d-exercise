import { useState } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");

        if (password !== confirm) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setLoading(true);
        const { error } = await authClient.signUp.email({ name, email, password });
        setLoading(false);

        if (error) {
            setErrorMessage(error.message || "Registration failed");
            return;
        }
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-10 flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-ink">Create an account</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-dark/30 rounded px-3 py-2"
            />
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
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="border border-dark/30 rounded px-3 py-2"
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="border border-dark/30 rounded px-3 py-2"
            />

            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

            <button type="submit" className="primary-button" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
            </button>
            <button className="secondary-button" onClick={() => navigate('/login')}>
                Already have an account? Login
            </button>
        </form>
    );
}

export default Register;