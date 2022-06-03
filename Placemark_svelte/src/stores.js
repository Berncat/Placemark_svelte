import { writable } from "svelte/store";

export const user = writable({
  email: "",
  id: "",
  token: "",
  loggedIn: false,
});
