const robberyBands = [
  [0, '0', '#e9e5dd'],
  [25, '1–25', '#fbd29e'],
  [75, '26–75', '#f59c58'],
  [150, '76–150', '#de5935'],
  [300, '151–300', '#a92c2b'],
  [Infinity, '301+', '#641427'],
];
const homicideBands = [
  [0, '0', '#e9e5dd'],
  [5, '1–5', '#fbd29e'],
  [15, '6–15', '#f59c58'],
  [30, '16–30', '#de5935'],
  [60, '31–60', '#a92c2b'],
  [Infinity, '61+', '#641427'],
];
const category = document.querySelector('#crime');
const currentBands = () => category.value === 'homicide' ? homicideBands : robberyBands;
const currentUnit = () => category.value === 'homicide' ? 'Vítimas' : 'Ocorrências registradas';
const map = L.map('map', { minZoom: 6, maxZoom: 17 });
const legendControl = L.control({ position: 'bottomright' });
legendControl.onAdd = () => {
  const panel = L.DomUtil.create('section', 'map-legend');
  panel.setAttribute('aria-label', 'Legenda de cores');
  panel.innerHTML = '<strong>Ocorrências registradas</strong><div class="legend"></div>';
  L.DomEvent.disableClickPropagation(panel);
  L.DomEvent.disableScrollPropagation(panel);
  return panel;
};
legendControl.addTo(map);
const legend = legendControl.getContainer().querySelector('.legend');
function renderLegend() {
  legendControl.getContainer().querySelector('strong').textContent = currentUnit();
  legend.replaceChildren();
  for (const [, label, color] of currentBands()) {
    const item = document.createElement('span');
    const swatch = document.createElement('i');
    swatch.style.backgroundColor = color;
    item.append(swatch, label);
    legend.append(item);
  }
}
renderLegend();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 17,
}).addTo(map);

function createOverlay() {
  return L.geoJSON(areas, {
    style(feature) {
      const band = currentBands().find(([upper]) => feature.properties[category.value] <= upper);
      return { color: '#fff', weight: 1, fillColor: band[2], fillOpacity: 0.56 };
    },
    onEachFeature(feature, layer) {
      const { cisp } = feature.properties;
      const total = feature.properties[category.value];
      const crime = category.selectedOptions[0].textContent;
      const label = `Área da ${cisp}ª DP · ${crime} · ${total.toLocaleString('pt-BR')} · ${currentUnit().toLowerCase()}`;
      layer.bindPopup(label);
      layer.on('add', () => {
        const path = layer.getElement();
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', label);
        path.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            layer.openPopup();
          }
        });
      });
    },
  }).addTo(map);
}
let overlay = createOverlay();
category.addEventListener('change', () => {
  overlay.remove();
  overlay = createOverlay();
  renderLegend();
});
map.fitBounds(overlay.getBounds(), { padding: [12, 12] });
