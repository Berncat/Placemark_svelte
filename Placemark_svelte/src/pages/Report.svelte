<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListCategories from "../components/ListCategories.svelte";
  import ListPlacemarks from "../components/ListPlacemarks.svelte";
  let activeItem = "report";
</script>

<TitleBar />
<MainNavigator {activeItem} />
<ListCategories />
<ListPlacemarks />
