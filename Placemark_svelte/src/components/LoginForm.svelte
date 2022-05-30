<script>
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";

  let email = "";
  let password = "";
  let errorMessage = "";

  const placemarkService = getContext("PlacemarkService");

  async function login() {
    let success = await placemarkService.login(email, password);
    if (success) {
      push("/dashboard");
    } else {
      email = "";
      password = "";
      errorMessage = "Invalid Credentials";
    }
  }
</script>

<section class="content">
  <form on:submit|preventDefault={login}>
    <div class="field">
      <label class="label" for="email">Email</label>
      <input
        bind:value={email}
        class="input"
        id="email"
        name="email"
        placeholder="Enter email"
        type="text"
      />
    </div>
    <div class="field">
      <label class="label" for="password">Password</label>
      <input
        bind:value={password}
        class="input"
        id="password"
        name="password"
        placeholder="Enter Password"
        type="password"
      />
    </div>
    <br />
    <div class="field is-grouped">
      <button class="button is-info is-fullwidth">Submit</button>
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
</section>
