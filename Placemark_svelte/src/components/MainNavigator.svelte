<script>
  export let activeItem;
</script>

<div class="tabs is-boxed is-centered is-medium">
  <ul>
    <li class:is-active={"dashboard" === activeItem}>
      <a href="/#/dashboard">Dashboard</a>
    </li>
    <li class:is-active={"report" === activeItem}>
      <a href="/#/report">Report</a>
    </li>
    <li class:is-active={"map" === activeItem}>
      <a href="/#/map">Map</a>
    </li>
    <li class:is-active={"charts" === activeItem}>
      <a href="/#/charts">Charts</a>
    </li>
    <li class:is-active={"images" === activeItem}>
      <a href="/#/images">Images</a>
    </li>
    <li><a href="/#/logout">Log out</a></li>
  </ul>
</div>
