import Navigo from "navigo";
import * as controller from "./controller";

class Router {
  constructor() {
    const basePath = this._getBasePath();
    this.router = new Navigo(basePath, { hash: false, strategy: "ONE" });
    this._setupRoutes();
  }

  _setupRoutes() {
    this.router
      .on("/", () => controller.showHome())
      .on("/signup", () => controller.showSignup());
  }

  _getBasePath() {
    // Check if we're on GitHub Pages or similar
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Local development
    if (hostname === "localhost" || hostname === "127.0.0.1") return "/";

    // GitHub Pages pattern: username.github.io/repo-name/
    if (hostname.includes("github.io")) {
      const pathParts = pathname.split("/").filter((part) => part);
      if (pathParts.length > 0) return `/${pathParts[0]}/`;
    }
    // Custom domain or other hosting
    return "/";
  }

  init() {
    this.router.resolve();
  }

  navigateTo(path) {
    this.router.navigate(path);
  }
}

export default new Router();
