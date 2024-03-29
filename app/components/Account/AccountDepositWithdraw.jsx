// import React from "react";
// import { connect } from "alt-react";
// import accountUtils from "common/account_utils";
// import utils from "common/utils";
// import Translate from "react-translate-component";
// import ChainTypes from "../Utility/ChainTypes";
// import BindToChainState from "../Utility/BindToChainState";
// import BlockTradesGateway from "../DepositWithdraw/BlockTradesGateway";
// import OpenLedgerFiatDepositWithdrawal from "../DepositWithdraw/openledger/OpenLedgerFiatDepositWithdrawal";
// import OpenLedgerFiatTransactionHistory from "../DepositWithdraw/openledger/OpenLedgerFiatTransactionHistory";
// import BlockTradesBridgeDepositRequest from "../DepositWithdraw/blocktrades/BlockTradesBridgeDepositRequest";
// import HelpContent from "../Utility/HelpContent";
// import AccountStore from "stores/AccountStore";
// import SettingsStore from "stores/SettingsStore";
// import SettingsActions from "actions/SettingsActions";
// import { Apis } from "bitsharesjs-ws";
// import { settingsAPIs, rudexAPIs } from "api/apiConfig";
// import BitKapital from "../DepositWithdraw/BitKapital";
// import RuDexGateway from "../DepositWithdraw/rudex/RuDexGateway";
// import GatewayStore from "stores/GatewayStore";
// import GatewayActions from "actions/GatewayActions";
// import AccountImage from "../Account/AccountImage";
// import axios from 'axios'
// import ls from "common/localStorage";
//
// const STORAGE_KEY = "__graphene__";
// let ss = new ls(STORAGE_KEY);
//
// class AccountDepositWithdraw extends React.Component {
//
//     static propTypes = {
//         account: ChainTypes.ChainAccount.isRequired,
//         contained: React.PropTypes.bool
//     };
//
//     static defaultProps = {
//         contained: false
//     };
//
//     constructor(props) {
//         super();
//     }
//
//
//
//
//       c() {
//
//         axios.get("https://testnet.travelchain.io/api/accounts/me/", {
//             headers: {
//                 Authorization: `JWT ${ss.get("backend_token")}`
//             }
//         }).then((response) => {
//             this.setState({...response.data});
//             if (!response.data.is_verified) this.props.router.push("/kyc");
//         }).catch(() => this.props.router.push("/kyc"));
//       }
//
//
//
//
//     render() {
//         let { account } = this.props;
//         let { BTC, ETH, LTCT } = this.state;
//
//         // let openLedgerGatewayCoins = this.props.openLedgerBackedCoins.map(coin => {
//             // return coin;
//         // })
//
//         return (
//
//             <div className='grid-content'>
//               {/*<div  className={this.props.contained ? "grid-content" : "grid-container"}>*/}
//                 <div className='grid-content'>
//                 {/*<div className={this.props.contained ? "" : "grid-content"} style={{paddingTop: "2rem"}}>*/}
//
//                     <div className="grid-block vertical medium-horizontal no-margin no-padding">
//                         <div className="medium-10 show-for-medium">
//                             <HelpContent path="components/DepositWithdraw" section="deposit-short"/>
//                         </div>
//                     </div>
//                     <div>
//                         <div className="grid-block vertical medium-horizontal no-margin no-padding">
//                             <div className="medium-5 medium-offset-1 small-order-1 medium-order-2" style={{paddingBottom: 20}}>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="grid-content no-padding" style={{paddingTop: 15}}>
//                         <div className="content-block">
//                           {/* <div className="float-right">
//                             <a href="https://www.ccedk.com/" target="__blank" rel="noopener noreferrer"><Translate content="gateway.website" /></a>
//                         </div> */}
//                             <div className="service-selector">
//                                 <ul className="button-group segmented no-margin">
//                                   {/*     <li onClick={this.toggleOLService.bind(this, "gateway")} className={olService === "gateway" ? "is-active" : ""}><a><Translate content="gateway.gateway" /></a></li>
//                                 <li onClick={this.toggleOLService.bind(this, "fiat")} className={olService === "fiat" ? "is-active" : ""}><a>Fiat</a></li> */}
//                                 </ul>
//                             </div>
//
//
//                             {/*<BlockTradesGateway*/}
//                               {/*btcWallet={BTC}*/}
//                               {/*ethWallet={ETH}*/}
//                               {/*ltctWallet={LTCT}*/}
//                               {/*account={account}*/}
//                               {/*// coins={openLedgerGatewayCoins}*/}
//                               {/*// provider="openledger"*/}
//                             {/*/>*/}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// class DepositStoreWrapper extends React.Component {
//     render() {
//         return <AccountDepositWithdraw/>;
//     }
// }
//
// export default DepositStoreWrapper;