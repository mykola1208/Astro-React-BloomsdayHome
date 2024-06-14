import { createConfirmation } from "react-confirm";
import ConfirmDialog from "./ConfirmDialog";

export const confirm = createConfirmation(ConfirmDialog);

export function confirmWrapper(confirmation, mode, options = {}) {
  return confirm({ confirmation, mode, ...options });
}
