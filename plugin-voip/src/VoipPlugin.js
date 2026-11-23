import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";

const PLUGIN_NAME = "VoipPlugin";

export default class VoipPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    // Update Flex Config to Enable "client:" to allowing calling to other "clients"
    flex.Manager.getInstance().updateConfig({ enableClientCalling: true });

    // Set Caller ID
    flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {
      if (payload.destination.startsWith("client:")) {
        manager.user.identity
          ? (payload.callerId = `client:${manager.user.identity}`)
          : (payload.callerId = `client:voip`);
      }
      original(payload);
    });

    // Add a "from" field to allow accepting tasks on Flex UI.
    // Calls arriving via the TwiML App have `to` set to the App SID (AP...).
    // Without an explicit `from`, TaskRouter uses that `to` as the caller ID
    // for the agent leg, which fails with 21212 (Invalid 'From' number).
    flex.Actions.replaceAction("AcceptTask", (payload, original) => {
      const attributes = (payload.task && payload.task.attributes) || {};
      const { caller, to } = attributes;
      const isVoipCall =
        (typeof to === "string" && to.startsWith("AP")) ||
        (typeof caller === "string" && caller.startsWith("client:"));

      if (payload.conferenceOptions && !payload.conferenceOptions.from && isVoipCall && caller) {
        payload.conferenceOptions.from = caller;
        console.log(`VoIP Plugin: Set conferenceOptions.from to ${caller}`);
      }
      return original(payload);
    });
  }
}
