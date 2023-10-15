import * as React from "react";
import { useState, useEffect } from "react";
import * as d3 from "d3";

export default function NestedGrid() {
  const [filter, setFilter] = useState("None");

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQa6TK3aH0pdbMqh1Uo5_MC624z4erkRPBCNsBlTBwP93-xEfIgHKurNVn-RfSvxM9LcXwWU68v53K/pub?output=csv";

  async function getData() {
    const resp = await d3.csv(url);
    return resp;
  }

  function getSatisfactionScore(attr) {
    return attr === "Insatisfait" ? 2 : attr === "Satisfait" ? 5 : 10;
  }

  function handleClick() {
    const selectedValue = d3.select(this).property("value");
    console.log("Selected Value: ", selectedValue);
    setFilter(selectedValue);
  }

  function clearDom() {
    // Clear cards
    const container = d3.select(".container");
    container.selectAll("div").remove();
    container.selectAll("select").remove();
  }

  function sortArrayByTransmission(array) {
    const cmp = filter === "Automatique" ? -1 : filter === "Manuelle" ? 1 : 1;

    array.sort((a, b) => {
      const transmissionA = a.Transmission;
      const transmissionB = b.Transmission;

      if (transmissionA === "Manuelle" && transmissionB === "Automatique") {
        return -cmp;
      } else if (
        transmissionA === "Automatique" &&
        transmissionB === "Manuelle"
      ) {
        return cmp;
      }

      return 0;
    });
  }

  function drawCard(myData) {
    sortArrayByTransmission(myData);

    clearDom();
    const container = d3.select(".container");

    const filterText = container
      .append("div")
      .append("h4")
      .text("Filtrer par transmission");

    const select = filterText
      .append("select")
      .attr("class", "form-select-lg mb-3")
      .attr("aria-label", ".form-select-lg example")
      .attr("style", "margin-top:50px;margin-left:20px");

    const options = select
      .selectAll("option")
      .data(["None", "Automatique", "Manuelle"])
      .enter()
      .append("option")
      .attr("value", (item) => item)
      .text((item) => item);

    // console.log(options.filter((d) => d === "Automatique"));
    options.filter((d) => d === filter).attr("selected", "true");
    // Add an event listener to the select element
    select.on("change", handleClick);

    for (let i = 0; i < myData.length; i += 3) {
      const row = container.append("div").attr("class", "row");
      for (let j = i; j < i + 3 && j < myData.length; j++) {
        const cardData = myData[j];
        if (filter === "None" || cardData["Transmission"] === filter) {
          const card = row
            .append("div")
            .attr("class", "card col")
            .style("width", "20em")
            .style("margin", "18px");
          card
            .append("img")
            .attr("src", cardData["image_urls"])
            .attr("class", "card-img-top")
            .attr("style", "min-height:250px")
            .attr("alt", "...");
          const cardBody = card.append("div").attr("class", "card-body");
          cardBody
            .append("h5")
            .attr("class", "card-title")
            .text(cardData["Nom de la voiture"]);
          cardBody
            .append("p")
            .attr("class", "card-text")
            .text(cardData["Description"]);
          const listGroup = card
            .append("ul")
            .attr("class", "list-group list-group-flush");
          listGroup
            .selectAll("li")
            .data([
              { "Nombre de places": cardData["Nombre de places"] },
              { Transmission: cardData["Transmission"] },
              { "Type du moteur": cardData["Type du moteur"] },
            ])
            .enter()
            .append("li")
            .attr("class", "list-group-item")
            .text(
              (item) =>
                Object.keys(item)[0] + " : " + item[Object.keys(item)[0]]
            );
          const cardChart = card.append("div").attr("class", "card-body");

          const ratingScore = [
            getSatisfactionScore(cardData["Avis [Confort]"]),
            getSatisfactionScore(cardData["Avis [Consommation de carburant]"]),
            getSatisfactionScore(cardData["Avis [Puissance moteur]"]),
            getSatisfactionScore(cardData["Avis [Sécurité]"]),
          ];
          const ratingColumn = [
            "Confort",
            "Consomm..",
            "Puissance",
            "Sécurité",
          ];
          // const rectColors = ["#AEDFF7", "#FFA4A4", "#FFEC9E", "#B0E57C"];
          const rectColors = ["#4169E1", "#DC143C", "#FFD700", "#228B22"];

          const height = 150;
          const width = 400;

          const svg = cardChart
            .append("svg")
            .attr("width", width)
            .attr("height", height);

          svg
            .selectAll("rect")
            .data(ratingScore)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 90)
            .attr("y", (d, i) => height - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", (d, i) => rectColors[i])
            .attr("overflow-x", "auto");

          svg
            .selectAll("text")
            .data(ratingScore)
            .enter()
            .append("text")
            .text((d, i) => ratingColumn[i])
            .attr("overflow-x", "auto")
            .attr("x", (d, i) => i * 90)
            .attr("y", (d, i) => height - 10 * d - 3);
        }
      }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      drawCard(data);
    };
    loadData();
  }, [filter]);

  return (
    <div id="all">
      <div className="container"></div>
    </div>
  );
}
