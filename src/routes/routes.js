import { ProductPage } from "../pages/product/productpage";
import { LoginPage } from "../pages/auth/login";
import { HomePageAdmin } from "../pages/Landing page/admin";
import { Redirect } from "../pages/redirect/redirect";
import { DashboardPage } from "../pages/dashboard/dashboard";

class RouteClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new RouteClass("login", <LoginPage />),
  new RouteClass("admin", <HomePageAdmin />),
  new RouteClass("dashboard", <DashboardPage />),
  new RouteClass("product", <ProductPage />),

  new RouteClass("*", <Redirect />),
];
