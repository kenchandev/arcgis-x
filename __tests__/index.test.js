import arcgisX from "../index";
import { collectionOf } from "@turf/invariant";
import csvParser from "papaparse";
import xmlParser from "fast-xml-parser";

const sample = {
  spatialReference: {
    wkid: 4326
  },
  features: [
    {
      attributes: {
        borough: "Brooklyn"
      },
      geometry: {
        rings: [
          [
            [-73.9760507905698, 40.6312841471042],
            [-73.9770549623761, 40.6215407613162],
            [-73.9751732026353, 40.6147324241179],
            [-74.0055663474715, 40.6330914171937],
            [-73.985096633962, 40.6425812992004],
            [-73.9760507905698, 40.6312841471042]
          ]
        ]
      }
    }
  ]
};

test("`toGeoJson()` converts ArcGIS JSON to valid GeoJSON", () => {
  expect(() => {
    collectionOf(arcgisX.toGeoJson(sample), "Polygon", "sample");
  }).not.toThrow();
});

test("`toCsvKml()` converts ArcGIS JSON to CSV-KML", () => {
  expect(csvParser.parse(arcgisX.toCsvKml(sample)).data.length).toBe(2);
});

test("`toKml()` converts ArcGIS JSON to KML", () => {
  expect(
    xmlParser.validate(
      arcgisX.toKml(
        sample,
        {
          stroke: "#666666",
          "stroke-width": 2,
          fill: "#ff0000",
          "fill-opacity": 0.5
        },
        { simplestyle: true }
      )
    )
  ).toBe(true);
});
