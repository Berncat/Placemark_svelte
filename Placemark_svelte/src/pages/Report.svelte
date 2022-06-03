<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import List from "../components/List.svelte";
  import Image from "/src/assets/placeholder.jpg";
  let activeItem = "report";
</script>

<TitleBar />
<MainNavigator {activeItem} />
<List />
<figure class="image is-fullwidth">
  <img alt="Placeholder" src={Image} />
</figure>
