const ethers = require('ethers');
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

const { ForwarderAbi } = require('../../src/forwarder');
const ForwarderAddress = require('../../deploy.json').MinimalForwarder;
const RegistryAddress = require('../../deploy.json').Registry;
//const RegistryAddress = require('/home/moiz/Desktop/workshopsOpenGSN/01-defender-meta-txs/artifacts/contracts/Registry.sol/Registry.json').Registry;


async function relay(forwarder, request, signature, whitelist) {
  // Decide if we want to relay this request based on a whitelist
  const accepts = !whitelist || whitelist.includes(request.to);
  if (!accepts) throw new Error(`Rejected request to ${request.to}`);

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature);
  if (!valid) throw new Error(`Invalid request`);

  // Send meta-tx through relayer to the forwarder contract
  const gasLimit = (parseInt(request.gas) + 50000).toString();
  return await forwarder.execute(request, signature, { gasLimit });
}

async function handler(event) {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`);
  const { request, signature } = event.request.body;
  console.log(`Relaying`, request);

  // Initialize Relayer provider and signer, and forwarder contract
  const credentials = { ...event };
  //const credentials = { apiKey: "HDequLf7Pcr6ZT1Sdp6B51pSwJDMLxcc", apiSecret: "5jCbFVRkGMvyHYBP13sQSzNKjWna1sJvwQJH265m1s95NGED3fcVnwkwvgksCGFR" };
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  const forwarder = new ethers.Contract(ForwarderAddress, ForwarderAbi, signer);

  // Relay transaction!
  const tx = await relay(forwarder, request, signature);
  console.log(`Sent meta-tx: ${tx.hash}`);
  return { txHash: tx.hash };
}

module.exports = {
  handler,
  relay,
}