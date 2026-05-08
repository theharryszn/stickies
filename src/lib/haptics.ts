import { WebHaptics } from "web-haptics";
import type { HapticInput } from "web-haptics";

let haptics: WebHaptics | null = null;

export const triggerHaptic = (input: HapticInput = "selection") => {
  if (typeof window === "undefined" || !WebHaptics.isSupported) {
    return;
  }

  haptics = haptics || new WebHaptics({ showSwitch: false });
  void haptics.trigger(input).catch(() => {
    // Haptics are progressive enhancement; unsupported calls should stay quiet.
  });
};
