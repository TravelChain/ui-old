import React from "react";
import Panel from "react-foundation-apps/src/panel";
import Trigger from "react-foundation-apps/src/trigger";
import {Link} from "react-router/es";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Translate from "react-translate-component";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import WalletUnlockStore from "stores/WalletUnlockStore";
import WalletManagerStore from "stores/WalletManagerStore";
import SettingsStore from "stores/SettingsStore";
import { Apis } from "bitsharesjs-ws";

class MobileMenu extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    static contextTypes = {
        router: React.PropTypes.object
    };

    onClick() {
        ZfApi.publish("mobile-menu", "close");
    }

    _onNavigate(route, e) {
        e.preventDefault();
        this.context.router.push(route);
        ZfApi.publish("mobile-menu", "close");
    }

    render() {
        let {id, currentAccount, linkedAccounts, myAccounts} = this.props;
        let accounts = null;

        if(linkedAccounts.size > 1) {
            accounts = linkedAccounts.sort((a, b) => {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            }).map( a => {
                return <li key={a} onClick={this.onClick}><Link to={`/account/${a}/overview`}>{a}</Link></li>;
            });
        }  else if (linkedAccounts.size === 1) {
            accounts = <li key="account" onClick={this.onClick}><Link to={`/account/${linkedAccounts.first()}/overview`}><Translate content="header.account" /></Link></li>;
        }

        let linkToAccountOrDashboard;
        linkToAccountOrDashboard = <a onClick={this._onNavigate.bind(this, "/dashboard")}><Translate content="header.dashboard" /></a>;
        
        let tradeLink = this.props.lastMarket ?
            <a onClick={this._onNavigate.bind(this, `/market/${this.props.lastMarket}`)}><Translate content="header.exchange" /></a> :
            <a onClick={this._onNavigate.bind(this, "/explorer/markets")}><Translate content="header.exchange" /></a>;

        return (
            <Panel id={id} position="left">
              <div className="grid-content" style={{zIndex: 200}}>
                <Trigger close={id}>
                  <a className="close-button">&times;</a>
                </Trigger>
                <section style={{marginTop: "3rem"}} className="block-list">
                    <ul>
                   
                    {currentAccount !== null ? <li onClick={this.onClick}><Link to={"/mapala/"}>Mapala</Link></li> : null}
                        <li>{linkToAccountOrDashboard}</li>
                          {currentAccount !== null ?
                            <li><a onClick={this._onNavigate.bind(this, `/account/${currentAccount}/dashboard/`)}><Translate content="header.account" /></a></li>
                          : null}

                        <li onClick={this.onClick}><Link to="transfer"><Translate content="header.payments"/></Link></li>
                        {linkedAccounts.size === 0 ? null :
                          <li>{tradeLink}</li>}
                         <li><a onClick={this._onNavigate.bind(this, "/explorer")}><Translate content="header.explorer" /></a></li>
                        <li onClick={this.onClick}><Link to="settings"><Translate content="header.settings"/></Link></li>
                        {currentAccount !== null ?
                            <li><a onClick={this._onNavigate.bind(this, `/account/${currentAccount}/member-stats/`)}><Translate content="header.membership" /></a></li>
                          : null}


                        <li><a onClick={this._onNavigate.bind(this, `/migration/`)}>EOS Migration</a></li>

                    </ul>
                </section>

              
                </div>
            </Panel>
        );
    }
}

MobileMenu = connect(MobileMenu, {
    listenTo() {
        return [AccountStore, WalletUnlockStore, WalletManagerStore, SettingsStore];
    },
    getProps() {
        const chainID = Apis.instance().chain_id;
        return {
            linkedAccounts: AccountStore.getState().linkedAccounts,
            currentAccount: AccountStore.getState().currentAccount,
            locked: WalletUnlockStore.getState().locked,
            current_wallet: WalletManagerStore.getState().current_wallet,
            lastMarket: SettingsStore.getState().viewSettings.get(`lastMarket${chainID ? ("_" + chainID.substr(0, 8)) : ""}`),
            myAccounts: AccountStore.getMyAccounts()
        };
    }
});

export default class WidthWrapper extends React.Component {

    constructor() {
        super();

        let width = window && window.innerWidth;
        this.state = {
            visible: width <= 640
        };

        this._checkWidth = this._checkWidth.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this._checkWidth, {capture: false, passive: true});
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._checkWidth);
    }

    _checkWidth() {
        let width = window && window.innerWidth;
        let visible = width <= 640;
        if (visible !== this.state.visible) {
            this.setState({visible});
        }
    }

    render() {
        if (!this.state.visible) return null;
        return <MobileMenu {...this.props} />;
    }
}
