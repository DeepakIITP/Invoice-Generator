import React from "react";
import "./LandingPage.css";
import { assets } from "../../assets/assets";
import Logo from "../../components/Logo";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';


function LandingPage() {
    return (
        <>
            <header id="hero" className="hero-section text-white text-center">
                <div
                    className="container py-5 d-flex flex-column justify-content-center"
                    style={{ minHeight: "85vh" }}
                >
                    <div className="row py-lg-5">
                        <div className="col-lg-9 col-md-10 mx-auto">
                            <h1 className="display-3 fw-bold mb-4">
                                Effortless Invoicing. Professional Results.
                            </h1>
                            <p className="lead mb-5" style={{ fontSize: "1.3rem" }}>
                                Stop wrestling with spreadsheets. QuickInvoice helps you create
                                and send beautiful invoices in minutes, so you get paid faster.
                            </p>
                            <p>
                                {/* Primary call to action */}
                                <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3">
                                    Generate Your First Invoice
                                </button>
                                {/* Secondary call to action */}
                                <a
                                    href="#how-it-works"
                                    className="btn btn-lg btn-outline-light rounded-pill my-2 mx-1 px-5 py-3"
                                >
                                    Learn More
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* How It Works Section: Explains the process in steps using cards */}
            <section id="how-it-works" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">
                        Get Started in 4 Simple Steps
                    </h2>
                    <div className="row g-4 justify-content-center">
                        {/* Step 1 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-primary-soft">
                                    <img
                                        src="https://placehold.co/150x150/0D6EFD/FFFFFF?text=1&font=montserrat"
                                        className="rounded-circle"
                                        alt="Enter Invoice Details"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/150x150/E0E0E0/000000?text=Error";
                                        }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">
                                        Enter Details
                                    </h5>
                                    <p className="card-text text-muted small">
                                        Quickly fill in your clients information, item descriptions,
                                        quantities, and prices. Our intuitive form makes it a
                                        breeze.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-success-soft">
                                    <img
                                        src="https://placehold.co/150x150/198754/FFFFFF?text=2&font=montserrat"
                                        className="rounded-circle"
                                        alt="Choose Template"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/150x150/E0E0E0/000000?text=Error";
                                        }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">
                                        Choose Template
                                    </h5>
                                    <p className="card-text text-muted small">
                                        Browse our gallery of professionally designed templates.
                                        Pick one that matches your brand and style.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-warning-soft">
                                    <img
                                        src="https://placehold.co/150x150/FFC107/000000?text=3&font=montserrat"
                                        className="rounded-circle"
                                        alt="Preview Invoice"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/150x150/E0E0E0/000000?text=Error";
                                        }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">
                                        Preview Invoice
                                    </h5>
                                    <p className="card-text text-muted small">
                                        See exactly how your invoice will look before sending it.
                                        Make any last-minute adjustments with ease.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-info-soft">
                                    <img
                                        src="https://placehold.co/150x150/0DCAF0/FFFFFF?text=4&font=montserrat"
                                        className="rounded-circle"
                                        alt="Download & Save"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/150x150/E0E0E0/000000?text=Error";
                                        }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">
                                        Download & Save
                                    </h5>
                                    <p className="card-text text-muted small">
                                        Download your invoice as a PDF, send it directly via email,
                                        or save it for your records and future reference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section: Highlights key benefits with images and text */}
            <section id="features" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">
                        Why Choose QuickInvoice?
                    </h2>

                    {/* Feature 1 */}
                    <div className="row align-items-center gy-4">
                        <div className="col-md-6">
                            <img
                                src={assets.landing1}
                                className="img-fluid rounded shadow-lg"
                                alt="Invoice Customization"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/600x400/E0E0E0/000000?text=Error";
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Effortless Invoice Creation</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Quickly fill in invoice details with an intuitive and
                                user-friendly interface. Customize your layout, add your
                                branding, and tailor fields to suit your needs.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Choose from professionally designed templates.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Add your logo and business information.
                                </li>
                                <li>
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Customize invoice fields with ease.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse">
                        <div className="col-md-6">
                            <img
                                src={assets.landing2}
                                className="img-fluid rounded shadow-lg"
                                alt="Dashboard Preview"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/600x400/E0E0E0/000000?text=Error";
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Clean and Organized Dashboard</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Manage all your invoices in one place with a modern dashboard.
                                View, reuse, and track every invoice at a glance.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    View and manage all past invoices easily.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Access invoice thumbnails for quick reference.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Reuse previous invoices with one click.
                                </li>
                                <li>
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Keep track of invoice status in real-time.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="row align-items-center gy-4 mt-5">
                        <div className="col-md-6">
                            <img
                                src={assets.landing3}
                                className="img-fluid rounded shadow-lg"
                                alt="Invoice Preview"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/600x400/E0E0E0/000000?text=Error";
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Real-Time Invoice Preview</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Instantly see how your invoice looks before sending. Make
                                changes on the fly and take quick actions like save, download,
                                or delete.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Live preview while editing.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Toggle between multiple saved invoices.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    One-click Save, Download, and Delete options.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse">
                        <div className="col-md-6">
                            <img
                                src={assets.landing4}
                                className="img-fluid rounded shadow-lg"
                                alt="Send Invoices"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/600x400/E0E0E0/000000?text=Error";
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Instant Invoice Delivery</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Send your invoices directly from the platform in just one click.
                                No need to leave the app — it's fast, easy, and unlimited.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Send invoices instantly from the dashboard.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    Just one click to email your invoice.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    No limits — send as many invoices as you need.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section: Final prompt for users to start */}
            <section
                id="generate-invoice"
                className="py-5 text-center bg-primary text-white"
            >
                <div className="container">
                    <h2 className="display-5 fw-bold mb-3">
                        Ready to Streamline Your Invoicing?
                    </h2>
                    <p className="lead mb-4 mx-auto" style={{ maxWidth: "600px" }}>
                        Join thousands of freelancers and small businesses who trust
                        QuickInvoice. Start creating professional invoices today – its fast,
                        easy, and effective!
                    </p>
                    <button className="btn btn-lg btn-warning fw-bold rounded-pill px-5 py-3">
                        Start Generating Invoices Now
                    </button>
                    <p className="mt-3 small">
                        (This will lead to the invoice generation interface)
                    </p>
                </div>
            </section>

            {/* Footer: Copyright and social media links */}
            <footer className="py-5 bg-dark text-white-50">
                <div className="container text-center">
                    <Logo />
                    <p className="text-white fw-bold mt-2">QuickInvoice</p>
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} Deepak Ashok Modi. All Rights Reserved.
                    </p>
                    <p className="mb-0 small">
                        Crafted with <i className="bi bi-heart-fill text-danger"></i> for
                        freelancers and small businesses.
                    </p>
                    <p className="mt-2">
                        {/* Placeholder social media links */}
                        <a href="#" className="text-white-50 me-2">
                            <TwitterIcon />
                        </a>
                        <a href="#" className="text-white-50 me-2">
                            <FacebookIcon />
                        </a>
                        <a href="#" className="text-white-50">
                            <LinkedinIcon />
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;