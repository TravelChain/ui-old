import React from "react";
import {Link} from "react-router/es";
import Translate from "react-translate-component";
import { isIncognito } from "feature_detect";
var logo = require("assets/logo-ico-blue.png");
import SettingsActions from "actions/SettingsActions";
import WalletUnlockActions from "actions/WalletUnlockActions";
import SettingsStore from "../stores/SettingsStore";

export default class LoginSelector extends React.Component {

    constructor(props){
        super(props);

        this.state = {step: 1, locale: SettingsStore.getState().settings.get("locale")};
    }

    componentWillMount(){
        isIncognito((incognito)=>{
            this.setState({incognito});
        });
    }

    onSelect(route) {
        this.props.router.push("/create-account/" + route);
    }

    _onSettingsChange() {
      this.setState({locale: SettingsStore.getState().settings.get("locale")})
    }

    componentDidMount() {
        SettingsStore.listen(this._onSettingsChange.bind(this));
    }

    render() {
        const childCount = React.Children.count(this.props.children);
        return (
            <div className="grid-block align-center">
                <div className="grid-block shrink vertical">
                    <div className="grid-content shrink text-center account-creation">
                        <div><img src={logo}/></div>
                        <Translate content="account.intro_text_title" component="h4"/>

                        <div style={{padding: 20 + 'px'}}><Translate unsafe content="account.intro_text_1" component="p" /></div>

                        {/* <div>
                          {this.state.locale === 'ru' ?
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/WEa9fTsFh3Q?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
                            : <iframe width="560" height="315" src="https://www.youtube.com/embed/KDr-yKQMLTg?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
                          }
                        </div> */}

                         {!!childCount ? null :
                        <div className="button-group">
                            <label style={{textAlign: "left"}}><Translate content="account.new_user" /><br/>
                                <Link to="/create-account/password">
                                    <div className="button dashboard create-acc">
                                        <Translate content="header.create_account" />
                                    </div>
                                </Link>
                            </label>

                            <label style={{textAlign: "left"}}><Translate content="account.existing_user" /><br/>
                                <div className="button dashboard login" onClick={() => {
                                    SettingsActions.changeSetting({setting: "passwordLogin", value: true});
                                    WalletUnlockActions.unlock.defer();
                                }}>
                                    <Translate content="header.unlock_short" />
                                </div>
                            </label>
                        </div>}

                        {/*{!!childCount ? null :*/}
                        {/*<div className="creation-options">*/}
                            {/*<div><Link to="/wallet/backup/restore"><Translate content="account.restore" /></Link></div>*/}
                            {/*<div><Link to="/create-account/wallet"><Translate content="account.advanced" /></Link></div>*/}
                        {/*</div>}*/}

                        {this.props.children}
                    </div>
                {/* <div className="grid-block no-margin no-padding vertical medium-horizontal no-overflow login-selector">

                    {this.state.incognito ? null : <div className="box small-12 medium-5 large-4" onClick={this.onSelect.bind(this, "wallet")}>
                        <div className="block-content-header" style={{position: "relative"}}>
                            <Translate content="wallet.wallet_model" component="h4" />
                        </div>
                        <div className="box-content">
                            <Translate content="wallet.wallet_model_1" component="p" />
                            <Translate content="wallet.wallet_model_2" component="p" />

                            <Translate unsafe content="wallet.wallet_model_3" component="ul" />
                        </div>
                        <div className="button"><Link to="/create-account/wallet"><Translate content="wallet.use_wallet" /></Link></div>

                    </div>}

                    <div className="box small-12 medium-5 large-4 vertical" onClick={this.onSelect.bind(this, "password")}>
                        <div className="block-content-header" style={{position: "relative"}}>
                            <Translate content="wallet.password_model" component="h4" />
                        </div>
                        <div className="box-content">
                            <Translate content="wallet.password_model_1" component="p" />
                            <Translate content="wallet.password_model_2" unsafe component="p" />

                            <Translate unsafe content="wallet.password_model_3" component="ul" />
                        </div>
                        <div className="button"><Link to="/create-account/password"><Translate content="wallet.use_password" /></Link></div>
                    </div>
                </div> */}
                </div>
            </div>
        );
    }
}
