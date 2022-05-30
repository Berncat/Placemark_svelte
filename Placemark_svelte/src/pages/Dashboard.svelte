<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import Form from "../components/Form.svelte";
  import Image from "/src/assets/placeholder.jpg";
  let activeItem = "dashboard";
</script>

<TitleBar />
<MainNavigator {activeItem} />
<Form />
<figure class="image is-fullwidth">
  <img alt="Placeholder" src={Image} />
</figure>
