import Plotly from "plotly.js";
import React, { FC } from "react";
import { observer } from "mobx-react";
import fetch from "isomorphic-fetch";
import ReactJSONEditor from "../components/ReactJSONEditor.react.js";
import Select from "react-select";
import SplitPane from "react-split-pane";

import createPlotlyComponent from "react-plotly.js/factory";

import "../App.css";
import "../styles/Resizer.css";

/* JSON Editor styling */
import "../styles/autocomplete.css";
import "../styles/contextmenu.css";
import "../styles/jsoneditor.css";
import "../styles/menu.css";
import "../styles/reset.css";
import "../styles/searchbox.css";

import "react-select/dist/react-select.css";
import { getPlotActions } from "../actions/plot.actions";
import { useMobx } from "../models/RootModel";

interface IHomePageInterface {}

const Plot = createPlotlyComponent(Plotly);

export const Home: FC<IHomePageInterface> = observer(
  (props: IHomePageInterface) => {
    const state = useMobx();
    const { getMocks } = getPlotActions(state);

    return (
      <div className="App">
        <SplitPane split="vertical" minSize={100} defaultSize={400}>
          <div>
            <div className="controls-panel">
              <Select.Async
                name="plotlyjs-mocks"
                loadOptions={getMocks}
                placeholder={"Search plotly.js mocks"}
                onChange={handleNewPlot}
                className={"no-select"}
              />
            </div>
            <ReactJSONEditor
              json={state.json}
              onChange={handleJsonChange}
              plotUrl={state.plotUrl}
            />
          </div>
          <div>
            <div className="controls-panel">
              <Select.Async
                name="plot-search-bar"
                loadOptions={getPlots}
                placeholder={searchPlaceholder}
                onChange={handleNewPlot}
                ref="plotSearchBar"
                cache={false}
                className={"no-select"}
              />
              <br />
              <input
                placeholder={plotInputPlaceholder}
                onBlur={handleNewPlot}
                style={{ padding: "10px", width: "95%", border: 0 }}
                value={state.plotUrl}
                className={"no-select"}
              />
            </div>
            <Plot
              data={state.json.data}
              layout={state.json.layout}
              config={{ displayModeBar: false }}
            />
          </div>
        </SplitPane>
      </div>
    );
  }
);
