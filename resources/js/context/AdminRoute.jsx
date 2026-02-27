import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export function AdminRoute ( { children } ) {
    const {user, loading} = useContext(UserContext)

    if (loading) return null;

    if (!user?.is_admin) return <Navigate to="/"/>

    return children;
}