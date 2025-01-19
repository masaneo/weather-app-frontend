<template>
  <div>
    <header>
      <h1 @click="this.locationSelected = false">Prognoza pogody</h1>
      <button @click="toggleTheme">
        {{ theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny" }}
      </button>
    </header>
    <main>
      <div v-if="!locationSelected" class="location-selection">
        <h2>Podaj swoją lokalizację</h2>
        <form @submit.prevent="fetchData">
          <label>
            Szerokość geograficzna:
            <input type="number" step="0.00001" min="-90" max="90" v-model="latitude" required />
          </label>
          <label>
            Długość geograficzna:
            <input type="number" step="0.00001" min="-180" max="180" v-model="longitude" required />
          </label>
          <button type="button" @click="getGeolocation">Pobierz lokalizację</button>
          <button type="submit">Prognoza</button>
        </form>
        <MapPicker @locationSelected="setLocation" />
      </div>

      <div v-else>
        <WeatherTable :forecastData="forecastData" />
        <WeeklySummary :weeklySummaryResponse="weeklySummaryData" />
      </div>
    </main>
  </div>
</template>

<script>
import WeatherTable from './components/WeatherTable.vue';
import WeeklySummary from './components/WeeklySummary.vue';
import MapPicker from './components/MapPicker.vue';
import { fetchForecast, fetchWeeklySummary } from "./services/weather";

export default {
  name: 'App',
  components: {
    WeatherTable,
    WeeklySummary,
    MapPicker,
  },
  data() {
    return {
      locationSelected: false,
      latitude: null,
      longitude: null,
      forecastData: [],
      weeklySummaryData: [],
      theme: "light",
    };
  },
  methods: {
    async fetchData() {
      try {
        const forecastResponse = await fetchForecast(this.latitude, this.longitude);
        const weeklySummaryResponse = await fetchWeeklySummary(this.latitude, this.longitude);
        this.forecastData = forecastResponse.data;
        this.weeklySummaryData = weeklySummaryResponse.data;
        this.locationSelected = true;
      } catch (error) {
        alert("Nie udało się uzyskać danych. Sprawdź podaną lokalizację lub spróbuj ponownie.");
      }
    },
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", this.theme);
    },
    getGeolocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude.toFixed(5);
            this.longitude = position.coords.longitude.toFixed(5);
          },
          (error) => {
            alert("Nie udało się uzyskać lokalizacji. Sprawdź ustawienia przeglądarki.");
            console.log(error);
          }
        );
      } else {
        alert("Twoja przeglądarka nie obsługuje Geolocation API.");
      }
    },
    setLocation({ lat, lng }) {
      this.latitude = lat.toFixed(5);
      this.longitude = lng.toFixed(5);
    },
  }
}
</script>

<style src="./styles.css"></style>
