import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { AppContext } from "../context/AppContext";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";

function MenuBar() {
    const navigate = useNavigate();
    const { openSignIn } = useClerk();

    const openLogin = () => {
        openSignIn({});
    };

    const context = useContext(AppContext);
    if (!context) return null;

    const {
        initialInvoiceData,
        setInvoiceData,
        setSelectedTemplate,
        setInvoiceTitle,
    } = context;

    const handleGenerateClick = () => {
        setInvoiceData(initialInvoiceData);
        setSelectedTemplate("template1");
        setInvoiceTitle("Create Invoice");
        navigate("/generate");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container py-2">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <Logo />
                    <span
                        className="fw-bolder fs-4 mx-3 text-primary"
                        style={{ letterSpacing: "-0.5px" }}
                    >
                        QuickInvoice
                    </span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/">
                                Home
                            </Link>
                        </li>

                        <SignedIn>
                            <li className="nav-item">
                                <Link className="nav-link fw-medium" to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link fw-medium btn btn-link"
                                    onClick={handleGenerateClick}
                                    role="link"
                                    style={{ textDecoration: "none" }}
                                >
                                    Generate
                                </button>
                            </li>
                            <li className="nav-item">
                                <UserButton />
                            </li>
                        </SignedIn>

                        <SignedOut>
                            <li className="nav-item">
                                <button
                                    onClick={openLogin}
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    Login/Signup
                                </button>
                            </li>
                        </SignedOut>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MenuBar;