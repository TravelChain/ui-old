import React from "react";
import {connect} from "alt-react";
import classNames from "classnames";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import AccountNameInput from "./../Forms/AccountNameInput";
import WalletDb from "stores/WalletDb";
import notify from "actions/NotificationActions";
import {Link} from "react-router/es";
import AccountSelect from "../Forms/AccountSelect";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import LoadingIndicator from "../LoadingIndicator";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import {ChainStore, FetchChain, key} from "bitsharesjs/es";
import ReactTooltip from "react-tooltip";
import utils from "common/utils";
import SavePasswordModal from "../Modal/SavePasswordModal";
import SettingsActions from "actions/SettingsActions";
import WalletUnlockActions from "actions/WalletUnlockActions";
import Icon from "../Icon/Icon";
import CopyButton from "../Utility/CopyButton";

class CreateAccountPassword extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            validAccountName: false,
            accountName: "",
            validPassword: false,
            registrar_account: null,
            loading: false,
            hide_refcode: true,
            show_identicon: false,
            step: 1,
            showPass: false,
            generatedPassword: ("P" + key.get_random_key().toWif()).substr(0, 45),
            confirm_password: "",
            understand_1: false,
            understand_2: false,
            understand_3: false,
            understand_4: false,
            understand_5: false,
            understand_6: false,
        };
        this.onFinishConfirm = this.onFinishConfirm.bind(this);

        this.accountNameInput = null;
    }

    componentWillMount() {
        SettingsActions.changeSetting({
            setting: "passwordLogin",
            value: true
        });
    }

    componentDidMount() {
        ReactTooltip.rebuild();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !utils.are_equal_shallow(nextState, this.state);
    }

    isValid() {
        let firstAccount = AccountStore.getMyAccounts().length === 0;
        let valid = this.state.validAccountName;
        if (!WalletDb.getWallet()) {
            valid = valid && this.state.validPassword;
        }
        if (!firstAccount) {
            valid = valid && this.state.registrar_account;
        }
        return valid && this.state.understand_1 && this.state.understand_2 && this.state.understand_4 && this.state.understand_5 && this.state.understand_6;
    }

    onAccountNameChange(e) {
        const state = {};
        if (e.valid !== undefined) state.validAccountName = e.valid;
        if (e.value !== undefined) state.accountName = e.value;
        
        if (!this.state.show_identicon) state.show_identicon = true;
        this.setState(state);
    }

    onFinishConfirm(confirm_store_state) {
        if (confirm_store_state.included && confirm_store_state.broadcasted_transaction) {
            TransactionConfirmStore.unlisten(this.onFinishConfirm);
            TransactionConfirmStore.reset();

            FetchChain("getAccount", this.state.accountName, undefined, {[this.state.accountName]: true}).then(() => {
                this.props.router.push("/wallet/backup/create?newAccount=true");
            });
        }
    }

    _unlockAccount(name, password) {
        WalletDb.validatePassword(password, true, name);
        WalletUnlockActions.checkLock.defer();
    }

    createAccount(name, password) {
        let refcode = this.refs.refcode ? this.refs.refcode.value() : null;
        let referralAccount = AccountStore.getState().referralAccount;
        this.setState({loading: true});

        AccountActions.createAccountWithPassword(name, password, this.state.registrar_account, referralAccount || this.state.registrar_account, 0, refcode).then(() => {
            AccountActions.setPasswordAccount(name);
            // User registering his own account
            if (this.state.registrar_account) {
                FetchChain("getAccount", name, undefined, {[name]: true}).then(() => {
                    this.setState({
                        step: 2,
                        loading: false
                    });
                    this._unlockAccount(name, password);
                });
                TransactionConfirmStore.listen(this.onFinishConfirm);
            } else { // Account registered by the faucet
                FetchChain("getAccount", name, undefined, {[name]: true}).then(() => {
                    this.setState({
                        step: 2
                    });
                    this._unlockAccount(name, password);
                });

            }
        }).catch(error => {
            console.log("ERROR AccountActions.createAccount", error);
            let error_msg = error.base && error.base.length && error.base.length > 0 ? error.base[0] : "unknown error";
            if (error.remote_ip) error_msg = error.remote_ip[0];
            notify.addNotification({
                message: `Failed to create account: ${name} - ${error_msg}`,
                level: "error",
                autoDismiss: 10
            });
            this.setState({loading: false});
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.isValid()) return;
        let account_name = this.accountNameInput.getValue();
        // if (WalletDb.getWallet()) {
        //     this.createAccount(account_name);
        // } else {
        let password = this.state.generatedPassword;
        this.createAccount(account_name, password);
    }

    onRegistrarAccountChange(registrar_account) {
        this.setState({registrar_account});
    }

    // showRefcodeInput(e) {
    //     e.preventDefault();
    //     this.setState({hide_refcode: false});
    // }

    _onInput(value, e) {
        this.setState({
            [value]: value === "confirm_password" ? e.target.value : !this.state[value],
            validPassword: value === "confirm_password" ? e.target.value === this.state.generatedPassword : this.state.validPassword
        });
    }

    showSavePasswordModal(){
        if (!this.confirmed && /android|ipad|ios|iphone|windows phone/i.test(navigator.userAgent.toLowerCase())) {
            this.refs.SavePasswordModal.show();
            this.confirmed = true;
        }
    }

    _renderAccountCreateForm() {

        let {registrar_account} = this.state;

        let my_accounts = AccountStore.getMyAccounts();
        let firstAccount = my_accounts.length === 0;
        let valid = this.isValid();
        let isLTM = false;
        let registrar = registrar_account ? ChainStore.getAccount(registrar_account) : null;
        if (registrar) {
            if (registrar.get("lifetime_referrer") == registrar.get("id")) {
                isLTM = true;
            }
        }

        let buttonClass = classNames("submit-button button no-margin", {disabled: (!valid || (registrar_account && !isLTM))});

        return (
            <div style={{textAlign: "left"}}>
                <SavePasswordModal ref="SavePasswordModal"/>
                <form className="register-form"
                        style={{maxWidth: "60rem"}}
                      onSubmit={this.onSubmit.bind(this)}
                      noValidate
                >
                    <AccountNameInput
                        ref={(ref) => {
                            if (ref) {
                                this.accountNameInput = ref.refs.nameInput;
                            }
                        }}
                        cheapNameOnly={!!firstAccount}
                        onChange={this.onAccountNameChange.bind(this)}
                        accountShouldNotExist={true}
                        placeholder={counterpart.translate("wallet.account_public")}
                        noLabel
                    />

                    <section>
                        <label className="left-label">
                            <Translate content="wallet.generated"/>
                            <span className="tooltip" data-html={true}
                                  data-tip={counterpart.translate("tooltip.generate")}>
                                <Icon name="question-circle"/></span>
                        </label>
                        <div style={{paddingBottom: "0.5rem"}}>
                        <span className="inline-label">
                            <span className="icon locked-padlock icon-14px"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                 viewBox="0 0 486.733 486.733"><path
                                d="M403.88 196.563h-9.484v-44.388c0-82.099-65.151-150.681-146.582-152.145-2.225-.04-6.671-.04-8.895 0C157.486 1.494 92.336 70.076 92.336 152.175v44.388h-9.485c-14.616 0-26.538 15.082-26.538 33.709v222.632c0 18.606 11.922 33.829 26.539 33.829H403.88c14.616 0 26.539-15.223 26.539-33.829V230.272c0-18.626-11.922-33.709-26.539-33.709zM273.442 341.362v67.271c0 7.703-6.449 14.222-14.158 14.222H227.45c-7.71 0-14.159-6.519-14.159-14.222v-67.271c-7.477-7.36-11.83-17.537-11.83-28.795 0-21.334 16.491-39.666 37.459-40.513 2.222-.09 6.673-.09 8.895 0 20.968.847 37.459 19.179 37.459 40.513-.002 11.258-4.355 21.435-11.832 28.795zm58.444-144.799H154.847v-44.388c0-48.905 39.744-89.342 88.519-89.342 48.775 0 88.521 40.437 88.521 89.342v44.388z"
                                fill="#c4c4c4"></path></svg>
                            </span>
                            <input style={{fontSize: "80%"}} disabled value={this.state.generatedPassword} type="text"/>
                            <CopyButton
                                text={this.state.generatedPassword}
                                tip="tooltip.copy_password"
                                dataPlace="top"
                            />
                        </span>
                        </div>
                    </section>

                    <section>
                        <span className="icon locked-padlock icon-14px"><svg xmlns="http://www.w3.org/2000/svg"
                                                                             viewBox="0 0 486.733 486.733"><path
                            d="M403.88 196.563h-9.484v-44.388c0-82.099-65.151-150.681-146.582-152.145-2.225-.04-6.671-.04-8.895 0C157.486 1.494 92.336 70.076 92.336 152.175v44.388h-9.485c-14.616 0-26.538 15.082-26.538 33.709v222.632c0 18.606 11.922 33.829 26.539 33.829H403.88c14.616 0 26.539-15.223 26.539-33.829V230.272c0-18.626-11.922-33.709-26.539-33.709zM273.442 341.362v67.271c0 7.703-6.449 14.222-14.158 14.222H227.45c-7.71 0-14.159-6.519-14.159-14.222v-67.271c-7.477-7.36-11.83-17.537-11.83-28.795 0-21.334 16.491-39.666 37.459-40.513 2.222-.09 6.673-.09 8.895 0 20.968.847 37.459 19.179 37.459 40.513-.002 11.258-4.355 21.435-11.832 28.795zm58.444-144.799H154.847v-44.388c0-48.905 39.744-89.342 88.519-89.342 48.775 0 88.521 40.437 88.521 89.342v44.388z"
                            fill="#c4c4c4"></path></svg></span>
                        <input type="password" name="password" id="password" onClick={this.showSavePasswordModal.bind(this, "confirm_password")} value={this.state.confirm_password}
                               onChange={this._onInput.bind(this, "confirm_password")} placeholder="Confirm Password"/>
                        {this.state.confirm_password && this.state.confirm_password !== this.state.generatedPassword ?
                            <div className="has-error"><Translate content="wallet.confirm_error"/></div> : null}
                    </section>
                    <br/>
                    <div className="confirm-checks" onClick={this._onInput.bind(this, "understand_3")}>
                        <label className="check">
                            <input type="checkbox" onChange={() => {
                            }} checked={this.state.understand_3}/>
                            <span className="checkmark">
                                <Translate content="wallet.understand_3"/>
                            </span>
                        </label>
                    </div>
                    <br/>
                    <div className="confirm-checks" onClick={this._onInput.bind(this, "understand_1")}>
                        <label className="check">
                            <input type="checkbox" onChange={() => {
                            }} checked={this.state.understand_1}/>
                            <span className="checkmark">
                                <Translate content="wallet.understand_1"/>
                            </span>
                        </label>
                    </div>
                    <br/>

                    <div className="confirm-checks" style={{paddingBottom: "1.5rem"}}
                         onClick={this._onInput.bind(this, "understand_2")}>
                        <label className="check">
                            <input type="checkbox" onChange={() => {
                            }} checked={this.state.understand_2}/>
                            <span className="checkmark">
                                <Translate content="wallet.understand_2"/>
                            </span>
                        </label>
                    </div>

                    <div className="confirm-checks" style={{paddingBottom: "1.5rem"}}
                         onClick={this._onInput.bind(this, "understand_4")}>
                        <label className="check">
                            <input type="checkbox" onChange={() => {
                            }} checked={this.state.understand_4}/>
                            <span className="checkmark">
                            You are acquainted and you agree with the <a
                                href='https://travelchain.io/static/TRAVELCHAIN.TOKENS.SALE.PRIVACY.POLICY.pdf'
                                target='_blank'>TRAVELTOKENS SALE PRIVACY POLICY</a>
                                </span>
                        </label>
                    </div>

                    <div className="confirm-checks" style={{paddingBottom: "1.5rem"}}
                         onClick={this._onInput.bind(this, "understand_5")}>
                        <label className="check">
                            <input type="checkbox" onChange={() => {
                            }} checked={this.state.understand_5}/>
                            <span className="checkmark">
                            You are acquainted and you agree with the <a
                                href="https://travelchain.io/static/TRAVELCHAIN.TOKENS.SALE.GENERAL.TERMS.AND.CONDITIONS.pdf"
                                target="_blank">TRAVELCHAIN GENERAL TERMS AND CONDITIONS OF TRAVELTOKENS SALE</a>
                            </span>
                        </label>
                    </div>
                    <div className="confirm-checks" style={{paddingBottom: "1.5rem"}}
                         onClick={this._onInput.bind(this, "understand_6")}>
                        <label className="check">
                            <input type="checkbox" onChange={() => {
                            }} checked={this.state.understand_6}/>
                            <span className="checkmark">
                            You confirm that you are not a citizen of USA, CNR and Singapore and you are not a citizen
                            or a resident of a country, where cryptocurrency or token usage is restricted.
                            </span>
                        </label>
                    </div>
                    {/* If this is not the first account, show dropdown for fee payment account */}
                    {
                        firstAccount ? null : (
                            <div className="full-width-content form-group no-overflow" style={{paddingTop: 30}}>
                                <label>
                                    <Translate content="account.pay_from"/></label>
                                <AccountSelect
                                    account_names={my_accounts}
                                    onChange={this.onRegistrarAccountChange.bind(this)}
                                />
                                {(registrar_account && !isLTM) ?
                                    <div style={{textAlign: "left"}} className="facolor-error"><Translate
                                        content="wallet.must_be_ltm"/></div> : null}
                            </div>)
                    }

                    {/* Submit button */}
                    {this.state.loading ? <LoadingIndicator type="three-bounce"/> :
                        <button style={{width: "100%"}} className={buttonClass}>Register</button>}

                    {/* Backup restore option */}
                    {/* <div style={{paddingTop: 40}}>
                    <label>
                        <Link to="/existing-account">
                            <Translate content="wallet.restore" />
                        </Link>
                    </label>

                    <label>
                        <Link to="/create-wallet-brainkey">
                            <Translate content="settings.backup_brainkey" />
                        </Link>
                    </label>
                </div> */}

                    {/* Skip to step 3 */}
                    {/* {(!hasWallet || firstAccount ) ? null :<div style={{paddingTop: 20}}>
                    <label>
                        <a onClick={() => {this.setState({step: 3});}}><Translate content="wallet.go_get_started" /></a>
                    </label>
                </div>} */}
                </form>
                {/* <br />
                <p>
                    <Translate content="wallet.bts_rules" unsafe />
                </p> */}
            </div>
        );
    }

    _renderAccountCreateText() {
        let my_accounts = AccountStore.getMyAccounts();
        let firstAccount = my_accounts.length === 0;

        return (
            <div>
                <h4 style={{fontWeight: "bold", paddingBottom: 15}}><Translate content="wallet.wallet_password"/> 111111</h4>

                <Translate style={{textAlign: "left"}} unsafe component="p"
                           content="wallet.create_account_password_text"/>

                <Translate style={{textAlign: "left"}} component="p" content="wallet.create_account_text"/>

                {firstAccount ?
                    null :
                    <Translate style={{textAlign: "left"}} component="p" content="wallet.not_first_account"/>}
            </div>
        );
    }

    _renderBackup() {
        return (
            <div className="backup-submit">
                <p><Translate unsafe content="wallet.password_crucial"/></p>

                <div>

                    {!this.state.showPass ? <div onClick={() => {
                            this.setState({showPass: true});
                        }} className="button"><Translate content="wallet.password_show"/></div> :
                        <div><h5><Translate content="settings.password"/>:</h5>
                            <div style={{fontWeight: "bold", wordWrap: "break-word"}}
                                 className="no-overflow">{this.state.generatedPassword}</div>
                        </div>}
                </div>
                <div className="divider"/>
                <p className="txtlabel warning"><Translate unsafe content="wallet.password_lose_warning"/></p>

                <div style={{width: "100%"}} onClick={() => {
                    this.context.router.push("/dashboard");
                    ;
                }} className="button"><Translate content="wallet.ok_done"/></div>
            </div>
        );
    }

    _renderGetStarted() {

        return (
            <div>
                <table className="table">
                    <tbody>

                    <tr>
                        <td><Translate content="wallet.tips_dashboard"/>:</td>
                        <td><Link to="/dashboard"><Translate content="header.dashboard"/></Link></td>
                    </tr>

                    <tr>
                        <td><Translate content="wallet.tips_account"/>:</td>
                        <td><Link to={`/account/${this.state.accountName}/overview`}><Translate
                            content="wallet.link_account"/></Link></td>
                    </tr>

                    <tr>
                        <td><Translate content="wallet.tips_deposit"/>:</td>
                        <td><Link to="/deposit-withdraw"><Translate content="wallet.link_deposit"/></Link></td>
                    </tr>


                    <tr>
                        <td><Translate content="wallet.tips_transfer"/>:</td>
                        <td><Link to="/transfer"><Translate content="wallet.link_transfer"/></Link></td>
                    </tr>

                    <tr>
                        <td><Translate content="wallet.tips_settings"/>:</td>
                        <td><Link to="/settings"><Translate content="header.settings"/></Link></td>
                    </tr>
                    </tbody>

                </table>
            </div>
        );
    }

    _renderGetStartedText() {

        return (
            <div>
                <p style={{fontWeight: "bold"}}><Translate content="wallet.congrat"/></p>

                <p><Translate content="wallet.tips_explore_pass"/></p>

                <p><Translate content="wallet.tips_header"/></p>

                <p className="txtlabel warning"><Translate content="wallet.tips_login"/></p>
            </div>
        );
    }

    render() {
        let {step} = this.state;
        // let my_accounts = AccountStore.getMyAccounts();
        // let firstAccount = my_accounts.length === 0;
        return (
            <div className="sub-content">
                <div className="grid-block wrap vertical">
                    {step === 2 ? <p style={{fontWeight: "bold"}}>
                        <Translate content={"wallet.step_" + step}/>
                    </p> : null}

                    {step === 3 ? this._renderGetStartedText() : null}

                    {step === 1 ? (
                        <div>
                            {this._renderAccountCreateForm()}
                        </div>
                    ) : step === 2 ? this._renderBackup() :
                        this._renderGetStarted()
                    }


                </div>
            </div>
        );
    }
}

export default connect(CreateAccountPassword, {
    listenTo() {
        return [AccountStore];
    },
    getProps() {
        return {};
    }
});
