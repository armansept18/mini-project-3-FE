import { ProductPage } from "../pages/product/productpage";
import { LoginPage } from "../pages/auth/login";
import { CashierHomePage } from "../pages/home/cashier-home-page";
import { HomePage } from "../pages/home/home";
import { Redirect } from "../pages/redirect/redirect";
import Multistep from "../template/create-new-cashier";
import { ProtectedPage } from "./protected-page";
import { HomePageAdmin } from "../pages/Landing page/admin";
import { DashboardPage } from "../pages/dashboard/dashboard";

class RouteClass {
  constructor(path, element, needLogin = false) {
    this.path = path;
    this.element = (
      <ProtectedPage needLogin={needLogin}>{element}</ProtectedPage>
    );
  }
}

export const routes = [
  new RouteClass("login", <LoginPage />),
  new RouteClass("admin", <HomePageAdmin />),
  new RouteClass("dashboard", <DashboardPage />),
  new RouteClass("product", <ProductPage />),

  new RouteClass("*", <Redirect />),
];
