<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListCategories from "../components/ListCategories.svelte";
  import AddCategory from "../components/AddCategory.svelte";
  import EditCategory from "../components/EditCategory.svelte";
  import ListPlacemarks from "../components/ListPlacemarks.svelte";
  import AddPlacemark from "../components/AddPlacemark.svelte";

  let activeItem = "dashboard";
  let add = false;
  let edit = false;
  let view = false;
  let addPM = false;
  let category = {};

  function back() {
    add = false;
    edit = false;
    view = false;
    addPM = false;
  }

  function addComponent() {
    add = !add;
  }

  function editComponent(event) {
    edit = !edit;
    if (event.detail.category) {
      category = event.detail.category;
    } else category = {};
  }

  function viewComponent(event) {
    view = !view;
    if (event.detail.category) {
      category = event.detail.category;
    } else category = {};
  }

  function addPMComponent(event) {
    addPM = !addPM;
    if (event.detail.category) {
      category = event.detail.category;
    } else category = {};
  }
</script>

<TitleBar />
<MainNavigator {activeItem} />
{#if add}
  <AddCategory on:back={back} on:added={addComponent} />
{:else if edit}
  <EditCategory {category} on:back={back} on:updated={editComponent} />
{:else if addPM}
  <AddPlacemark {category} on:back={back} />
{:else if view}
  <ListPlacemarks {category} on:back={back} on:add={addPMComponent}/>
{:else}
  <ListCategories
    on:add={addComponent}
    on:view={viewComponent}
    on:edit={editComponent}
  />
{/if}
