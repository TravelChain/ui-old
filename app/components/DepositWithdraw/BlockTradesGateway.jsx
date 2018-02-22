import React from "react";
import Translate from "react-translate-component";
import {DropDownMenu, MenuItem} from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class BlockTradesGateway extends React.Component {
    constructor(props) {
      super();
      this.state = this._initialState(props);
    }

    _initialState(props) {
      // console.log(props.wallets[0]);
      return {
        activeCoin: ''
      }
    }
    onSelectCoin(event, index, value){
        this.setState({
            activeCoin: value
        });
    }

    render() {
        let {activeCoin} = this.state;

      const styles = {
        customWidth: {
          width: '100%',
        },
      };
      
      this.props.wallets['BTS'] = "Transfer BTS to account ' TRAVEL-CHAIN ' in BitShares network, and put name of your TravelChain account in the memo field";
      const wallets = this.props.wallets;

      console.log(wallets);
      if (!activeCoin) this.state.activeCoin = wallets['BTC'];

        return (
            <div>
                <div className="grid-block no-margin vertical medium-horizontal no-padding">
                    <div className="small-12 middle-content">
                        <div style={{paddingLeft: 10, paddingTop:35, lineHeight: 3}}>
                            <label style={{minHeight: "2rem"}} className="left-label"><Translate content={"gateway.choose_deposit"} />: </label>

                            <MuiThemeProvider>

                                <DropDownMenu
                                  value={activeCoin}
                                  onChange={this.onSelectCoin.bind(this)}
                                  autoWidth={true}
                                  style={styles.customWidth}
                                >
                                    {Object.keys(wallets).map(function(key) {
                                        return <MenuItem key={key} value={wallets[key]} primaryText={key} />;
                                    })}
                                </DropDownMenu>
                            </MuiThemeProvider>

                        </div>
                    </div>

                    <div className="small-12 middle-content">
                        <div style={{paddingLeft: 10, paddingTop:35}}>
                            <label style={{minHeight: "2rem"}} className="left-label"><Translate content="gateway.gateway_text" />:</label>
                            <div style={{paddingBottom: 15, fontSize: 13}}>
                              <div style={{ wordWrap: 'break-word'}}><strong>{this.state.activeCoin}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockTradesGateway;