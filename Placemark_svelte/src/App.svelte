<script>
  import { setContext } from "svelte";
  import { PlacemarkService } from "./services/placemark-service";
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Report from "./pages/Report.svelte";
  import Router, { replace } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { user } from "./stores";

  setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/dashboard": wrap({
      component: Dashboard,
      conditions: [
        (detail) => {
          return $user.loggedIn;
        },
      ],
    }),
    "/report": wrap({
      component: Report,
      conditions: [
        (detail) => {
          return $user.loggedIn;
        },
      ],
    }),
    "/logout": Main,
    "/*": wrap({
      component: Main,
      conditions: [
        (detail) => {
          return false;
        },
      ],
    }),
  };

  function conditionsFailed() {
    replace("/");
  }
</script>

<div class="container">
  <Router {routes} on:conditionsFailed={conditionsFailed} />
</div>
