/* istanbul ignore file */

import * as http from "http";
import * as https from "https";

const agentOptions: https.AgentOptions = {
  keepAlive: true,
};

export const httpAgentConfig = {
  httpAgent: new http.Agent(agentOptions),
  httpsAgent: new https.Agent(agentOptions),
};
