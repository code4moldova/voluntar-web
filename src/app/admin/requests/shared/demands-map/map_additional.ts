export function widgetViewCoordinatesInit(): void {
  // Widget view coordinates
  this.coordsWidget = document.createElement('Coordinates');
  this.mapViewEl.nativeElement.appendChild(this.coordsWidget);
  this.coordsWidget.id = 'coordsWidget';
  this.coordsWidget.className = 'esri-widget esri-component';
  this.coordsWidget.style.padding = '5px 2px 1px';
  this.coordsWidget.style.width = '550px';
  this.coordsWidget.style.height = '20px';
  this.mapView.ui.add(this.coordsWidget, 'bottom-right');
}

export function showCoordinates(pt: {
  latitude: number;
  longitude: number;
}): void {
  this.coordsWidget.innerHTML = `Lat/Lon ${pt.latitude} / ${pt.longitude}
    | Scale 1:${Math.round(this.mapView.scale * 1) / 1} | Zoom
    ${this.mapView.zoom}`;
}
