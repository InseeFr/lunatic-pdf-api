import type { LunaticComponentProps } from "../types";
import { LunaticComponent } from "./LunaticComponent";
import { ValueWithLabel } from "./ValueWithLabel";

type Props = LunaticComponentProps<"Question">;

export function Question({ interpret, label, components }: Props) {
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      {components.map((component, k) => (
        <LunaticComponent key={k} component={component} interpret={interpret} />
      ))}
    </ValueWithLabel>
  );
}
