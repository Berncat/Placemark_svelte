<script>
  export let activeItem;
</script>

<div class="tabs is-boxed is-centered is-medium">
  <ul>
    <li class:is-active={"home" === activeItem}><a href="/#/">Home</a></li>
    <li class:is-active={"signup" === activeItem}>
      <a href="/#/signup">Sign up</a>
    </li>
    <li class:is-active={"login" === activeItem}><a href="/#/login">Login</a></li>
  </ul>
</div>
