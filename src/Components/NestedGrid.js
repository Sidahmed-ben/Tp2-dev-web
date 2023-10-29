import * as React from "react";
import { useState, useEffect } from "react";
import * as d3 from "d3";

export default function NestedGrid() {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost/omeka-s/api/items");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  };

  function clearDom() {
    // Clear cards
    const container = d3.select(".container");
    container.selectAll("div").remove();
    container.selectAll("select").remove();
  }

  function drawCard(myData) {
    clearDom();
    const container = d3.select(".container");

    for (let i = 0; i < myData.length; i += 3) {
      const row = container.append("div").attr("class", "row");
      for (let j = i; j < i + 3 && j < myData.length; j++) {
        const cardData = myData[j];
        const card = row
          .append("div")
          .attr("class", "card col")
          .style("margin", "18px");
        card
          .append("img")
          .attr("src", cardData["Image"])
          .attr("class", "card-img-top")
          .attr("style", "max-height:300px")
          .attr("alt", "...");
        const cardBody = card.append("div").attr("class", "card-body");
        cardBody
          .append("h5")
          .attr("class", "card-title")
          .text(cardData["Title"]);
        const listGroup = card
          .append("ul")
          .attr("class", "list-group list-group-flush");
        listGroup
          .selectAll("li")
          .data([{ Description: cardData["Description"] }])
          .enter()
          .append("li")
          .attr("class", "list-group-item")
          .attr("style", "padding:20px;background-color:rgb(100, 191, 180,0.2)")
          .text(
            (item) => Object.keys(item)[0] + " : " + item[Object.keys(item)[0]]
          );
      }
    }
  }

  useEffect(() => {
    const structuredData = [];
    const loadData = async () => {
      const data = await fetchData();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let obj = {
          Title: element["dcterms:title"][0]["@value"],
          Description: element["dcterms:description"][0]["@value"],
          Image: element["foaf:img"][0]["@value"],
        };
        structuredData.push(obj);
      }

      drawCard(structuredData);
    };
    loadData();
  }, []);

  return (
    <div id="all">
      <div className="container"></div>
    </div>
  );
}
