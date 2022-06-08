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

  async function oauth() {
    let success = await placemarkService.oauth();
    console.log(success)
    if (success) {
      push("/dashboard");
    } else {
      errorMessage = "Error Authenticating";
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
        type="email"
        required
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
        required
      />
    </div>
    <br />
    <div class="field is-grouped">
      <button class="button is-info is-fullwidth">Submit</button>
    </div>
  </form>
</section>
<section class="content">
  <div>
    <hr />
    <button on:click={oauth} class="button is-danger is-fullwidth" >
      <i class="fab fa-google"></i>oogle Login</button>
  </div>
</section>

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