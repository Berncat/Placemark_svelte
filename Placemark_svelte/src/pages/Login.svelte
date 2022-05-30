<script>
  import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
  import TitleBar from "../components/TitleBar.svelte";
  import LoginForm from "../components/LoginForm.svelte";
  let activeItem = "login";
</script>

<TitleBar />
<WelcomeNavigator {activeItem} />
<LoginForm />
