import * as React from "react";
import { useState, useEffect } from "react";
import { Axios } from "axios";
import * as d3 from "d3";

export default function NestedGrid() {
  // Créez un tableau de données avec les informations de chaque carte
  const data = [
    {
      imgSrc:
        "https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg",
      cardTitle: "Card title 1",
      cardText: "Some quick example text for card 1.",
      listItems: ["Item 1", "Item 2", "Item 3"],
      cardLink1: "Card link 1",
      cardLink2: "Another link 1",
    },
    {
      imgSrc:
        "https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg",
      cardTitle: "Card title 2",
      cardText: "Some quick example text for card 2.",
      listItems: ["Item 4", "Item 5", "Item 6"],
      cardLink1: "Card link 2",
      cardLink2: "Another link 2",
    },
    {
      imgSrc:
        "https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg",
      cardTitle: "Card title 3",
      cardText: "Some quick example text for card 3.",
      listItems: ["Item 7", "Item 8", "Item 9"],
      cardLink1: "Card link 3",
      cardLink2: "Another link 3",
    },
  ];

  function drawChart() {
    const container = d3.select(".container");

    for (let i = 0; i < data.length; i += 3) {
      const row = container.append("div").attr("class", "row");
      for (let j = i; j < i + 3 && j < data.length; j++) {
        const cardData = data[j];
        const card = row
          .append("div")
          .attr("class", "card col")
          .style("width", "18em")
          .style("margin", "18px");

        card
          .append("img")
          .attr("src", cardData.imgSrc)
          .attr("class", "card-img-top")
          .attr("alt", "...");

        const cardBody = card.append("div").attr("class", "card-body");

        cardBody
          .append("h5")
          .attr("class", "card-title")
          .text(cardData.cardTitle);

        cardBody.append("p").attr("class", "card-text").text(cardData.cardText);

        const listGroup = card
          .append("ul")
          .attr("class", "list-group list-group-flush");

        listGroup
          .selectAll("li")
          .data(cardData.listItems)
          .enter()
          .append("li")
          .attr("class", "list-group-item")
          .text((item) => item);

        const cardLinks = card.append("div").attr("class", "card-body");

        cardLinks
          .append("a")
          .attr("href", "#")
          .attr("class", "card-link")
          .text(cardData.cardLink1);

        cardLinks
          .append("a")
          .attr("href", "#")
          .attr("class", "card-link")
          .text(cardData.cardLink2);
      }
    }
  }

  useEffect(() => {
    // drawChart();
  }, []);

  return (
    <div id="all">
      <div className="container">
        <div className="card col" style={{ width: "18em" }}>
          <img
            src="https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li
              className="row"
              style={{ width: "20em", alignContent: "center" }}
            >
              <div className="col">
                <div className="card-body ">An item</div>
              </div>
              <div className="col">
                <div className="card-body ">An item</div>
              </div>
            </li>
            <li
              className="row"
              style={{ width: "20em", alignContent: "center" }}
            >
              <div className="col">
                <div className="card-body ">An item</div>
              </div>
              <div className="col">
                <div className="card-body ">An item</div>
              </div>
            </li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
