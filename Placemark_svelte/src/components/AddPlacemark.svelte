<script>
  import { createEventDispatcher, getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let name = "";
  let lat = "";
  let lon = "";
  let desc = "";
  let selectedCategory = "";
  let categoriesList = [];
  let errorMessage = "";
  let successMessage = "";

  onMount(async () => {
    categoriesList = await placemarkService.getCategoriesByUser();
  });

  async function createPlacemark() {
    const category = categoriesList.find(
      (category) => selectedCategory == category.name
    );
    const placemark = {
      name: name,
      lat: lat,
      lon: lon,
      desc: desc,
    };
    let success = await placemarkService.createPlacemark(
      category._id,
      placemark
    );
    if (!success) {
      errorMessage = "Error creating placemark";
      return;
    }
    successMessage = `${placemark.name} added successfully`;
    dispatch("message", {
      placemark: placemark,
    });
  }
</script>

<form on:submit|preventDefault={createPlacemark} class="panel">
  <p class="panel-heading">Add Placemark</p>
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
        required
      />
    </div>
    <div class="field is-fullwidth">
      <label class="label" for="selectedCategory">Category</label>
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select bind:value={selectedCategory} required>
            {#each categoriesList as category}
              <option>{category.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="field-body panel-block">
    <div class="field">
      <label class="label" for="lat">Latitude</label>
      <input
        bind:value={lat}
        class="input"
        id="lat"
        name="lat"
        placeholder="Enter latitude"
        type="number"
        min="-90"
        max="90"
        step="any"
        required
      />
    </div>
    <div class="field">
      <label class="label" for="lon">Longitude</label>
      <input
        bind:value={lon}
        class="input"
        id="lat"
        name="lat"
        placeholder="Enter longitude"
        type="number"
        min="-180"
        max="180"
        step="any"
        required
      />
    </div>
  </div>
  <div class="field-body panel-block">
    <div class="field">
      <label class="label" for="desc">Description</label>
      <textarea
        bind:value={desc}
        class="textarea"
        id="desc"
        name="desc"
        placeholder="Enter description"
        type="text"
      />
    </div>
  </div>
  <div class="panel-block">
    <button class="button is-info is-fullwidth"> Submit </button>
  </div>
</form>

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

{#if successMessage}
  <article class="message is-success">
    <div class="message-header">
      <p>Added</p>
    </div>
    <div class="message-body">
      {successMessage}
    </div>
  </article>
{/if}
