import React, { FC } from "react";
import { observer } from "mobx-react";
import Plot from "react-plotly.js";
import { useMobx } from "../models/RootModel";
import Select from "react-select";
import { action } from "mobx";

const options = [
  { value: "firstObject", label: "First data object" },
  { value: "secondObject", label: "Second data object" },
];

interface IHomePageInterface {}

export const Home: FC<IHomePageInterface> = observer(
  (props: IHomePageInterface) => {
    const state = useMobx();
    const onChange = action((option) => {
      state.chosenObject = option.value;
    });
    const onHover = action((args) => {
      state.tooltipX = args.event.clientX;
      state.tooltipY = args.event.clientY;
      state.tooltipVisible = true;
      state.hoverData = { xvals: args.xvals, yvals: args.yvals };
    });
    const onUnhover = action(() => {
      state.tooltipVisible = false;
    });
    return (
      <>
        <h4> Select a data source: </h4>
        <Select
          options={options}
          onChange={onChange}
          defaultValue={options[0]}
        />
        <Plot
          onHover={onHover}
          onUnhover={onUnhover}
          data={state[state.chosenObject]}
          layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
        />
        {state.tooltipVisible && (
          <div
            style={{
              position: "absolute",
              top: state.tooltipY,
              left: state.tooltipX + 30,
              minWidth: 100,
              minHeight: 100,
              backgroundColor: "white",
              border: "1px dashed blue",
            }}
          >
            {state.hoverData.xvals}
            {state.hoverData.yvals}
          </div>
        )}
      </>
    );
  }
);
