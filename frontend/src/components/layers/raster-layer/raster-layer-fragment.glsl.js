export default `
#define SHADER_NAME raster-layer-fragment-shader

precision highp float;

uniform float opacity;
uniform vec2 colorRange;
uniform sampler2D imageTexture;
uniform sampler2D paletteTexture;

varying vec2 vTexCoord;

void main(void){
  vec2 uv = vTexCoord;

  // fetch the texel (the pixel within the texture) based on the value of the texture coord
  vec4 texel = texture2D(imageTexture, uv);

  // filter out nodata
  if (texel.r < -3000.0) {
    discard;
  }

  // pixel value 0 to 1
  float pixel = (texel.x - colorRange.x) / (colorRange.y - colorRange.x);

  // use the pixel value to look up a color from palette
  vec4 color = texture2D(paletteTexture, vec2(pixel, 0.5));

  gl_FragColor = vec4(color.rgb, color.a * opacity);
}
`;
