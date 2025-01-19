<template>
  <div>
    <header>
      <h1>Prognoza pogody</h1>
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
          <button type="submit">Prognoza</button>
        </form>
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
import { fetchForecast, fetchWeeklySummary } from "./services/weather";

export default {
  name: 'App',
  components: {
    WeatherTable,
    WeeklySummary,
  },
  data() {
    return {
      locationSelected: false,
      latitude: null,
      longitude: null,
      forecastData: [],
      weeklySummaryData: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const forecastResponse = await fetchForecast(this.latitude, this.longitude);
        const weeklySummaryResponse = await fetchWeeklySummary(this.latitude, this.longitude);
        this.forecastData = forecastResponse.data;
        this.weeklySummaryData = weeklySummaryResponse.data;
        console.log("weeklySummaryData: ", this.weeklySummaryData);
        this.locationSelected = true;
      } catch (error) {
        alert("Nie udało się uzyskać danych. Sprawdź podaną lokalizację lub spróbuj ponownie.");
      }
    },
  }
}
</script>

<style src="./styles.css"></style>
