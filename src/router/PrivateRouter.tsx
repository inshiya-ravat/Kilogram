import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { TOKEN } from "../constants/global.constants";

function PrivateRouter({ children }: { children: ReactNode }) {
  const token = localStorage.getItem(TOKEN);
  if (token) return children;
  return <Navigate to={"/register"} />;
}

export default PrivateRouter;