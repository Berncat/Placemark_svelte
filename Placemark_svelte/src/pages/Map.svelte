<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PlacemarkMap from "../components/PlacemarkMap.svelte";
    let activeItem = "map";
  </script>
  
  <TitleBar />
  <MainNavigator {activeItem} />
  <PlacemarkMap />