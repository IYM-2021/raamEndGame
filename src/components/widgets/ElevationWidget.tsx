import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {IPoint} from 'types/IPoint';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearAreaSeries} from 'components/widgets/shared/BasicAreaSeries';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';

const Limits = {
    a: 8,
    b: 12
}

function timeCompare(a: { x: any; }, b: { x: any; }){
    let timeA = a.x;
    let timeB = b.x;
    let comparison = 0;

    if (timeA > timeB) {
        comparison = 1;
    } else if (timeA < timeB) {
        comparison = -1;
    }
    return comparison;
}

export interface IElevationWidgetProps extends IDefaultWidgetProps {
  elevation: IPoint[];
  timeImpactOfRest: IPoint[];
}

export const ElevationWidget: React.FC<IElevationWidgetProps> = props => (
  <div>
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.elevation.length > 2 && props.elevation.length > 2 ? 'ready' : 'loading'}
    title="Elevation over Predicted Time"
    useHorizontalGridLines={true}>
    {LinearAreaSeries({
      data: props.elevation.sort(timeCompare).filter(function(input) {
        return input.x < Limits.b && input.x > Limits.a
      }),
      lineColor: 'orange',
      fillColor: '#FFCF9E'
    })}
    {LinearLineSeries({
      data: props.timeImpactOfRest.sort(timeCompare).filter(function(input) {
        return input.x < Limits.b && input.x > Limits.a
      }),
      lineColor: 'green'
    })}
    {BasicHorizontalAxis({
      axisLabel: "Time (Minutes)",
    })}
    {BasicVerticalAxis({
      axisLabel: "Elevation Level"
    })}
  </XYPlotTemplate>
  <button onClick={()=>{
      console.log(props.timeImpactOfRest);
  }}>Hello 1</button>
  <button onClick={()=>{
      Limits.a = 1;
      Limits.b = 10
  }}>Hello 2</button>
  </div>
);
