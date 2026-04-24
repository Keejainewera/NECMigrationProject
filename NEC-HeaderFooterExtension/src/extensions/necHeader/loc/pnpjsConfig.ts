import { spfi, SPFI } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

let _sp: SPFI | undefined = undefined;

/**
 * Initializes PnPjs with SPFx context
 * Call this in onInit() of your web part or extension
 */
export const setupSP = (context: ApplicationCustomizerContext): void => {
  _sp = spfi().using(SPFx(context));
};

/**
 * Returns configured PnPjs SPFI instance
 * Use this in your components or service layer
 */
export const getSP = (): SPFI => {
  if (!_sp) {
    throw new Error("PnPjs not initialized. Call setupSP(context) first.");
  }
  return _sp;
};