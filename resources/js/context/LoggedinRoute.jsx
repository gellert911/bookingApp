import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export function LoggedinRoute ( { children } ) {
    const {user, loading} = useContext(UserContext)

    if (loading) return null;

    if (!user) return <Navigate to="/login"/>

    return children;
}