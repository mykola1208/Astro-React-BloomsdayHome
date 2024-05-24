import { createConfirmation } from "react-confirm";
import ConfirmDialog from "./ConfirmDialog";

export const confirm = createConfirmation(ConfirmDialog);

export function confirmWrapper(confirmation, options = {}) {
  return confirm({ confirmation, ...options });
}
