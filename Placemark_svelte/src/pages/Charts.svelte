<script>
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import BarChart from "../components/BarChart.svelte";
  import PieChart from "../components/PieChart.svelte";
  let activeItem = "charts";
</script>

<TitleBar />
<MainNavigator {activeItem} />

<div class="columns">
  <div class="column has-text-centered">
    <h1 class="title is-3">Number of Placemarks</h1>
  </div>
</div>
<div class="columns">
  <div class="column has-text-centered">
    <BarChart />
  </div>
  <div class="column has-text-centered" >
    <PieChart />
  </div>
</div>
