import React from "react";
import AccountNotifications from "../Notifier/NotifierContainer";
import cnames from "classnames";
import HelpContent from "../Utility/HelpContent";
import BlockTradesGateway from "../DepositWithdraw/BlockTradesGateway";
import DataTables from 'material-ui-datatables';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const travelchainTheme = getMuiTheme();


class TokenSalePage extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super();
    this.state = {ladders:{}}
  }



  componentDidMount() {
    fetch("https://wallet.travelchain.io/api/ladder/1/")
      .then(res => res.json())
      .then(
        (result) => {


          this.setState({
            ladders: result,
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            ladders: result,
          });
        }
      );

    fetch("https://wallet.travelchain.io/api/v.0.1/transactions/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            trxs: result.results,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )


  }


  get_next_price(ladders) {
    let current_stage = ladders.current_stage;

    if (current_stage == "0-100k") {
      return 0.01596;
    }
    if (current_stage == "100k-500k") {
      return 0.01672;
    }
    if (current_stage == "500k-1kk") {
      return 0.01778;
    }

  }

  get_current_price(ladders) {
    let current_price = 1 / ladders.current_price;
    return current_price.toFixed(4);
  }

  get_remain_amount(ladders) {
    let current_stage = ladders.current_stage;
    let remain = 0;

    if (current_stage == "0-100k") {
      remain = 100000 - ladders.amount;

      return remain.toFixed(4);
    }
    if (current_stage == "100k-500k") {
      remain = 500000 - ladders.amount;

      return remain.toFixed(4);
    }
    if (current_stage == "500k-1kk") {
      remain = 500000 - ladders.amount;

      return remain.toFixed(4);
    }
    if (current_stage == "1kk-9.6kk") {
      remain = 9600000 - ladders.amount;

      return remain.toFixed(4);
    }
  }

  get_total_raised(ladders) {
    let total_amount = ladders.amount + 606000 + 598000;
    total_amount = total_amount.toFixed(4)
    return total_amount;
  }


  render() {

    const TABLE_COLUMNS = [
      {
        key: 'processed_at',
        label: 'DateTime',
      }, {
        key: 'amount',
        label: 'Amount, D.USD',
      }];

    let {ladders, trxs} = this.state;

    return (
      <div className="grid-block page-layout market-layout">
        <AccountNotifications/>
        <div style={{paddingTop: 0}} className={cnames("grid-block main-content vertical no-overflow")}>
          <div className="grid-block vertical no-padding ps-container" id="CenterContent" ref="center">

            <div className="grid-block no-overflow wrap shrink">

              <div className="small-12 medium-4 middle-content" style={{padding: 35, paddingBottom: 0}}>
                <HelpContent path="components/DepositWithdraw" section="deposit-short"/>
                <br></br>
                <p> Round Finish: <b> 14-00 UTC, 12 March, 2018 </b></p>
                <p> Total Raised: <b>{this.get_total_raised(ladders)} D.USD</b></p>
                <p> Current Price: <b> {this.get_current_price(ladders)} TT / D.USD </b></p>
                <p> Next Price: <b> {this.get_next_price(ladders)} TT / D.USD </b></p>
                <p> Remain before a next price: <b>{this.get_remain_amount(ladders)} D.USD </b></p>

              </div>


              <div className="small-12 medium-4 middle-content" style={{padding: 35}}>
                <h3>Buy TravelTokens</h3>
                <BlockTradesGateway
                  wallets={this.props.wallets}
                />
              </div>

              <div className="small-12 medium-4 middle-content" style={{padding: 35}}>
                <h3>Last 100 purchases:</h3>
                <MuiThemeProvider muiTheme={travelchainTheme}>
                  <DataTables
                    height={'500'}
                    selectable={false}
                    showRowHover={true}
                    columns={TABLE_COLUMNS}
                    data={trxs}
                    showFooterToolbar={false}
                    showCheckboxes={false}
                    onCellClick={this.handleCellClick}
                    onCellDoubleClick={this.handleCellDoubleClick}
                    onFilterValueChange={this.handleFilterValueChange}
                    onSortOrderChange={this.handleSortOrderChange}
                    page={1}
                    count={100}
                  />
                </MuiThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokenSalePage;
