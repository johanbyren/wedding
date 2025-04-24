import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/register", "routes/register.tsx"),
  route("/dashboard", "components/protected-route.tsx", [
    route("", "dashboard/page.tsx"),
    // Commenting out routes for files that don't exist yet
    // route("gifts", "dashboard/gifts.tsx"),
    // route("create", "dashboard/create.tsx"),
    // route("settings", "dashboard/settings.tsx"),
  ]),
  route("/wedding/:id", "routes/wedding/WeddingPage.tsx"),
  route("/wedding/:id/contribute/:giftId", "routes/wedding/Contribute.tsx"),
  route("/wedding/:id/thank-you", "routes/wedding/ThankYou.tsx"),
] satisfies RouteConfig;
