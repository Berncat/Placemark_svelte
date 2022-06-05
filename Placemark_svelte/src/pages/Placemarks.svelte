<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListPlacemarks from "../components/ListPlacemarks.svelte";
  import AddPlacemark from "../components/AddPlacemark.svelte";
  

  let activeItem = "dashboard";
  let add = false;
  let edit = false;
  let category = "";

  function addComponent() {
    add = !add;
  }

  function editComponent(event) {
    edit = !edit;
    if (event.detail.category) {
      category = event.detail.category;
    } else category = "";
  }
</script>

<TitleBar />
<MainNavigator {activeItem} />

{#if add}
  <AddPlacemark on:back={addComponent} on:added={addComponent}/>
{:else if edit}
  <ListPlacemarks />
{:else}
  <ListPlacemarks on:add={addComponent}/>
{/if}
