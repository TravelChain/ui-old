// import React from "react";
// import AccountStore from "stores/AccountStore";
import {ChainStore} from "bitsharesjs/es";





// import HelpContent from "../Utility/HelpContent";
// import BlockTradesGateway from "../DepositWithdraw/BlockTradesGateway";
// import axios from 'axios'
// import ls from "common/localStorage";
//
//
// const STORAGE_KEY = "__graphene__";
// let ss = new ls(STORAGE_KEY);
//
// class TokenSale extends React.Component {
//
//   constructor(props) {
//     super();
//
//     this.state = {
//       BTC: "",
//       ETH: "",
//       LTCT: ""
//     }
//   }
//
//
//   componentWillMount() {
//     axios.get("https://testnet.travelchain.io/api/accounts/me/", {
//       headers: {
//         Authorization: `JWT ${ss.get("backend_token")}`
//       }
//     }).then((response) => {
//       this.setState({...response.data});
//       if (!response.data.is_verified) this.props.router.push("/kyc");
//     }).catch(() => this.props.router.push("/kyc"));
//   }
//
//


//     componentDidMount () {
//         console.log(ChainStore.getAsset("1.3.0"));
//         console.log("ChainStore.getAsset(\"TT\")");
//     }
//
//   render() {
//     // let { account } = this.props;
//     let { BTC, ETH, LTCT } = this.state;
//     console.log(this.state)
//
//     return (
//
//       <div className='grid-container'>
//         {/*<div  className={this.props.contained ? "grid-content" : "grid-container"}>*/}
//         <div className='grid-container'>
//           {/*<div className={this.props.contained ? "" : "grid-content"} style={{paddingTop: "2rem"}}>*/}
//
//           <div className="grid-block vertical medium-horizontal no-margin no-padding">
//             <div className="medium-10 show-for-medium">
//               <HelpContent path="components/DepositWithdraw" section="deposit-short"/>
//             </div>
//           </div>
//           <div>
//             <div className="grid-block vertical medium-horizontal no-margin no-padding">
//               <div className="medium-5 medium-offset-1 small-order-1 medium-order-2" style={{paddingBottom: 20}}>
//               </div>
//             </div>
//           </div>
//
//           <div className="grid-content no-padding" style={{paddingTop: 15}}>
//             <div className="content-block">
//               {/* <div className="float-right">
//                             <a href="https://www.ccedk.com/" target="__blank" rel="noopener noreferrer"><Translate content="gateway.website" /></a>
//                         </div> */}
//               <div className="service-selector">
//                 <ul className="button-group segmented no-margin">
//                   {/*     <li onClick={this.toggleOLService.bind(this, "gateway")} className={olService === "gateway" ? "is-active" : ""}><a><Translate content="gateway.gateway" /></a></li>
//                                 <li onClick={this.toggleOLService.bind(this, "fiat")} className={olService === "fiat" ? "is-active" : ""}><a>Fiat</a></li> */}
//                 </ul>
//               </div>
//
//
//               <BlockTradesGateway
//               btcWallet={BTC}
//               ethWallet={ETH}
//               ltctWallet={LTCT}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


import React from "react";
import MarketsStore from "stores/MarketsStore";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import GatewayStore from "stores/GatewayStore";
import AltContainer from "alt-container";
import Exchange from "../Exchange/TokenSaleExchange";
import ChainTypes from "../Utility/ChainTypes";
import LoadingIndicator from "../LoadingIndicator";
import { EmitterInstance } from "bitsharesjs/es";
import BindToChainState from "../Utility/BindToChainState";
import MarketsActions from "actions/MarketsActions";
import axios from 'axios'
import ls from "common/localStorage";


const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

class TokenSale extends React.Component {

    render() {
         return (
            <AltContainer
              stores={[MarketsStore, AccountStore, SettingsStore]}
              inject={{
                marketLimitOrders: () => {
                  return MarketsStore.getState().marketLimitOrders;
                },
                marketCallOrders: () => {
                  return MarketsStore.getState().marketCallOrders;
                },
                invertedCalls: () => {
                  return MarketsStore.getState().invertedCalls;
                },
                marketSettleOrders: () => {
                  return MarketsStore.getState().marketSettleOrders;
                },
                marketData: () => {
                  return MarketsStore.getState().marketData;
                },
                totals: () => {
                  return MarketsStore.getState().totals;
                },
                priceData: () => {
                  return MarketsStore.getState().priceData;
                },
                volumeData: () => {
                  return MarketsStore.getState().volumeData;
                },
                activeMarketHistory: () => {
                  return MarketsStore.getState().activeMarketHistory;
                },
                bucketSize: () => {
                  return MarketsStore.getState().bucketSize;
                },
                buckets: () => {
                  return MarketsStore.getState().buckets;
                },
                lowestCallPrice: () => {
                  return MarketsStore.getState().lowestCallPrice;
                },
                feedPrice: () => {
                  return MarketsStore.getState().feedPrice;
                },
                currentAccount: () => {
                  return AccountStore.getState().currentAccount;
                },
                linkedAccounts: () => {
                  return AccountStore.getState().linkedAccounts;
                },
                viewSettings: () => {
                  return SettingsStore.getState().viewSettings;
                },
                settings: () => {
                  return SettingsStore.getState().settings;
                },
                starredMarkets: () => {
                  return SettingsStore.getState().starredMarkets;
                },
                marketDirections: () => {
                  return SettingsStore.getState().marketDirections;
                },
                marketStats: () => {
                  return MarketsStore.getState().marketStats;
                },
                marketReady: () => {
                  return MarketsStore.getState().marketReady;
                },
                backedCoins: () => {
                  return GatewayStore.getState().backedCoins.get("OPEN", []);
                },
                bridgeCoins: () => {
                  return GatewayStore.getState().bridgeCoins;
                },
                miniDepthChart: () => {
                  return SettingsStore.getState().viewSettings.get("miniDepthChart", true);
                }
              }}
            >
              <ExchangeSubscriber router={this.props.router} quoteAsset={'1.3.0'} baseAsset={'1.3.2'} />
            </AltContainer>
          );
        }
}

let emitter = EmitterInstance();
let callListener, limitListener, newCallListener, feedUpdateListener, settleOrderListener;

class ExchangeSubscriber extends React.Component {
  static propTypes = {
    currentAccount: ChainTypes.ChainAccount.isRequired,
    quoteAsset: ChainTypes.ChainAsset.isRequired,
    baseAsset: ChainTypes.ChainAsset.isRequired,
    coreAsset: ChainTypes.ChainAsset.isRequired
  };

  static defaultProps = {
    currentAccount: "1.2.3",
    coreAsset: "1.3.0"
  };

  constructor() {
    super();
    this.state = {
      sub: null,
      wallets: {
        BTC: "",
        ETH: "",
        LTCT: ""
      }
    };

    this._subToMarket = this._subToMarket.bind(this);
  }

  componentWillMount() {
    if (this.props.quoteAsset.toJS && this.props.baseAsset.toJS) {
      this._subToMarket(this.props);
      // this._addMarket(this.props.quoteAsset.get("symbol"), this.props.baseAsset.get("symbol"));
    }

    emitter.on("cancel-order", limitListener = MarketsActions.cancelLimitOrderSuccess);
    emitter.on("close-call", callListener = MarketsActions.closeCallOrderSuccess);
    emitter.on("call-order-update", newCallListener = MarketsActions.callOrderUpdate);
    emitter.on("bitasset-update", feedUpdateListener = MarketsActions.feedUpdate);
    emitter.on("settle-order-update", settleOrderListener = (object) => {
      let {isMarketAsset, marketAsset} = market_utils.isMarketAsset(this.props.quoteAsset, this.props.baseAsset);
      console.log("settle-order-update:", object, "isMarketAsset:", isMarketAsset, "marketAsset:", marketAsset);

      if (isMarketAsset && marketAsset.id === object.balance.asset_id) {
        MarketsActions.settleOrderUpdate(marketAsset.id);
      }
    });

    axios.get("https://testnet.travelchain.io/api/accounts/me/", {
      headers: {
        Authorization: `JWT ${ss.get("backend_token")}`
      }
    }).then((response) => {
        this.setState({wallets: response.data});
        if (!response.data.is_verified) this.props.router.push("/kyc");
    }).catch(() => this.props.router.push("/TokenSale.jsx"));

  }

  componentWillReceiveProps(nextProps) {
    /* Prediction markets should only be shown in one direction, if the link goes to the wrong one we flip it */
    if (nextProps.baseAsset && nextProps.baseAsset.getIn(["bitasset", "is_prediction_market"])) {
      this.props.router.push(`/market/${nextProps.baseAsset.get("symbol")}_${nextProps.quoteAsset.get("symbol")}`);
    }

    if (nextProps.quoteAsset && nextProps.baseAsset) {
      if (!this.state.sub) {
        return this._subToMarket(nextProps);
      }
    }

    if (nextProps.quoteAsset.get("symbol") !== this.props.quoteAsset.get("symbol") || nextProps.baseAsset.get("symbol") !== this.props.baseAsset.get("symbol")) {
      let currentSub = this.state.sub.split("_");
      MarketsActions.unSubscribeMarket(currentSub[0], currentSub[1]);
      return this._subToMarket(nextProps);
    }
  }

  componentWillUnmount() {
    let { quoteAsset, baseAsset } = this.props;
    MarketsActions.unSubscribeMarket(quoteAsset.get("id"), baseAsset.get("id"));
    if (emitter) {
      emitter.off("cancel-order", limitListener);
      emitter.off("close-call", callListener);
      emitter.off("call-order-update", newCallListener);
      emitter.off("bitasset-update", feedUpdateListener);
      emitter.off("settle-order-update", settleOrderListener);
    }
  }

  _subToMarket(props, newBucketSize) {
    let { quoteAsset, baseAsset, bucketSize } = props;
    if (newBucketSize) {
      bucketSize = newBucketSize;
    }
    if (quoteAsset.get("id") && baseAsset.get("id")) {
      MarketsActions.subscribeMarket.defer(baseAsset, quoteAsset, bucketSize);
      this.setState({ sub: `${quoteAsset.get("id")}_${baseAsset.get("id")}` });
    }
  }

  render() {
    return <div className="grid-block vertical">
      {!this.props.marketReady ? <LoadingIndicator /> : null}
      <Exchange wallets={this.state.wallets} {...this.props} sub={this.state.sub} subToMarket={this._subToMarket} />
    </div>;
  }
}

ExchangeSubscriber = BindToChainState(ExchangeSubscriber, {keep_updating: true, show_loader: true});


export default TokenSale;