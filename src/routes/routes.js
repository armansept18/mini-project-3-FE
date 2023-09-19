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

import { PageCoffee } from "../pages/product-cashier/pagecoffee";
import { PageFood } from "../pages/product-cashier/pagefood";
import { PageNonCoffee } from "../pages/product-cashier/noncoffee";
import { PageSnack } from "../pages/product-cashier/snack";

import { PageManagementProduct } from "../pages/managementproduct/managementproduct";

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
  new RouteClass("product", <ProductPageAdmin />, true),
  new RouteClass("employee", <CashierPage />, true),
  new RouteClass("coffee", <PageCoffee />),
  new RouteClass("noncoffee", <PageNonCoffee />),
  new RouteClass("food", <PageFood />),
  new RouteClass("snack", <PageSnack />),

  new RouteClass("management-product", <PageManagementProduct />),

  new RouteClass("*", <Redirect />),
];
