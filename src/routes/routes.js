import {
  ProductPage,
  ProductPageAdmin,
} from "../pages/product-admin/productpageadmin";
import { LoginPage } from "../pages/auth/login";
import { CashierHomePage } from "../pages/home/cashier-home-page";
import { HomePage } from "../pages/home/home";
import { Redirect } from "../pages/redirect/redirect";
import Multistep from "../template/create-new-cashier";
import { ProtectedPage } from "./protected-page";
import { HomePageAdmin } from "../pages/Landing page/admin";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { CashierPage } from "../pages/cashier/cashier";
import { CashierLandingPage } from "../pages/Landing page/cashier";

import { PageCoffee } from "../pages/product-cashier/coffee.jsx/pagecoffee";
import { PageFood } from "../pages/product-cashier/food/pagefood";
import { PageNonCoffee } from "../pages/product-cashier/noncoffee/noncoffee";
import { PageSnack } from "../pages/product-cashier/snack/snack";

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
  new RouteClass("admin", <HomePageAdmin />, true),
  new RouteClass("cashier", <CashierLandingPage />, true),
  new RouteClass("dashboard", <DashboardPage />, true),
  new RouteClass("admin-product", <ProductPageAdmin />, true),
  new RouteClass("cashier-product", <ProductPageCashier />, true),
  new RouteClass("employee", <CashierPage />, true),

  new RouteClass("*", <Redirect />),
];
