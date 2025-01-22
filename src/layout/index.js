import React from "react";
import MuiDrawer from "./drawer";
import AuthGuard from "../auth/AuthGuard";

const AdminLayout = ({ children }) => {
  return (
      <AuthGuard>
        <MuiDrawer>{children}</MuiDrawer>
      </AuthGuard>
  );
};

export default AdminLayout;
