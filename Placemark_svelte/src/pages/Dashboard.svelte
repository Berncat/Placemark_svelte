<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListCategories from "../components/ListCategories.svelte";
  import AddCategory from "../components/AddCategory.svelte";
  import EditCategory from "../components/EditCategory.svelte";

  let activeItem = "dashboard";
  let add = false;
  let edit = false;
  let id = "";

  function addComponent() {
    add = !add;
  }

  function editComponent(event) {
    id = event.detail.id;
    edit = !edit;
  }
</script>

<TitleBar />
<MainNavigator {activeItem} />
{#if add}
  <AddCategory on:view={addComponent} on:added={addComponent} />
{:else if edit}
  <EditCategory {id} on:view={editComponent} on:updated={editComponent} />
{:else}
  <ListCategories on:add={addComponent} on:edit={editComponent} />
{/if}
