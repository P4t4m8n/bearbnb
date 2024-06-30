// export class HTMLMarker extends google.maps.OverlayView {
//   private position: google.maps.LatLng;
//   private content: string;
//   private div?: HTMLDivElement;

//   constructor(position: google.maps.LatLng, content: string) {
//     super();
//     this.position = position;
//     this.content = content; 
//   }

//   onAdd() {
//     const div = document.createElement("div");
//     div.style.position = "absolute";
//     div.innerHTML = this.content;

//     this.div = div;

//     const panes = this.getPanes();
//     panes!.overlayMouseTarget.appendChild(div);
//   }

//   draw() {
//     // Ensure div exists
//     if (!this.div) {
//       throw new Error("Div is not initialized");
//     }

//     const overlayProjection = this.getProjection();
//     const coordinates = overlayProjection.fromLatLngToDivPixel(this.position);

//     this.div.style.left = `${coordinates!.x}px`;
//     this.div.style.top = `${coordinates!.y}px`;
//   }

//   onRemove() {
//     if (this.div) {
//       this.div.parentNode?.removeChild(this.div);
//       this.div = undefined;
//     }
//   }
// }
