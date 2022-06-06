<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import AddPlacemark from "../components/AddPlacemark.svelte";
  import AddCategory from "../components/AddCategory.svelte";
  import PlacemarkMap from "../components/PlacemarkMap.svelte";
  let activeItem = "dashboard";

  let placemarkMap = null;

  function markerAdded(event) {
    placemarkMap.addNewPlacemarker(event.detail.placemark);
  }
</script>

<TitleBar />
<MainNavigator {activeItem} />

<section class="columns">
  <div class="column">
    <PlacemarkMap bind:this={placemarkMap} />
  </div>
  <div class="column">
    <AddPlacemark on:message={markerAdded} />
    <AddCategory />
  </div>
</section>
