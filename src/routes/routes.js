import { LoginPage } from "../pages/auth/login";
import { HomePage } from "../pages/home/home";
import { Redirect } from "../pages/redirect/redirect";

class RouteClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new RouteClass("login", <LoginPage />),
  new RouteClass("home", <HomePage />),

  new RouteClass("*", <Redirect />),
];
