import React from "react";
import Translate from "react-translate-component";
import classnames from "classnames";
import axios from "axios";
import ls from "common/localStorage";
import IntlTelInput from '../CountriesSelectInput/main.js';
import 'react-intl-tel-input/dist/libphonenumber.js';
import '../CountriesSelectInput/main.css';
import TextField from 'material-ui/TextField';
var validator = require("email-validator");

const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

class Kyc extends React.Component {

    constructor(props) {
        super(props);
        this.state = Kyc.getInitialState();

    }

    static getInitialState() {
        return {
            first_name: "",
            surname: "",
            country: "",
            birthday: "",
            email: "",
            phone: "",
            address: "",
            activity: "",
            isAgreedTerms: false,
            isAgreedTermsTokens: false,
            currentCountryISO2: "ru",
            currentCountryDialCode: "ru"
        };

    };

    resetForm() {
        this.setState({
            first_name: "",
            surname: "",
            country: "",
            birthday: "",
            email: "",
            phone: "",
            address: "",
            activity: "",
            isAgreedTerms: false,
            isAgreedTermsTokens: false,
            currentCountryISO2: "",
            currentCountryDialCode: ""
        });
    }


    componentWillMount () {
      // $('№phone').mask('0000-0000');
      // $("#phone").intlTelInput();
      // axios.get("https://testnet.travelchain.io/api/accounts/me/", {
      //   headers: {
      //     Authorization: `JWT ${ss.get("backend_token")}`
      //   }
      // }).then((response) => response.data.is_verified ? this.props.router.push("/dashboard") : false)
      //   .catch(() => this.props.router.push("/dashboard"));
    }

    onSubmit(e) {
        e.preventDefault();

        axios({
          method: "PUT",
          url: 'https://testnet.travelchain.io/api/accounts/me/',
          data: {...this.state},
          headers: {
            'Authorization': `JWT ${ss.get('backend_token')}`
          }
        }).then(() => this.props.router.push('/token-sale'))
          .catch((e) => console.log(e));
    }



    onKYCformInputChanged (e) {
        this.setState({[e.target.id]: e.target.value});
    }

    updatePhoneNumber (value) {
        this.setState({phone: value});
    }
    render() {
        let {first_name, surname, country, birthday, email, phone, address, activity, isAgreedTerms, isAgreedTermsTokens, currentCountryISO2} = this.state;



        const isSendNotValid = !first_name || !surname || !country || !birthday || !address || !activity || !isAgreedTerms || !isAgreedTermsTokens ||
          !validator.validate(email) || !(phone.indexOf("_") === -1);

        return (

            <div className="grid-block vertical">
            <div className="grid-block shrink vertical medium-horizontal" style={{paddingTop: "2rem"}}>

                <form style={{paddingBottom: 20, overflow: "visible"}} className="grid-content small-12 medium-6 large-5 large-offset-1 full-width-content user-form" onSubmit={this.onSubmit.bind(this)} noValidate>

                    <Translate content="kyc.header" component="h2" />
                  {/*  First name  */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.first_name" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}} id="first_name" onChange={this.onKYCformInputChanged.bind(this)} />*/}


                      {/* warning */}
                      {/*{ !first_name ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                            {/*Field is required*/}
                        {/*</div>*/}
                        {/*:null}*/}


                        <TextField
                            required
                            id="first_name"
                            label="FIRST NAME"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Tim"
                            fullWidth
                            margin="normal"
                        />
                    </div>


                  {/*  Surname  */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.surname" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}} id="surname" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                        {/*/!* warning *!/*/}
                        {/*{ !surname ?*/}
                          {/*<div className="error-area" style={{position: "absolute"}}>*/}
                            {/*Field is required*/}
                          {/*</div>*/}
                          {/*:null}*/}

                        <TextField
                            required
                            id="surname"
                            label="LAST NAME"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Smith"
                            fullWidth
                            margin="normal"
                        />
                    </div>

                  {/* Country */}
                    <div className="content-block transfer-input">
                        <Translate className="left-label tooltip" component="label" content="kyc.country" data-place="top"/>
                        <input type="text" style={{marginBottom: 0}}  id="country" onChange={this.onKYCformInputChanged.bind(this)} />
                        {/* warning */}
                        { !country ?
                          <div className="error-area" style={{position: "absolute"}}>
                            Field is required
                          </div>
                          :null}

                    </div>

                  {/* Birthday */}
                    <div className="content-block transfer-input">
                        <Translate className="left-label tooltip" component="label" content="kyc.birthday" data-place="top"/>
                        <input type="date" style={{marginBottom: 0}}  id="birthday" onChange={this.onKYCformInputChanged.bind(this)} />
                      {/* warning */}
                      { !birthday ?
                        <div className="error-area" style={{position: "absolute"}}>
                          Field is required
                        </div>
                        :null}

                        {/*<TextField*/}
                            {/*required*/}
                            {/*id="surname"*/}
                            {/*label="LAST NAME"*/}
                            {/*InputLabelProps={{*/}
                                {/*shrink: true,*/}
                            {/*}}*/}
                            {/*placeholder="Smith"*/}
                            {/*fullWidth*/}
                            {/*margin="normal"*/}
                        {/*/>*/}
                    </div>

                  {/* Contact email */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.email" data-place="top"/>*/}
                        {/*<input type="email" style={{marginBottom: 0}}  id="email" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                      {/*/!* warning *!/*/}
                      {/*{ !validator.validate(email) ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                          {/*Email is wrong*/}
                        {/*</div>*/}
                        {/*:null}*/}

                        <TextField
                            required
                            id="surname"
                            label="CONTACT EMAIL"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder=""
                            fullWidth
                            margin="normal"
                        />
                    </div>

                  {/* Contact phone */}
                    <div className="content-block transfer-input">
                        <Translate className="left-label tooltip" component="label" content="kyc.phone" data-place="top"/>
                        {/*<input type="tel" style={{marginBottom: 0}}  id="phone" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                        <IntlTelInput id="phone" css={['intl-tel-input', 'form-control']}
                                      currentCountryISO2={currentCountryISO2}
                                      onPhoneNumberChange={(...args) => this.updatePhoneNumber(args[1])}
                                      utilsScript={'libphonenumber.js'}
                                      defaultCountry={'ru'}
                                      onSelectFlag={(currentNumber, countryDetails) => {
                                          this.setState({
                                              currentCountryISO2: countryDetails.iso2,
                                              currentCountryDialCode: countryDetails.dialCode
                                          });
                                      }} />

                        {/* warning */}
                        { !(phone.indexOf("_") === -1) ?
                          <div className="error-area" style={{position: "absolute"}}>
                            Field is required
                          </div>
                          :null}
                    </div>

                  {/* Address */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.address" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}}  id="address" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                      {/*/!* warning *!/*/}
                      {/*{ !address ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                          {/*Field is required*/}
                        {/*</div>*/}
                        {/*:null}*/}

                        <TextField
                            required
                            id="surname"
                            label="ADDRESS"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder=""
                            fullWidth
                            margin="normal"
                        />
                    </div>

                  {/* Kind of activity */}
                    <div className="content-block transfer-input">
                        {/*<Translate className="left-label tooltip" component="label" content="kyc.activity" data-place="top"/>*/}
                        {/*<input type="text" style={{marginBottom: 0}}  id="activity" onChange={this.onKYCformInputChanged.bind(this)} />*/}
                      {/*/!* warning *!/*/}
                      {/*{ !activity ?*/}
                        {/*<div className="error-area" style={{position: "absolute"}}>*/}
                          {/*Field is required*/}
                        {/*</div>*/}
                        {/*:null}*/}


                        <TextField
                            required
                            id="surname"
                            label="KIND OF ACTIVITY"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder=""
                            fullWidth
                            margin="normal"
                        />
                    </div>


                    <div className="confirm-checks">
                        <label>
                            <input id='terms_agreement_checkbox' type="checkbox" onChange={(e) => this.setState({isAgreedTerms: e.target.value})}/>
                            <span>I agree to the processing of personal data</span>
                        </label>
                    </div>

                    <div className="confirm-checks">
                        <label>
                            <input id='terms_agreement_checkbox_2' type="checkbox" onChange={(e) => this.setState({isAgreedTermsTokens: e.target.value})}/>
                            <span>You are acquainted and you agree with the
                                <a href="https://drive.google.com/file/d/1f0zviV_rN6LgXyO-bWQqNzfix7YfwSEn/view?usp=sharing" target="_blank"> TRAVELCHAIN TRAVELTOKENS SALE AGREEMENT
                                </a>
                            </span>
                        </label>
                    </div>

                    <button className={classnames("button float-right no-margin", {disabled: isSendNotValid})} type="submit" value="Submit">
                        <Translate component="span" content="transfer.send" />
                    </button>
                </form>
              </div>
            </div>
        );
    }
}

export default Kyc;
