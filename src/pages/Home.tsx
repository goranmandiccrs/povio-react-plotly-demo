import * as React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Select from "react-select";
import { action } from "mobx";
import { useMobx } from "../models/RootModel";
import { observer } from "mobx-react";

export const Home = observer((props: HighchartsReact.Props) => {
  const state = useMobx();
  const onChange = action((option) => {
    state.selectedOption = state[option.value];
  });
  return (
    <div>
      <Select
        options={state.dropdownOptions}
        onChange={onChange}
        defaultValue={state.dropdownOptions[0]}
      />
      <HighchartsReact
        highcharts={Highcharts}
        immutable={false}
        options={state.selectedOption}
        {...props}
      />
    </div>
  );
});
