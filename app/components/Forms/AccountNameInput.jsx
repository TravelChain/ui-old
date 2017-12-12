import React, {PropTypes} from "react";
import classNames from "classnames";
import AccountActions from "actions/AccountActions";
import AccountStore from "stores/AccountStore";
import {ChainValidation} from "bitsharesjs/es";
import counterpart from "counterpart";
import AltContainer from "alt-container";

class AccountNameInput extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        placeholder: PropTypes.string,
        initial_value: PropTypes.string,
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
        accountShouldExist: PropTypes.bool,
        accountShouldNotExist: PropTypes.bool,
        cheapNameOnly: PropTypes.bool,
        noLabel: PropTypes.bool
    };

    static defaultProps = {
        noLabel: false
    };

    constructor() {
        super();
        this.state = {
            value: null,
            error: null,
            existing_account: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value
            || nextState.error !== this.state.error
            || nextState.account_name !== this.state.account_name
            || nextState.existing_account !== this.state.existing_account
            || nextProps.searchAccounts !== this.props.searchAccounts
    }

    componentDidUpdate() {
        if (this.props.onChange) this.props.onChange({valid: !this.getError()});
    }

    getValue() {
        return this.state.value;
    }

    setValue(value) {
        this.setState({value});
    }

    clear() {
        this.setState({account_name: null, error: null, warning: null})
    }

    focus() {
        this.refs.input.focus();
    }

    valid() {
        return !this.getError();
    }

    getError() {
        if (this.state.value === null) return null;
        let error = null;
        if (this.state.error) {
            error = this.state.error;
        } else if (this.props.accountShouldExist || this.props.accountShouldNotExist) {
            let account = this.props.searchAccounts.find(a => a === this.state.value);
            if (this.props.accountShouldNotExist && account) {
                error = counterpart.translate("account.name_input.name_is_taken");
            }
            if (this.props.accountShouldExist && !account) {
                error = counterpart.translate("account.name_input.not_found");
            }
        }
        return error;
    }

    is_cheap_name(account_name) {
        return (/[0-9-.]/.test(account_name) || !/[aeiouy]/.test(account_name));
    }


    validateAccountName(value) {
        this.state.error = value === "" ?
            "Please enter valid account name" :
            ChainValidation.is_account_name_error(value)

        this.state.warning = null
        if (this.props.cheapNameOnly) {
            if (!this.state.error && !this.is_cheap_name(value))
                this.state.error = counterpart.translate("account.name_input.premium_name_faucet");
        } else {
            if (!this.state.error && !this.is_cheap_name(value))
                this.state.warning = counterpart.translate("account.name_input.premium_name_warning");
        }
        this.setState({value: value, error: this.state.error, warning: this.state.warning});
        if (this.props.onChange) this.props.onChange({value: value, valid: !this.getError()});
        if (this.props.accountShouldExist || this.props.accountShouldNotExist) AccountActions.accountSearch(value);
    }

    handleChange(e) {
        e.preventDefault();
        e.stopPropagation();
        // Simplify the rules (prevent typing of invalid characters)
        var account_name = e.target.value.toLowerCase()
        account_name = account_name.match(/[a-z0-9\.-]+/)
        account_name = account_name ? account_name[0] : null
        this.setState({account_name})
        this.validateAccountName(account_name);

    }

    onKeyDown(e) {
        if (this.props.onEnter && event.keyCode === 13) this.props.onEnter(e);
    }

    render() {
        let error = this.getError() || "";
        let class_name = classNames("form-group", "account-name", {"has-error": false});
        let warning = this.state.warning;
        // let {noLabel} = this.props;

        return (
            <div className={class_name}>
                {/* {noLabel ? null : <label><Translate content="account.name" /></label>} */}
                <section>
                    <span className="icon user icon-14px">
                        <svg width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.5 11C6.467 11 4 8.533 4 5.5S6.467 0 9.5 0 15 2.467 15 5.5 12.533 11 9.5 11zm0-10C7.019 1 5 3.019 5 5.5S7.019 10 9.5 10 14 7.981 14 5.5 11.981 1 9.5 1zM17.5 20h-16C.673 20 0 19.327 0 18.5c0-.068.014-1.685 1.225-3.3.705-.94 1.67-1.687 2.869-2.219C5.558 12.33 7.377 12 9.5 12s3.942.33 5.406.981c1.199.533 2.164 1.279 2.869 2.219C18.986 16.815 19 18.432 19 18.5c0 .827-.673 1.5-1.5 1.5zm-8-7c-3.487 0-6.06.953-7.441 2.756C1.024 17.107 1.001 18.488 1 18.502a.5.5 0 0 0 .5.498h16a.5.5 0 0 0 .5-.5c0-.012-.023-1.393-1.059-2.744C15.559 13.953 12.986 13 9.5 13z"></path></svg>
                    </span>

                    <input
                        name="username"
                        id="username"
                        type="text"
                        ref="input"
                        autoComplete="off"
                        placeholder="Account name (public)"
                        onChange={this.handleChange}
                        onKeyDown={this.onKeyDown}
                        value={this.state.account_name || this.props.initial_value}
                    />
                </section>
                <div style={{textAlign: "left"}} className="facolor-error">{error}</div>
                <div style={{textAlign: "left"}} className="facolor-warning">{error ? null : warning}</div>
            </div>
        );
    }
}

export default class StoreWrapper extends React.Component {

    render() {

        return (
            <AltContainer stores={[AccountStore]}
                          inject={{
                              searchAccounts: () => {
                                  return AccountStore.getState().searchAccounts;
                              }
                          }}
            >
                <AccountNameInput
                    ref="nameInput"
                    {...this.props}
                />
            </AltContainer>
        )
    }
}
