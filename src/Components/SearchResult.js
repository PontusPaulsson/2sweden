import React from "react";

//TODO Skicka in data till props och rendera ut detta i HTML.
export const SearchResult = props => {
  console.log(props.data);

  var hej = props.data.routes.map(car => {
    return <li>{car.name}</li>;
  });

  return (
    <div>
      <h1>Results</h1>
      <ul>{hej}</ul>
    </div>
  );
};
