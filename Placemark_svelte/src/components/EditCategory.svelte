<script>
  import { createEventDispatcher, getContext, onMount } from "svelte";
  export let id;
  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let category = {};
  let name = "";
  let filterName = "";
  let errorMessage = "";

  onMount(async () => {
    category = await placemarkService.getCategory(id);
    name = category.name;
    filterName = category.filter;
  });

  function viewButton() {
    dispatch("view", {
      id: "",
      status: true,
    });
  }

  async function editCategory() {
    let success = await placemarkService.editCategory(name, filterName, id);
    if (success) {
      dispatch("updated", {
        id: "",
        status: true,
      });
    } else {
      name = "";
      filterName = "";
      errorMessage = "Error updating category";
    }
  }
</script>

<form on:submit|preventDefault={editCategory} class="panel">
  <div class="panel-heading pr-3">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">Edit Category</div>
      <!-- Right side -->
      <div class="level-right">
        <button on:click={viewButton} class="button is-dark"
          >Back to view Categories</button
        >
      </div>
    </nav>
  </div>
  <div class="field-body panel-block">
    <div class="field">
      <label class="label" for="name">Name</label>
      <input
        bind:value={name}
        class="input"
        id="name"
        name="name"
        placeholder="Enter name"
        type="text"
      />
    </div>
    <div class="field">
      <label class="label" for="name">Filter Name</label>
      <input
        bind:value={filterName}
        class="input"
        id="filter"
        name="filter"
        placeholder="Enter filter description"
        type="text"
      />
    </div>
  </div>
  <div class="panel-block">
    <button class="button is-info is-fullwidth"> Submit </button>
  </div>
  {#if errorMessage}
    <article class="message is-danger">
      <div class="message-header">
        <p>Error</p>
      </div>
      <div class="message-body">
        {errorMessage}
      </div>
    </article>
  {/if}
</form>
