import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { TOKEN } from "../constants/global.constants";
import { ROUTE } from "../constants/routes.constants";

function PrivateRouter({ children }: { children: ReactNode }) {
  const token = localStorage.getItem(TOKEN);
  if (token) return children;
  return <Navigate to={ROUTE.REGISTER} />;
}

export default PrivateRouter;