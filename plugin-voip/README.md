# Twilio Flex VoIP Plugin

Twilio Flex VoIP plugin allows agents to accept incoming VoIP calls and perform outbound VoIP calls to `client:` via the native [Flex Dialpad](https://www.twilio.com/docs/flex/end-user-guide/dialpad-use)

_Note: This Twilio Flex VoIp plugin does not have any user interface (UI)_

---

## Pre-requisites

1. Twilio Flex Account ([Guide](https://support.twilio.com/hc/en-us/articles/360020442333-Setup-a-Twilio-Flex-Account))
2. Native Flex Dialpad enabled on Twilio Flex Account ([Guide](https://www.twilio.com/docs/flex/admin-guide/setup/voice/dialpad-configure))
3. Node.js v16.x.x ([Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
4. Twilio CLI v5.4.1 or above ([Guide](https://www.twilio.com/docs/twilio-cli/quickstart))
5. Twilio CLI Flex Plugin v6.0.4 or above ([Guide](https://www.twilio.com/docs/flex/developer/plugins/cli))

---

## Getting Started

On your terminal, perform the following:

```
// Clone Project
git clone https://github.com/leroychan/twilio-flex-voip.git

// Change to working directory
cd twilio-flex-voip

// Change to plugin-voip directory
cd plugin-voip

// Install NPM Packages
npm install

// Local Development
twilio flex:plugins:start

// Deploy to Twilio Flex Instance
// Before you deploy, ensure that `twilio profiles:list` has an active Flex account set.
twilio flex:plugins:deploy --changelog "Deploy VoIP Plugin"

twilio flex:plugins:release --plugin plugin-voip@0.0.1 --name "Deploy VoIP Plugin" --description "Allows agents to accept incoming VoIP calls and perform outbound VoIP calls"
```

---

## License

MIT
