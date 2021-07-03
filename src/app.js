const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectorPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectorPath));

app.get("", (req, res) =>
  res.render("index", { title: "Weather", name: "Aron" })
);

app.get("/weather", (req, res) => {
  console.log(req.query.address);
  if (!req.query.address) {
    res.send({ erros: "You must provide an address!" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          res.send(error);
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send(error);
          }
          // console.log("Location: ", data);
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/about", (req, res) =>
  res.render("about", { title: "About", name: "Aron" })
);
app.get("/help", (req, res) =>
  res.render("help", { title: "Help", name: "Aron" })
);

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Arun",
    errorMessage: "Page Not Found",
  });
});
app.listen(port, () => console.log("server is running at port" + port));
