<script>
  import { createEventDispatcher, getContext, onMount } from "svelte";

  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let categoriesList = [];
  let category = {};
  let errorMessage = "";

  onMount(async () => {
    categoriesList = await placemarkService.getCategoriesByUser();
  });

  function addButton() {
    dispatch("add", {
      status: true,
    });
  }

  function editButton(id) {
    dispatch("edit", {
      id: id,
      status: true,
    });
  }

  async function deleteCategory(id) {
    let success = await placemarkService.deleteCategory(id);
    if (success) {
      categoriesList = await placemarkService.getCategoriesByUser();
      return true;
    } else {
      errorMessage = "Error deleting category";
    }
  }
</script>

<nav class="panel">
  <div class="panel-heading pr-3">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">Categories</div>
      <!-- Right side -->
      <div class="level-right">
        <button on:click={addButton} class="button is-dark"
          >Add New Category</button
        >
      </div>
    </nav>
  </div>
  {#each categoriesList as category}
    <div class="panel-block is-block pr-3">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <span class="icon-text">
            <span class="icon">
              <i
                style="color:hsl(204, 86%, 53%);"
                class="fas fa-map-marker-alt"
              />
            </span>
            <span>
              <p class="title is-5">{category.name}</p>
              <p class="subtitle is-6"><i>Filter Name: {category.filter}</i></p>
            </span>
          </span>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <div class="buttons">
            <a href="/#" class="button is-info">View</a>
            <button
              on:click={() => editButton(category._id)}
              class="button is-success">Edit</button
            >
            <button
              on:click={() => deleteCategory(category._id)}
              class="button is-danger">Delete</button
            >
          </div>
        </div>
      </nav>
    </div>
  {/each}
</nav>
