<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ImageUpload from "../components/ImageUpload.svelte";
  let activeItem = "images";
</script>

<TitleBar />
<MainNavigator {activeItem} />
<ImageUpload />
