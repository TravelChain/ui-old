import React from "react";
import Translate from "react-translate-component";



class BlockTradesGateway extends React.Component {
    constructor(props) {
        super();

        this.state = {
            activeCoin: "BTC"
        };
    }



    onSelectCoin(e) {
        this.setState({
            activeCoin: e.target.value
        });
    }

    render() {

        let {activeCoin} = this.state;


        return (

            <div>
                <div className="grid-block no-margin vertical medium-horizontal no-padding">
                    <div className="medium-4">
                        <div>
                            <label style={{minHeight: "2rem"}} className="left-label"><Translate content={"gateway.choose_deposit"} />: </label>
                            <select
                                className="external-coin-types bts-select"
                                onChange={this.onSelectCoin.bind(this)}
                                value={activeCoin}>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                                <option value="LTCT">LTCT</option>
                            </select>
                        </div>
                    </div>

                    <div className="medium-6 medium-offset-1">
                        <label style={{minHeight: "2rem"}} className="left-label"><Translate content="gateway.gateway_text" />:</label>
                        <div style={{paddingBottom: 15}}>
                          {activeCoin === "BTC" ? <div><strong>{this.props.btcWallet}</strong></div> : null}
                          {activeCoin === "ETH" ? <div><strong>{this.props.ethWallet}</strong></div> : null}
                          {activeCoin === "LTCT" ? <div><strong>{this.props.ltctWallet}</strong></div> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockTradesGateway;