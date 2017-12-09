import React from "react";
import HelpContent from "../Utility/HelpContent";
import AccountStore from "stores/AccountStore";
import axios from 'axios'
import ls from "common/localStorage";
import BlockTradesGateway from "../DepositWithdraw/BlockTradesGateway";

const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

class TokenSale extends React.Component {

  constructor(props) {
    super();

    this.state = {
      BTC: "",
      ETH: "",
      LTCT: ""
    }
  }


  componentWillMount() {
    axios.get("https://testnet.travelchain.io/api/accounts/me/", {
      headers: {
        Authorization: `JWT ${ss.get("backend_token")}`
      }
    }).then((response) => {
      this.setState({...response.data});
      if (!response.data.is_verified) this.props.router.push("/kyc");
    }).catch(() => this.props.router.push("/kyc"));
  }




  render() {
    // let { account } = this.props;
    let { BTC, ETH, LTCT } = this.state;
    console.log(this.state)

    return (

      <div className='grid-container'>
        {/*<div  className={this.props.contained ? "grid-content" : "grid-container"}>*/}
        <div className='grid-container' style={{paddingTop: "2rem"}}>
          {/*<div className={this.props.contained ? "" : "grid-content"} style={{paddingTop: "2rem"}}>*/}

          <div className="grid-block vertical medium-horizontal no-margin no-padding">
            <div className="medium-10 show-for-medium">
              <HelpContent path="components/DepositWithdraw" section="deposit-short"/>
            </div>
          </div>
          <div>
            <div className="grid-block vertical medium-horizontal no-margin no-padding">
              <div className="medium-5 medium-offset-1 small-order-1 medium-order-2" style={{paddingBottom: 20}}>
              </div>
            </div>
          </div>

          <div className="grid-content no-padding" style={{paddingTop: 15}}>
            <div className="content-block">
              {/* <div className="float-right">
                            <a href="https://www.ccedk.com/" target="__blank" rel="noopener noreferrer"><Translate content="gateway.website" /></a>
                        </div> */}
              <div className="service-selector">
                <ul className="button-group segmented no-margin">
                  {/*     <li onClick={this.toggleOLService.bind(this, "gateway")} className={olService === "gateway" ? "is-active" : ""}><a><Translate content="gateway.gateway" /></a></li>
                                <li onClick={this.toggleOLService.bind(this, "fiat")} className={olService === "fiat" ? "is-active" : ""}><a>Fiat</a></li> */}
                </ul>
              </div>


              <BlockTradesGateway
              btcWallet={BTC}
              ethWallet={ETH}
              ltctWallet={LTCT}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokenSale;