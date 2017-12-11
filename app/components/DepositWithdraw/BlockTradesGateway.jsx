import React from "react";
import Translate from "react-translate-component";
import {DropDownMenu, MenuItem} from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class BlockTradesGateway extends React.Component {
    constructor(props) {
        super();

        this.state = {
            activeCoin: "BTC"
        };
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


        return (

            <div>
                <div className="grid-block no-margin vertical medium-horizontal no-padding">
                    <div className="small-12 middle-content">
                        <div style={{paddingLeft: 10, paddingTop:35}}>
                            <label style={{minHeight: "2rem"}} className="left-label"><Translate content={"gateway.choose_deposit"} />: </label>

                            <MuiThemeProvider>
                                <DropDownMenu
                                  value={activeCoin}
                                  onChange={this.onSelectCoin.bind(this)}
                                  autoWidth={true}
                                  style={styles.customWidth}
                                >
                                    <MenuItem value='BTC' primaryText="BTC" />
                                    <MenuItem value='ETH' primaryText="ETH" />
                                    <MenuItem value='LTCT' primaryText="LTCT" />
                                </DropDownMenu>
                            </MuiThemeProvider>

                        </div>
                    </div>

                    <div className="small-12 middle-content">
                        <div style={{paddingLeft: 10, paddingTop:35}}>
                            <label style={{minHeight: "2rem"}} className="left-label"><Translate content="gateway.gateway_text" />:</label>
                            <div style={{paddingBottom: 15, fontSize: 13}}>
                              {activeCoin === "BTC" ? <div><strong>{this.props.btcWallet}</strong></div> : null}
                              {activeCoin === "ETH" ? <div><strong>{this.props.ethWallet}</strong></div> : null}
                              {activeCoin === "LTCT" ? <div><strong>{this.props.ltctWallet}</strong></div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockTradesGateway;