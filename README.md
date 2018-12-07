# arcgis-x

<p>
  <a href="https://circleci.com/gh/kenchandev/arcgis-x"><img src="https://circleci.com/gh/kenchandev/arcgis-x.svg?style=svg" alt="CircleCI"/></a>
  <a href="https://npmjs.org/package/arcgis-x"><img src="https://img.shields.io/npm/v/arcgis-x.svg?style=flat" alt="NPM" /></a>
  <a href="https://github.com/kenchandev/arcgis-x/pulls"><img src="https://img.shields.io/badge/PRs%20-welcome-brightgreen.svg" alt="PR's Welcome"/></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/></a>
</p>

Node.js library for converting ArcGIS REST Service data to GeoJSON or CSV-KML ([Google Earth](https://www.google.com/earth/), [Google Fusion Tables](https://support.google.com/fusiontables/answer/2571232))

### Installation

NPM:

```bash
$ npm install --save arcgis-x
```

### Example Usage

#### Import

```javascript
import arcgisX from "arcgis-x";
```

```javascript
let sample = {
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
```

#### `toGeoJson()`

```javascript
let geojson = arcgisX.toGeoJson(sample);

//  {
//    type: 'FeatureCollection',
//    features: [
//      { type: 'Feature', geometry: [Polygon], properties: [Object] }
//    ]
//  }
```

#### `toKml()`

```javascript
let kml = arcgisX.toKml(
  sample,
  {
    stroke: "#666666",
    "stroke-width": 2,
    fill: "#ff0000",
    "fill-opacity": 0.5
  },
  { simplestyle: true }
);

//  <?xml version="1.0" encoding="UTF-8"?>
//  <kml xmlns="http://www.opengis.net/kml/2.2">
//    <Document>
//      <Style id="s666666sw2fff0000fo05">
//        <LineStyle>
//          <color>ff666666</color>
//          <width>2</width>
//        </LineStyle>
//        <PolyStyle>
//          <color>7f0000ff</color>
//        </PolyStyle>
//      </Style>
//      <Placemark>
//        <ExtendedData>
//          <Data name="borough">
//            <value>Brooklyn</value>
//          </Data>
//          <Data name="stroke">
//            <value>#666666</value>
//          </Data>
//          <Data name="stroke-width">
//            <value>2</value>
//          </Data>
//          <Data name="fill">
//            <value>#ff0000</value>
//          </Data>
//          <Data name="fill-opacity">
//            <value>0.5</value>
//          </Data>
//        </ExtendedData>
//        <Polygon>
//          <outerBoundaryIs>
//            <LinearRing>
//              <coordinates>-73.9760507906,40.6312841471 -73.985096634,40.6425812992 -74.0055663475,40.633091417//2 -73.9751732026,40.6147324241 -73.9770549624,40.6215407613 -73.9760507906,40.6312841471</coordinates>
//            </LinearRing>
//          </outerBoundaryIs>
//        </Polygon>
//        <styleUrl>#s666666sw2fff0000fo05</styleUrl>
//      </Placemark>
//    </Document>
//  </kml>
```

#### `toCsvKml()`

```javascript
let csvKml = arcgisX.toCsvKml(sample);

//  "borough"|"geometry"
//  "Brooklyn"|"<Polygon><outerBoundaryIs><LinearRing><coordinates>-73.9760507906,40.6312841471 -73.985096634,40.6425812992 -74.0055663475,40.6330914172 -73.9751732026,40.6147324241 -73.9770549624,40.6215407613 -73.9760507906,40.6312841471</coordinates></LinearRing></outerBoundaryIs></Polygon>"
```

### Roadmap (Tentative)

- Directly upload CSV-KML output to Google Fusion Table.
- Read input from files. Write output to files.

### License

MIT
