<script>
  import { setContext } from "svelte";
  import { PlacemarkService } from "./services/placemark-service";
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Report from "./pages/Report.svelte";
  import Map from "./pages/Map.svelte";
  import Charts from "./pages/Charts.svelte";
  import Images from "./pages/Images.svelte";
  import Router, { replace } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { user } from "./stores";

  setContext("PlacemarkService", new PlacemarkService("https://place-mark.net"));

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
    "/map": wrap({
      component: Map,
      conditions: [
        (detail) => {
          return $user.loggedIn;
        },
      ],
    }),
    "/charts": wrap({
      component: Charts,
      conditions: [
        (detail) => {
          return $user.loggedIn;
        },
      ],
    }),
    "/images": wrap({
      component: Images,
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
