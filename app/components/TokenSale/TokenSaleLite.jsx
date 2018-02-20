import React from "react";
import TokenSalePage from "./TokenSalePage";
import SettingsStore from "../../stores/SettingsStore";
import axios from "axios/index";
import {Apis} from "bitsharesjs-ws";
import ls from "../../lib/common/localStorage";

const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

class TokenSaleLite extends React.Component {
  constructor() {
    super();
    this.state = {
      sub: null,
      wallets: {}
    };
  }

  componentWillMount() {
    let faucetAddress = SettingsStore.getSetting("faucet_address");
    let current_chain  = faucetAddress.split("/")[2].split(".")[0]

    if (Apis.instance().chain_id.substr(0, 8) === "5cfd61a0") {
      current_chain = "sandbox";
    }

    axios.get("https://" + current_chain + ".travelchain.io/api/accounts/me/", {
      headers: {
        Authorization: `JWT ${ss.get("backend_token")}`
      }
    }).then((response) => {
      this.setState({wallets: {...response.data.wallets }});
      if (!response.data.is_verified) this.props.router.push("/kyc");
    }).catch(() =>
    {
      localStorage.clear();
      this.props.router.push("/dashboard");
      location.reload(true);
    });
  }

  render() {
    console.log(123)
    return <div className="grid-block vertical">
      <TokenSalePage wallets={this.state.wallets}/>
    </div>;
  }
}

export default TokenSaleLite;