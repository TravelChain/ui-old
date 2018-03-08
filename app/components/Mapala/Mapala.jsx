import React from "react";
import SettingsStore from "../../stores/SettingsStore";
import axios from "axios/index";
import {Apis} from "bitsharesjs-ws";
import ls from "../../lib/common/localStorage";
import {FormControl, Input, InputAdornment, InputLabel, TextField} from "material-ui-next";

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
    let current_chain = faucetAddress.split("/")[2].split(".")[0]

    if (Apis.instance().chain_id.substr(0, 8) === "5cfd61a0") {
      current_chain = "sandbox";
    }

    axios.get("https://" + current_chain + ".travelchain.io/api/accounts/me/", {
      headers: {
        Authorization: `JWT ${ss.get("backend_token")}`
      }
    }).then((response) => {
      this.setState({wallets: {...response.data.wallets}});
      if (!response.data.is_verified) this.props.router.push("/kyc");
    }).catch(() => {
      localStorage.clear();
      this.props.router.push("/dashboard");
      location.reload(true);
    });
  }

  loginToMapala() {
    document.getElementById("m_error").innerText = "";
    document.getElementById("m_info").innerText = "";
    var username = document.getElementById("m_username").value.trim();
    var password = document.getElementById("m_password").value.trim();
    if (username && password) {
      //axios.post("https://sandbox.travelchain.io/api/mapala/", {'mapala_username': username, 'mapala_password': password}, {
      axios.post("https://" + current_chain + ".travelchain.io/api/mapala/", {'mapala_username': username, 'mapala_password': password}, {
        headers: {
          Authorization: `JWT ${ss.get("backend_token")}`
        }
      }).then((response) => {
        document.getElementById("m_info").innerText = "Your account of Mapala was successfully assigned, you will receive your tokens within 24 hours";
      }).catch(() => {
        document.getElementById("m_error").innerText = "Invalid username or password";
        document.getElementById("m_info").innerText = "";
      });
    } else {
      document.getElementById("m_error").innerText = "Please provide login and password";
    }

  }

  render() {
    return <form className="grid-block vertical" style={{textAlign: "center"}}>
      <div className="grid-block shrink vertical medium-horizontal" style={{width: "600px", marginTop: "50px", display: "block", marginLeft: "auto", marginRight: "auto", textAlign: "left"}}>

        <form
          className="grid-content transfer-form"
          noValidate>

          <h3>For transfer tokens from Mapala to Travel Chain please login into mapala by following form.</h3>
          <br/>
          <div className="content-block transfer-input">
            <TextField
              label="Mapala User Name"
              multiline
              rows="4"
              defaultValue=""
              margin="normal"
              fullWidth
              id="m_username"
            />
          </div>
          <div className="content-block transfer-input">
            <TextField
              label="Mapala Password"
              multiline
              rows="4"
              defaultValue=""
              margin="normal"
              fullWidth
              id="m_password"
            />
          </div>
          <div>
            <div style={{color: "red"}} id="m_error"></div>
            <div id="m_info"></div>
            <button className="button" type="button" onClick={this.loginToMapala.bind(this)} style={{marginBottom: "10px !important"}}>Login to Mapala</button>
          </div>
        </form>
      </div>
    </form>;
  }
}

export default TokenSaleLite;