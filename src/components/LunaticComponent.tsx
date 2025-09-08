// @ts-nocheck
import { Sequence } from "./Sequence";
import { Question } from "./Question";
import { Input } from "./Input";
import { CheckboxBoolean } from "./CheckboxBoolean";
import { Duration } from "./Duration";
import { Radio } from "./Radio";
import { Text as TextOverload } from "./Text";
import { CheckboxGroup } from "./CheckboxGroup";
import { Table } from "./Table";
import { RosterForLoop } from "./RosterForLoop";
import { Loop } from "./Loop";
import type { Interpreter } from "../utils/vtl";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Text, View } from "@react-pdf/renderer";
import { depth, styles } from "./styles";
import { Empty } from "./Empty";
import type { ReactNode } from "react";
import type { LunaticComponentDefinition } from "@inseefr/lunatic";
import { Roundabout } from "./Roundabout";
import { Suggester } from "./Suggester";

const componentTypes = {
  Sequence: Sequence,
  Question: Question,
  Text: TextOverload,
  Textarea: Input,
  Suggester: Suggester,
  Input: Input,
  InputNumber: Input,
  Datepicker: Input,
  Duration: Duration,
  CheckboxBoolean: CheckboxBoolean,
  Radio: Radio,
  CheckboxOne: Radio,
  Dropdown: Radio,
  CheckboxGroup: CheckboxGroup,
  Table: Table,
  Subsequence: Sequence,
  RosterForLoop: RosterForLoop,
  Loop: Loop,
  Roundabout: Roundabout,
  FilterDescription: Empty,
};

/**
 * Renders a single component
 */
export const LunaticComponent = ({
  component,
  interpret,
}: {
  component: LunaticComponentDefinition;
  interpret: Interpreter;
}) => {
  if (component.componentType === "Sequence") {
    depth.current = 1;
  }
  if (component.componentType === "Subsequence") {
    depth.current = 2;
  }
  const visible =
    "conditionFilter" in component
      ? interpret(component.conditionFilter)
      : true;

  if (!visible) {
    return null;
  }

  if (!(component.componentType in componentTypes)) {
    return <Text style={styles.error}>{component.componentType}</Text>;
  }
  const Component =
    componentTypes[component.componentType as keyof typeof componentTypes];
  return (
    <View>
      {/* @ts-expect-error Component is too dynamic here*/}
      <Component interpret={interpret} {...component} />
    </View>
  );
};

/**
 * Renders a list of component using grouping them using sequence
 */
export const LunaticComponents = ({
  components,
  interpret,
}: {
  components: LunaticComponentDefinition[];
  interpret: Interpreter;
}) => {
  // We need to group components per sequence.
  const items: ReactNode[] = [];
  const sequenceType = ["Subsequence", "Sequence"];
  let previousParent = null as LunaticComponentDefinition | null;
  let children: LunaticComponentDefinition[] | null = null;

  for (const component of components) {
    // The component is not a sequence, or is a different type from the current grouping
    if (
      !sequenceType.includes(component.componentType) ||
      (previousParent &&
        previousParent.componentType !== component.componentType)
    ) {
      if (children) {
        children.push(component);
      } else {
        items.push(
          <ErrorBoundary key={component.id} fallbackRender={fallbackRenderer}>
            <LunaticComponent
              component={component}
              interpret={interpret}
              key={component.id}
            />
          </ErrorBoundary>
        );
      }
      continue;
    }

    // We encountered a Sequence or subsequence
    // If we have collected children, create a new component
    if (children && children.length > 0) {
      items.push(
        <Sequence
          interpret={interpret}
          {...previousParent}
          key={previousParent.id}
        >
          <LunaticComponents components={children} interpret={interpret} />
        </Sequence>
      );
    }

    children = [];
    previousParent = component;
  }

  if (children && children.length > 0) {
    items.push(
      <Sequence
        interpret={interpret}
        {...previousParent}
        key={previousParent.id}
      >
        <LunaticComponents components={children} interpret={interpret} />
      </Sequence>
    );
  }

  return <>{items}</>;
};

const fallbackRenderer = ({ error }: FallbackProps) => {
  return (
    <Text style={styles.error}>
      Error rendering {component.componentType} : {error.toString()} #
      {component.id}
    </Text>
  );
};
