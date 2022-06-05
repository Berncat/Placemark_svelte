<script>
  import { createEventDispatcher, getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";

  export let category;
  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let placemarksList = [];
  let placemarks = [];
  let selected;
  let errorMessage = "";

  onMount(async () => {
    placemarksList = await placemarkService.getPlacemarksByUser();
    placemarks = placemarksList.filter(
      (placemark) => placemark.categoryId == category._id
    );
  });

  function filter() {
    placemarks = placemarksList.filter(
      (placemark) => placemark.categoryId == category._id
    );
    if (selected !== "clear") {
      placemarks = placemarks.filter(
        (placemark) => placemark.filter == selected
      );
    }
  }

  function addButton(input) {
    dispatch("add", {
      category: input,
      status: true,
    });
  }

  function backButton() {
    dispatch("back", {
      status: true,
    });
  }

  async function deletePlacemark(id) {
    let success = await placemarkService.deletePlacemark(id);
    if (success) {
      category = await placemarkService.getCategory(category._id);
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
        <div class="level-item">{category.name}</div>
        <div class="level-item">
          <button on:click={() => addButton(category)}  class="button is-dark is-outlined">
            <span class="icon">
              <i class="fas fa-plus" />
            </span>
          </button>
        </div>
      </div>
      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <p class="title is-6">Filter:</p>
        </div>
        <div class="level-item">
          <form class="mb-0" on:submit|preventDefault={filter}>
            <div class="field has-addons">
              <div class="control">
                <div class="select">
                  <select bind:value={selected}>
                    {#each category.filterList as filter}
                      <option value={filter}>{filter}</option>
                    {/each}
                    <option value="clear">Clear Filter</option>
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
        <div class="level-item">
          <button on:click={backButton} class="button is-dark"
            >Back to view Categories</button
          >
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
          <th>{category.filter}</th>
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
            <td>{placemark.filter}</td>
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
