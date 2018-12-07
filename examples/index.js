import fs from "fs";
import path from "path";
import arcgisX from "../index";

fs.readFile(
  path.join(__dirname, "data", "nyc-neighborhoods.json"),
  "utf-8",
  (err, data) => {
    if (err) {
      throw err;
    }

    Promise.all([
      new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(__dirname, "data", "nyc-neighbohoods.csv"),
          arcgisX.toCsvKml(data),
          (err, data) => {
            if (err) {
              reject(err);
            }

            resolve(data);
          }
        );
      }),
      new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(__dirname, "data", "nyc-neighbohoods.kml"),
          arcgisX.toKml(
            data,
            {
              stroke: "#666666",
              "stroke-width": 2,
              fill: "#ff0000",
              "fill-opacity": 0.5
            },
            { simplestyle: true }
          ),
          (err, data) => {
            if (err) {
              reject(err);
            }

            resolve(data);
          }
        );
      })
    ])
      .then(() => {
        console.log("Success!");
      })
      .catch(err => {
        console.log(err);
      });
  }
);
