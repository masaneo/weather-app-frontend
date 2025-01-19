<template>
    <div id="map"></div>
</template>

<script>
import L from "leaflet";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

export default {
    emits: ['locationSelected'],
    mounted() {
        const defaultIcon = L.icon({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
        
        L.Marker.prototype.options.icon = defaultIcon;

        const map = L.map('map').setView([52.00, 19.00], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        const marker = L.marker([52.0, 19.00], {draggable: true}).addTo(map);
        marker.on('dragend', () => {
            const position = marker.getLatLng();
            this.$emit('locationSelected', position);
        });
    },
};
</script>