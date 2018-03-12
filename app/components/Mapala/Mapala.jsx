import React from "react";
import SettingsStore from "../../stores/SettingsStore";
import axios from "axios/index";
import {Apis} from "bitsharesjs-ws";
import ls from "../../lib/common/localStorage";
import {FormControl, Input, InputAdornment, InputLabel, TextField} from "material-ui-next";
import Translate from "react-translate-component";

const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

class Mapala extends React.Component {
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
    let faucetAddress = SettingsStore.getSetting("faucet_address");
    let current_chain = faucetAddress.split("/")[2].split(".")[0]

    if (Apis.instance().chain_id.substr(0, 8) === "5cfd61a0") {
      current_chain = "sandbox";
    }

    document.getElementById("m_error").style.display = "none";
    document.getElementById("m_info").style.display = "none";
    var username = document.getElementById("m_username").value.trim();
    var password = document.getElementById("m_password").value.trim();
    document.getElementById("m_password").value = "";
    if (username && password) {
      //axios.post("https://sandbox.travelchain.io/api/mapala/", {'mapala_username': username, 'mapala_password': password}, {
      axios.post("https://" + current_chain + ".travelchain.io/api/mapala/", {'mapala_username': username, 'mapala_password': password}, {
        headers: {
          Authorization: `JWT ${ss.get("backend_token")}`
        }
      }).then((response) => {
        document.getElementById("m_error").style.display = "none";
        document.getElementById("m_info").style.display = "block";
      }).catch(() => {
        document.getElementById("m_error").style.display = "block";
        document.getElementById("m_info").style.display = "none";
      });
    } else {
      document.getElementById("m_error").style.display = "block";
    }

  }

  render() {
    return <form className="grid-block vertical" style={{textAlign: "center"}}>
      <div className="grid-block shrink vertical medium-horizontal" style={{width: "600px", marginTop: "50px", display: "block", marginLeft: "auto", marginRight: "auto", textAlign: "left"}}>

        <form
          className="grid-content transfer-form"
          noValidate>
          <Translate content="mapala.header" component="h3" />
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
            <div style={{color: "red", display:"none"}} id="m_error"><Translate content="mapala.wrong-password" component="span" /></div>
            <div id="m_info" style={{display:"none"}}><Translate content="mapala.done" component="span" /></div>
            <button className="button" type="button" onClick={this.loginToMapala.bind(this)} style={{marginBottom: "10px !important"}}><Translate content="mapala.login" component="span" /></button>
          </div>
        </form>
      </div>
    </form>;
  }
}

export default Mapala;