import arcgis from "terraformer-arcgis-parser";
import gp from "geojson-precision";
import tokml from "tokml";
import { parse as jsonCsv } from "json2csv";
import { MULTI_POLYGON_KML, POLYGON_KML } from "./enums";
import { deserialize } from "./utils";

class ArcGisX {
  toGeoJson(data, simpleStyle = {}) {
    let json = deserialize(data),
      features = [];

    if (json.spatialReference.wkid !== 4326) {
      throw new Error(
        '`spatialReference.wkid` must be 4326. Set the "Output Spatial Reference" to 4326.'
      );
    }

    for (let i = 0, feature = {}; (feature = json.features[i]); i++) {
      let geometry = arcgis.parse({
        type: "polygon",
        rings: feature.geometry.rings,
        spatialReference: { wkid: json.spatialReference.wkid }
      });

      features.push({
        type: "Feature",
        geometry: gp.parse(geometry, 10),
        properties: { ...feature.attributes, ...simpleStyle }
      });
    }

    return {
      type: "FeatureCollection",
      features
    };
  }

  toCsvKml(data) {
    let geoJson = this.toGeoJson(data),
      fields = [...Object.keys(geoJson.features[0].properties), "geometry"];

    return jsonCsv(
      geoJson.features.map(feature => {
        let geometry = "",
          kml = tokml({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: feature.geometry,
                properties: { ...feature.properties }
              }
            ]
          });

        if (MULTI_POLYGON_KML.test(kml)) {
          geometry = kml.match(MULTI_POLYGON_KML)[0];
        } else if (POLYGON_KML.test(kml)) {
          geometry = kml.match(POLYGON_KML)[0];
        }

        return { ...feature.properties, geometry };
      }),
      { fields, delimiter: "|" }
    );
  }

  toKml(data, simpleStyle, options) {
    return tokml(this.toGeoJson(data, simpleStyle), options);
  }
}

export default ArcGisX;
