// Shared looks for video covers (project card and project page hero)

// Tileable noise texture for a film-grain overlay
export const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>'
)}")`;

// IBM blue/purple gradient. The IBM video is a white logo on a dark
// background; it's screen-blended over this so the dark parts take on colour.
export const IBM_TINT =
  "radial-gradient(circle at 20% 15%, #4589ff 0%, transparent 55%), radial-gradient(circle at 85% 90%, #a56eff 0%, transparent 55%), linear-gradient(135deg, #0f2a7a, #2a1460)";
