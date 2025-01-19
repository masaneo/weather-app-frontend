<template>
    <footer>
        <h2>Ogólne podsumowanie tygodnia:</h2>
        <p>Minimalna temperatura: {{ minTemp }}℃</p>
        <p>Maksymalna temperatura: {{ maxTemp }}℃</p>
        <p>Średnie ciśnienie: {{ avgPressure }}hPa</p>
        <p>Średni czas naświetlenia: {{ (avgSunshine / 3600).toFixed(2) }}h ({{ avgSunshine }}s)</p>
        <p>Opis tygodnia: {{ weeklySummary }}</p>
    </footer>
</template>

<script>
export default {
    name: "WeeklySummary",
    data() {
        return {
            minTemp: 0,
            maxTemp: 0,
            avgPressure: 0,
            avgSunshine: 0,
            weeklySummary: "",
        }
    },
    props: {
        weeklySummaryResponse: Object,    
    },
    created() {
        if (this.weeklySummaryResponse) {
            this.minTemp = this.weeklySummaryResponse.min_temp || this.minTemp;
            this.maxTemp = this.weeklySummaryResponse.max_temp || this.maxTemp;
            this.avgPressure = this.weeklySummaryResponse.avg_pressure || this.avg_pressure;
            this.avgSunshine = this.weeklySummaryResponse.avg_sunshine || this.avg_sunshine;
            this.weeklySummary = this.weeklySummaryResponse.weekly_summary || this.weekly_summary;
        }
    }
};
</script>