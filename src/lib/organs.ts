import type { OrganId } from "@/types/organ";

export type OrganConfig = {
  id: OrganId;
  label: string;
  role: string;
  facts: [string, string, string];
  meshNames: string[];
};

export const MODEL_URL =
  "/models/female_health_model (1).glb";

export const ORGANS: Record<OrganId, OrganConfig> = {
  uterus: {
    id: "uterus",
    label: "Uterus",
    role: "The uterus supports menstrual changes and can carry a pregnancy.",
    facts: [
      "Its muscular walls change across the menstrual cycle.",
      "The lining can thicken and later shed during menstruation.",
      "It expands as part of pregnancy to accommodate a developing baby.",
    ],
    meshNames: ["organ_uterus"],
  },
  ovaries: {
    id: "ovaries",
    label: "Ovaries",
    role: "The ovaries store eggs and help produce reproductive hormones.",
    facts: [
      "Most people have two ovaries, one on each side of the uterus.",
      "They release eggs and hormones that help regulate the menstrual cycle.",
      "Ovaries also contribute to estrogen and progesterone signaling.",
    ],
    meshNames: ["organ_ovary_left", "organ_ovary_right"],
  },
  brain: {
    id: "brain",
    label: "Brain",
    role: "The brain coordinates body functions and helps process hormones and feelings.",
    facts: [
      "It receives signals from throughout the body.",
      "It helps regulate sleep, movement, sensation, and emotions.",
      "Hormonal signals are interpreted alongside many other body signals.",
    ],
    meshNames: ["organ_brain"],
  },
};
