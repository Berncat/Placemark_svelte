<script>
  import { getContext, onMount } from "svelte";
  const placemarkService = getContext("PlacemarkService");
  let categoriesList = [];
  let errorMessage = "";

  onMount(async () => {
    categoriesList = await placemarkService.getCategoriesByUser();
  });

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
  <p class="panel-heading">Categories</p>
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
            </span>
          </span>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <button
            on:click={() => deleteCategory(category._id)}
            class="button is-danger"
          >
            <span class="icon">
              <i class="fas fa-trash" />
            </span>
          </button>
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
