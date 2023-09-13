import { ProductPage } from "../pages/product/productpage";
import { LoginPage } from "../pages/auth/login";
import { CashierHomePage } from "../pages/home/cashier-home-page";
import { HomePage } from "../pages/home/home";
import { Redirect } from "../pages/redirect/redirect";
import Multistep from "../template/create-new-cashier";
import { ProtectedPage } from "./protected-page";

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
  new RouteClass("home/admin", <HomePage />, true),
  new RouteClass("home/cashier", <CashierHomePage />, true),
  new RouteClass("createCashier", <Multistep />),

  new RouteClass("*", <Redirect />),
];
