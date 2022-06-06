<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/leaflet-map";
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");

  const mapConfig = {
    location: { lat: 53.6, lng: -7.9 },
    zoom: 7,
    minZoom: 1,
  };

  let map = null;
  let categoriesList = []
  let placemarksList = []

  onMount(async () => {
    map = new LeafletMap("placemark-map", mapConfig);
    map.showZoomControl();
    categoriesList = await placemarkService.getCategoriesByUser();
    placemarksList = await placemarkService.getPlacemarksByUser();
    categoriesList.forEach((category) => {
      map.addLayerGroup(category.name);
    });
    placemarksList.forEach((placemark) => {
      addPlacemarker(placemark);
    });
    map.showLayerControl();
  });

  function addPlacemarker(placemark) {
    const placemarkStr = `Name: ${placemark.name} lat: ${placemark.lat} lon: ${placemark.lon} Category: ${placemark.categoryName}`;
    map.addMarker({lat: placemark.lat, lng: placemark.lon}, placemarkStr, placemark.categoryName);
  }

  export function addNewPlacemarker(placemark) {
    const placemarkStr = `Name: ${placemark.name} lat: ${placemark.lat} lon: ${placemark.lon} Category: ${placemark.categoryName}`;
    map.addMarker({lat: placemark.lat, lng: placemark.lon}, placemarkStr, placemark.categoryName);
    map.moveTo(8, {lat: placemark.lat, lng: placemark.lng});
  }
</script>

<div class="box" id="placemark-map" style="height:800px" />
