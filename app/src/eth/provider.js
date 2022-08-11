/* eslint-disable no-unused-vars */
import { ethers } from 'ethers';

//const CLOUDFLARE_ENDPOINT = 'https://dai.poa.network';
const MAIN_ENDPOINT = 'https://eth-rinkeby.alchemyapi.io/v2/0_lYKwBWH7-fFiDSV6SN85aX-lKYFb0i';
//const ALTERNATE_ENDPOINT = 'https://xdai.poanetwork.dev';
//const UNSECURE_ENDPOINT = 'http://xdai.poanetwork.dev';
const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;

export function createProvider() {
  return new ethers.providers.JsonRpcProvider(QUICKNODE_ENDPOINT || MAIN_ENDPOINT, 100);
}

// /* eslint-disable no-unused-vars */
// import { ethers } from 'ethers';

// const CLOUDFLARE_ENDPOINT = 'https://dai.poa.network';
// const MAIN_ENDPOINT = 'https://rpc.xdaichain.com/';
// const ALTERNATE_ENDPOINT = 'https://xdai.poanetwork.dev';
// const UNSECURE_ENDPOINT = 'http://xdai.poanetwork.dev';
// const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;

// export function createProvider() {
//   return new ethers.providers.JsonRpcProvider(QUICKNODE_ENDPOINT || MAIN_ENDPOINT, 100);
//}