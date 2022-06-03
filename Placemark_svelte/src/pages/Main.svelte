<script>
  import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
  import TitleBar from "../components/TitleBar.svelte";
  import { getContext } from "svelte";
  const placemarkService = getContext("PlacemarkService");
  placemarkService.logout();
  let activeItem = "home";
</script>

<TitleBar />
<WelcomeNavigator {activeItem} />
<section class="content">
  <h1 class="title is-6 has-text-centered">Welcome!</h1>
  <hr />
  <div class="content has-text-centered">
    <p>Placemark.ie is a point of interest web application</p>
  </div>
</section>
