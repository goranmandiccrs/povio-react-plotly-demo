import { action } from "mobx";
import fetch from "isomorphic-fetch";

export const getPlotActions = (state) => {
  return {
    getMocks: action(() => {
      return fetch(
        "https://api.github.com/repositories/45646037/contents/test/image/mocks"
      )
        .then((response) => response.json())
        .then((json) => {
          return {
            complete: true,
            options: json.map(function (o) {
              return {
                label: o.name,
                value: o.download_url,
              };
            }),
          };
        });
    }),
    handleNewPlot: action((state, option) => {
      let url = "";
      if ("value" in option) {
        url = option.value;
      } else if ("target" in option) {
        url = option.target.value;
        if (url.includes("http")) {
          if (!url.includes(".json")) {
            url = url + ".json";
          }
        }
      }

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((newJSON) => {
            if ("layout" in newJSON) {
              if ("height" in newJSON.layout) {
                newJSON.layout.height = null;
              }
              if ("width" in newJSON.layout) {
                newJSON.layout.width = null;
              }
            }
            this.setState({
              json: newJSON,
              plotUrl: url,
            });
          });
      }
    }),
    getPlots: action((state, input) => {
      if (!input) {
        return Promise.resolve({ options: [] });
      }

      let urlToFetch = `https://api.plot.ly/v2/search?q=${input}`;

      return fetch(urlToFetch)
        .then((response) => response.json())
        .then((json) => {
          return {
            options: json.files.map(function (o) {
              return {
                label: `${o.filename} by ${o.owner}, ${o.views} views`,
                value: o.web_url.replace(/\/$/, "") + ".json",
              };
            }),
          };
        });
    }),
  };
};
