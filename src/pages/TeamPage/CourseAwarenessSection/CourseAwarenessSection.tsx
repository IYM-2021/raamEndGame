import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {ElevationWidget} from 'components/widgets/ElevationWidget';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {SelectField} from 'components/form/fields/SelectField';
import {IPoint} from 'types/IPoint';
import {FlexColumn} from 'components/layout/FlexColumn';
import {InputRow} from 'components/form/InputRow/InputRow';
import {StackedInputCell} from 'components/form/StackedInputCell/StackedInputCell';



const AWARENESS_SELECT_VALUES = [
  {id: "5", displayValue: "5 minutes"},
  {id: "20", displayValue: "20 minutes"},
  {id: "60", displayValue: "1 hour"},
  {id: "240", displayValue: "4 hours"},
  {id: "360", displayValue: "6 hours"},
  {id: "480", displayValue: "8 hours"}
];

export interface ICourseAwarenessSectionProps {
  graphWidthPx: number;
  graphHeightPx: number;
  numPointsBeforeLoad: number;

  selectedAwarenessRangeId: string;

  elevation: IPoint[];

  onChangeCourseAwarenessDuration: (id: string) => void;
}

export const CourseAwarenessSection: React.FC<ICourseAwarenessSectionProps> = props => (
  <Section>
    <Heading><RedWord>Course</RedWord> Awareness</Heading>

    <FlexColumn>
      <InputRow>
        <StackedInputCell>
          <label>Duration to View</label>
          <SelectField
            selectedId={props.selectedAwarenessRangeId}
            options={AWARENESS_SELECT_VALUES}
            onChange={props.onChangeCourseAwarenessDuration} />
        </StackedInputCell>
      </InputRow>

    </FlexColumn>

    <ElevationWidget
      numPointsBeforeLoad={props.numPointsBeforeLoad}
      data={props.elevation}
      heightPx={props.graphHeightPx}
      widthPx={props.graphWidthPx} />

    <FlexRow justifyContent="flex-end">
      <FlexCell>
        <SelectField
          options={AWARENESS_SELECT_VALUES}
          onChange={props.onChangeCourseAwarenessDuration} />
      </FlexCell>
    </FlexRow>
  </Section>
);