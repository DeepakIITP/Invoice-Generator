import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

function UserSyncHandler() {
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const { user } = useUser();
    const [synced, setSynced] = useState(false);
    const { baseUrl } = useContext(AppContext);

    useEffect(() => {
        const saveUser = async () => {
            if (!isLoaded || !isSignedIn || synced || !user) return;

            try {
                const token = await getToken();
                if (!token) {
                    toast.error("Authorization token not available.");
                    return;
                }

                const userData = {
                    clerkId: user.id,
                    email: user?.primaryEmailAddress?.emailAddress || "",
                    photoUrl: user.imageUrl,
                };

                await axios.post(`${baseUrl}/users`, userData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setSynced(true);
            } catch (error) {
                console.error("User sync failed:", error);
                toast.error("Unable to create account. Please try again.");
            }
        };

        saveUser();
    }, [isLoaded, isSignedIn, getToken, user, synced, baseUrl]);

    return null;
}

export default UserSyncHandler;