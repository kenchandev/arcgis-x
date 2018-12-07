import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

export default {
  entry: "index.js",
  dest: "dist/index.js",
  format: "cjs",
  plugins: [
    babel(
      babelrc({
        exclude: "node_modules/**"
      })
    )
  ],
  external: [
    "geojson-precision",
    "json2csv",
    "terraformer-arcgis-parser",
    "tokml"
  ]
};
