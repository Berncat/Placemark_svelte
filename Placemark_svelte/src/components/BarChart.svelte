<script>
  import Chart from "svelte-frappe-charts";
  import { getContext, onMount } from "svelte";
  const placemarkService = getContext("PlacemarkService");

  let totalByCategory = {
    labels: [],
    datasets: [
      {
        values: [],
      },
    ],
  };

  function populateByCategory(placemarksList, categoriesList) {
    totalByCategory.labels = [];
    categoriesList.forEach((category) => {
      totalByCategory.labels.push(`${category.name}`);
      totalByCategory.datasets[0].values.push(0);
    });
    categoriesList.forEach((category, i) => {
      placemarksList.forEach((placemark) => {
        if (placemark.categoryId == category._id) {
          totalByCategory.datasets[0].values[i] += 1;
        }
      });
    });
  }

  onMount(async () => {
    let categoriesList = await placemarkService.getCategoriesByUser();
    let placemarksList = await placemarkService.getPlacemarksByUser();
    populateByCategory(placemarksList, categoriesList);
  });
</script>

<h1 class="title is-4">Bar Chart</h1>
<Chart data={totalByCategory} type="bar" />
