<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { push } from "svelte-spa-router";
  const placemarkService = getContext("PlacemarkService");
  let name = "";
  let errorMessage = "";
  let successMessage = "";

  async function createCategory() {
    let success = await placemarkService.createCategory(name);
    if (!success) {
      errorMessage = "Error creating category";
      return;
    }
    successMessage = `${success.name} added successfully`;
    push("/report");
  }
</script>

<form on:submit|preventDefault={createCategory} class="panel">
  <p class="panel-heading">Add Category</p>
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
