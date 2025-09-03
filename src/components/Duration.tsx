import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { styles } from "./styles";
import { Text } from "@react-pdf/renderer";

type Props = LunaticComponentProps<"Duration">;

function periodToString(duration?: string): string | null {
  if (!duration) {
    return null;
  }
  const regex =
    /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
  const match = regex.exec(duration);

  if (!match) {
    throw new Error(`Durée ISO 8601 invalide : ${duration}`);
  }

  const [_, years, months, days, hours, minutes, seconds] = match;

  const parts: string[] = [];

  if (years) parts.push(`${years} ${Number(years) > 1 ? "ans" : "an"}`);
  if (months) parts.push(`${months} mois`); // 'mois' same plural otherwise : ${Number(months) > 1 ? "mois" : "mois"}
  if (days) parts.push(`${days} ${Number(days) > 1 ? "jours" : "jour"}`);
  if (hours) parts.push(`${hours} ${Number(hours) > 1 ? "heures" : "heure"}`);
  if (minutes)
    parts.push(`${minutes} ${Number(minutes) > 1 ? "minutes" : "minute"}`);
  if (seconds)
    parts.push(`${seconds} ${Number(seconds) > 1 ? "secondes" : "seconde"}`);

  return parts.join(" ");
}

export function Duration({ interpret, label, response }: Props) {
  return (
    <ValueWithLabel label={interpret(label)}>
      <Text style={styles.answer}>
        {periodToString(interpret(response.name) as string)}
      </Text>
    </ValueWithLabel>
  );
}
