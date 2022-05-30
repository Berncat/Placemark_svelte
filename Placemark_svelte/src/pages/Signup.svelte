<script>
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import SignupForm from "../components/SignupForm.svelte";
    let activeItem = "signup";
  </script>
  
  <TitleBar />
  <WelcomeNavigator {activeItem} />
  <SignupForm />
