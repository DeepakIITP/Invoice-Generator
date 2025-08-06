import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import DashBoard from "./pages/DashBoard";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";
import UserSyncHandler from "./components/UserSyncHandler";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
    return (
        <BrowserRouter>
            <UserSyncHandler />
            <MenuBar />
            <Toaster />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <SignedIn>
                                <DashBoard />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
                <Route
                    path="/generate"
                    element={
                        <>
                            <SignedIn>
                                <MainPage />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
                <Route
                    path="/preview"
                    element={
                        <>
                            <SignedIn>
                                <PreviewPage />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;