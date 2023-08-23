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

    // Add a "from" field to allow accepting tasks on Flex UI
    flex.Actions.replaceAction("AcceptTask", (payload, original) => {
      if (
        !payload.conferenceOptions.from &&
        payload.task._task.attributes.caller &&
        payload.task._task.attributes.caller.startsWith("client:")
      ) {
        payload.conferenceOptions.from = payload.task._task.attributes.caller;
        console.log(
          `VoIP Plugin: Set conferenceOptions.from to ${payload.task._task.attributes.caller}`
        );
      }
      return original(payload);
    });
  }
}
