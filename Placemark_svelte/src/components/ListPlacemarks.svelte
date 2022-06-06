<script>
  import { createEventDispatcher, getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");
  let categoriesList = [];
  let placemarksList = [];
  let placemarks = [];
  let selectedCategory = "";
  let category = {};
  let errorMessage = "";

  onMount(async () => {
    categoriesList = await placemarkService.getCategoriesByUser();
    placemarksList = await placemarkService.getPlacemarksByUser();
  });

  function filterCategory() {
    category = categoriesList.find(
      (category) => selectedCategory == category.name
    );
    placemarks = placemarksList.filter(
      (placemark) => placemark.categoryId == category._id
    );
  }

  async function deletePlacemark(id) {
    let success = await placemarkService.deletePlacemark(id);
    if (success) {
      categoriesList = await placemarkService.getCategoriesByUser();
      placemarksList = await placemarkService.getPlacemarksByUser();
      placemarks = await placemarksList.filter(
        (placemark) => placemark.categoryId == category._id
      );
      return true;
    } else {
      errorMessage = "Error deleting placemark";
    }
  }
</script>

<nav class="panel">
  <div class="panel-heading pr-3">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">Placemarks</div>
      </div>
      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <form class="mb-0" on:submit|preventDefault={filterCategory}>
            <div class="field has-addons">
              <div class="control">
                <div class="select">
                  <select bind:value={selectedCategory}>
                    {#each categoriesList as category}
                      <option value={category.name}>{category.name}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="control">
                <button class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-filter" />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <div class="panel-block">
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Description</th>
          <th>Category</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each placemarks as placemark}
          <tr>
            <td>{placemark.name}</td>
            <td>{placemark.lat}</td>
            <td>{placemark.lon}</td>
            <td>{placemark.desc}</td>
            <td>{placemark.categoryName}</td>
            <td>
              <button
                on:click={() => deletePlacemark(placemark._id)}
                class="button is-danger"
              >
                <span class="icon is-small">
                  <i class="fas fa-trash" />
                </span>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
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
