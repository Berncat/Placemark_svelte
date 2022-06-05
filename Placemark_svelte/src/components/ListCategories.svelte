<script>
  import { createEventDispatcher, getContext, onMount } from "svelte";

  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let categoriesList = [];
  let errorMessage = "";

  onMount(async () => {
    categoriesList = await placemarkService.getCategoriesByUser();
  });

  function addButton() {
    dispatch("add", {
      status: true,
    });
  }

  function editButton(input) {
    dispatch("edit", {
      category: input,
      status: true,
    });
  }

  function viewButton(input) {
    dispatch("view", {
      category: input,
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
      <div class="level-left">
        <div class="level-item">Categories</div>
        <div class="level-item">
          <button on:click={addButton} class="button is-dark is-outlined">
            <span class="icon">
              <i class="fas fa-plus" />
            </span>
          </button>
        </div>
        <!-- Right side -->
        <div class="level-right" />
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
            <button
              on:click={() => viewButton(category)}
              class="button is-success"
            >
              <span class="icon">
                <i class="fas fa-eye" />
              </span>
            </button>
            <button
              on:click={() => editButton(category)}
              class="button is-info"
            >
              <span class="icon">
                <i class="fas fa-edit" />
              </span>
            </button>
            <button
              on:click={() => deleteCategory(category._id)}
              class="button is-danger"
            >
              <span class="icon">
                <i class="fas fa-trash" />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  {/each}
</nav>

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
