<script>
  import { createEventDispatcher, getContext } from "svelte";
  export let category;
  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");
  let name = "";
  let lat = "";
  let lon = "";
  let desc = "";
  let selected;
  let other = "";
  let errorMessage = "";

  function backButton() {
    dispatch("back", {
      status: true,
    });
  }

  async function createPlacemark() {
    let success = await placemarkService.createPlacemark(
      category._id,
      name,
      lat,
      lon,
      desc,
      selected,
      other
    );
    if (success) {
      category = await placemarkService.getCategory(category._id);
      dispatch("back", {
        status: true,
      });
    } else {
      name = "";
      lat = "";
      lon = "";
      desc = "";
      selected;
      other = "";
      errorMessage = "Error creating placemark";
    }
  }
</script>

<form on:submit|preventDefault={createPlacemark} class="panel">
  <div class="panel-heading pr-3">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">{category.name} / Add Placemark</div>
      <!-- Right side -->
      <div class="level-right">
        <button on:click={backButton} class="button is-dark"
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
        required
      />
    </div>
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
      <label class="label" for="filter">{category.filter}</label>
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select bind:value={selected}>
            {#each category.filterList as filter}
              <option value={filter}>{filter}</option>
            {/each}
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label" for="other">If other selected enter here</label>
      <input
        bind:value={other}
        class="input"
        id="other"
        name="other"
        placeholder="Enter other"
        type="text"
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
