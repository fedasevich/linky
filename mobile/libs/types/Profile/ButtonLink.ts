import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Gradient } from "./Gradient";

export type ButtonLink = {
  icon: IconDefinition;
  className: string;
  isGradient: boolean;
  gradient?: Gradient;
};
