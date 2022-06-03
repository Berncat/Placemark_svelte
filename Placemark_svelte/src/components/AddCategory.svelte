<script>
  import { createEventDispatcher, getContext } from "svelte";

  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let name = "";
  let filterName = "";
  let errorMessage = "";

  function viewButton() {
    dispatch("view", {
      status: true,
    });
  }

  async function createCategory() {
    let success = await placemarkService.createCategory(name, filterName);
    if (success) {
      dispatch("added", {
        status: true,
      });
    } else {
      name = "";
      filterName = "";
      errorMessage = "Error creating category";
    }
  }
</script>

<form on:submit|preventDefault={createCategory} class="panel">
  <div class="panel-heading pr-3">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">Add Category</div>
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
