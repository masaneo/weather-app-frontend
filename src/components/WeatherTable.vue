<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Pogoda</th>
                    <th>Maks. temp.</th>
                    <th>Min. temp.</th>
                    <th>Energia (kWh)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(day, index) in forecastData" :key="index">
                    <td>{{ formatDate(day.date) }}</td>
                    <td>
                        <i :class="getWeatherIcon(day.weather_code)" class="icon"></i>
                    </td>
                    <td>{{ day.temp_max }}℃</td>
                    <td>{{ day.temp_min }}℃</td>
                    <td>{{ day.estimated_energy_kwh }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "WeatherTable",
    props: {
        forecastData: Array,
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-GB");
        },
        getWeatherIcon(code) {
            let icon = "fa-question"; // Default icon

            switch (true) {
                case (code >= 0 && code <= 19):
                    if (code === 1 || code === 0) {
                    icon = "fa-sun"; // Sunny
                    } else if (code === 2) {
                    icon = "fa-cloud-sun"; // Clouds with sun
                    } else {
                    icon = "fa-cloud"; // Clouds
                    }
                    break;

                // Precipitations: drizzle, rain, snowflakes, etc. (20-69)
                case (code >= 20 && code <= 69):
                    icon = "fa-cloud-showers-heavy";
                    break;

                // Storms
                case (code >= 80 && code <= 99):
                    icon = "fa-bolt";
                    break;
                
                //  Default, not from any category
                default:
                    icon = "fa-question";
                    break;
            }

            return `fa ${icon}`;
        },
    },
};
</script>