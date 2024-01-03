import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function ProtectedAdminRoute({ element }) {
	const { loggedIn ,user } = useAuth();
	return loggedIn && user.role !== "admin"  ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedAdminRoute;

