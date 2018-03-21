import React from "react";
import Immutable from "immutable";
import DashboardList from "./DashboardList";
import { RecentTransactions } from "../Account/RecentTransactions";
import Translate from "react-translate-component";
import MarketCard from "./MarketCard";
import utils from "common/utils";
import { Apis } from "bitsharesjs-ws";
import LoadingIndicator from "../LoadingIndicator";
import LoginSelector from "../LoginSelector";
import cnames from "classnames";
import SettingsActions from "actions/SettingsActions";
import Icon from "../Icon/Icon";

class Dashboard extends React.Component {

    constructor(props) {
        super();
        let marketsByChain = {
            "a11ee242":[
                ["DACOM.USD", "TT"]

            ],
            "5cfd61a0":[
                ["USD", "BTS"],
                ["USD", "OPEN.BTC"],
                ["USD", "OPEN.USDT"],
                ["USD", "OPEN.ETH"],
                ["USD", "OPEN.DASH"],
                ["USD", "GOLD"],
                ["USD", "HERO"],
                ["CNY", "BTS"],
                ["CNY", "OPEN.BTC"],
                ["CNY", "USD"],
                ["CNY", "OPEN.ETH"],
                ["CNY", "YOYOW"],
                ["CNY", "OCT"],
                ["OPEN.BTC", "BTS"],
                ["OPEN.BTC", "OPEN.ETH"],
                ["OPEN.BTC", "OPEN.DASH"],
                ["OPEN.BTC", "BLOCKPAY"],
                ["OPEN.BTC", "OPEN.DGD"],
                ["OPEN.BTC", "OPEN.STEEM"],
                ["BTS", "OPEN.ETH"],
                ["BTS", "OPEN.EOS"],
                ["BTS", "PPY"],
                ["BTS", "OPEN.STEEM"],
                ["BTS", "OBITS"],
                ["BTS", "RUBLE"],
                ["BTS", "HERO"],
                ["BTS", "OCT"],
                ["BTS", "SILVER"],
                ["BTS", "GOLD"],
                ["BTS", "BLOCKPAY"],
                ["BTS", "BTWTY"],
                ["BTS", "SMOKE"],
                ["KAPITAL", "OPEN.BTC"],
                ["USD", "OPEN.STEEM"],
                ["USD", "OPEN.MAID"],
                ["OPEN.USDT", "OPEN.BTC"],
                ["OPEN.BTC", "OPEN.MAID"],
                ["BTS", "OPEN.MAID"],
                ["BTS", "OPEN.HEAT"],
                ["BTS", "OPEN.INCENT"],
                ["HEMPSWEET", "OPEN.BTC"],
                ["KAPITAL", "BTS"]
            ],
            "39f5e2ed": [
                ["TEST", "PEG.FAKEUSD"],
                ["TEST", "BTWTY"]
            ]
        };
        let chainID = Apis.instance().chain_id;
        if (chainID) chainID = chainID.substr(0, 8);

        this.state = {
            width: null,
            showIgnored: false,
            featuredMarkets: marketsByChain[chainID] || marketsByChain["5cfd61a0"],
            newAssets: [

            ],
            currentEntry: props.currentEntry
        };

        this._setDimensions = this._setDimensions.bind(this);
        // this._sortMarketsByVolume = this._sortMarketsByVolume.bind(this);
    }

    componentDidMount() {
        this._setDimensions();

        window.addEventListener("resize", this._setDimensions, {capture: false, passive: true});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !utils.are_equal_shallow(nextState.featuredMarkets, this.state.featuredMarkets) ||
            !utils.are_equal_shallow(nextProps.lowVolumeMarkets, this.props.lowVolumeMarkets) ||
            !utils.are_equal_shallow(nextState.newAssets, this.state.newAssets) ||
            nextProps.linkedAccounts !== this.props.linkedAccounts ||
            // nextProps.marketStats !== this.props.marketStats ||
            nextProps.ignoredAccounts !== this.props.ignoredAccounts ||
            nextProps.passwordAccount !== this.props.passwordAccount ||
            nextState.width !== this.state.width ||
            nextProps.accountsReady !== this.props.accountsReady ||
            nextState.showIgnored !== this.state.showIgnored ||
            nextState.currentEntry !== this.state.currentEntry
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._setDimensions);
    }

    _setDimensions() {
        let width = window.innerWidth;

        if (width !== this.state.width) {
            this.setState({width});
        }
    }

    _onToggleIgnored() {
        this.setState({
            showIgnored: !this.state.showIgnored
        });
    }

    _onSwitchType(type) {
        this.setState({
            currentEntry: type
        });
        SettingsActions.changeViewSetting({
            dashboardEntry: type
        });
    }

    render() {
        let { linkedAccounts, myIgnoredAccounts, accountsReady, passwordAccount } = this.props;
        let {width, showIgnored, featuredMarkets, newAssets, currentEntry} = this.state;

        if (passwordAccount && !linkedAccounts.has(passwordAccount)) {
            linkedAccounts = linkedAccounts.add(passwordAccount);
        }
        let names = linkedAccounts.toArray().sort();
        if (passwordAccount && names.indexOf(passwordAccount) === -1) names.push(passwordAccount);
        let ignored = myIgnoredAccounts.toArray().sort();

        let accountCount = linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);

        if (!accountsReady) {
            return <LoadingIndicator />;
        }

        if (!accountCount) {
            return <LoginSelector />;
        }

        

        const entries = ["accounts", "recent"];
        const activeIndex = entries.indexOf(currentEntry);

        let fillQuestionnaireBoxStyles = {
          border: '1px solid rgba(128, 128, 128, 0.45)',
          display: 'flex',
          justifyContent: 'center'
        }
        return (
            <div className="grid-block flex-start">
                <div className="grid-block shrink vertical medium-horizontal large-10 large-offset-1 top-apps-list">
                    <div className="grid-block shrink vertical medium-horizontal">
                        <div className="generic-bordered-box">
                            <h2>Coming Soon</h2>
                        </div>
                    </div>

                    <div className="grid-block shrink vertical medium-horizontal">


                        <div className="item">
                            <div className="img__block">
                                <img src={require("assets/travelai.png")} alt="TravelAI"/>
                            </div>
                            <div className="info__block">
                                   <a href="https://travelai.io" target="_blank" ><h3 className="item__title">AI-Travel</h3></a>
                                <p className="item__desc"><Translate className="left-label" component="label" content="dashboard.travelai" data-place="top"/></p>

                                <a href="https://chrome.google.com/webstore/detail/travelchain-data-collecto/pdcphhicoijhmhdmmjdlfeocjecionpn" target = "_blank" className="item__link"><Translate content="dashboard.travelai-install" data-place="top"/></a>
                              </div>
                            <ul className="social__block">
                               
                            </ul>
                        </div>
                        <div className="item">
                            <div className="img__block">
                                <img src={require("assets/mapala.png")} alt="Mapala"/>
                            </div>
                            <div className="info__block">
                                  <a href="https://mapala.net" target="_blank" ><h3 className="item__title">MAPALA</h3></a>
                          
                                <p className="item__desc"><Translate className="left-label" component="label" content="dashboard.mapala" data-place="top"/></p>
                               <a href="https://mapala.net" target = "_blank" className="item__link">https://mapala.net</a>
                               </div>
                            <ul className="social__block">
                                <li><a href ="https://github.com/TravelChain/mapala-backend" target = "_blank"><Icon name="github-sign" size="2x" fillClass="fill-black"/></a></li>
                                <li><a href ="https://t.me/mapala" target = "_blank"> <Icon name="telegram" size="2x" fillClass="fill-black"/></a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
