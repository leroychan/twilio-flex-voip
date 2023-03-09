const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
let identity;

exports.handler = async (context, event, callback) => {
  try {
    console.log(context);
    // Load Libraries
    const nameGenerator = require(Runtime.getAssets()["/name_generator.js"]
      .path);

    // Step 1: Retrieve Environment Variables
    const { ACCOUNT_SID } = context;
    const { TWILIO_TWIML_APP_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = context;

    // Step 2: Generate Identity
    identity = nameGenerator();

    console.log(`${TWILIO_API_KEY} ${TWILIO_API_SECRET}`);
    // Step 3: Generate Acecss Token
    const accessToken = new AccessToken(
      ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET
    );
    accessToken.identity = identity;
    const grant = new VoiceGrant({
      outgoingApplicationSid: TWILIO_TWIML_APP_SID,
      incomingAllow: true,
    });
    accessToken.addGrant(grant);

    // Step 4: Formulate Respose Payload
    callback(null, {
      identity: identity,
      token: accessToken.toJwt(),
    });
  } catch (err) {
    console.log(err);
    return callback("outer catch error");
  }
};
