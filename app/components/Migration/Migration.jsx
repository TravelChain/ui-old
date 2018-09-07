import React from "react";
import AccountNotifications from "../Notifier/NotifierContainer";
import cnames from "classnames";
import HelpContent from "../Utility/HelpContent";
import DataTables from 'material-ui-datatables';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const travelchainTheme = getMuiTheme();


class Migration extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {

  
    return (
      <div className="grid-block page-layout market-layout">
        <AccountNotifications/>
        <div style={{paddingTop: 0}} className={cnames("grid-block main-content vertical no-overflow")}>
          <div className="grid-block vertical no-padding ps-container" id="CenterContent" ref="center">

            <div className="grid-block no-overflow wrap shrink">

              <div className="small-12 medium-6 large-6 middle-content" style={{fontSize: '20', marginLeft: 'auto', marginRight: 'auto'}}>
                  <div>
                  <h2>Hello, everyone!.</h2>
                    <p> We are sincerely grateful to the community for yours patience, involvement and cark. And we are very happy to inform you, that everything’s ready for the first wave of TravelChain evolvement.</p>
                    <p> It’s not a secret, that technical evolvement of TravelChain on the BitShares fork wasn't really a thing. All because we understood that there's not much space to grow and decided to change the path.  9 months of blockchain TC-OLD (that's how we are gonna call it from now on), was used only as a token storage. Now the tokens will be exchanged at 1/1 rate for core tokens in TC-EOS’ Blockchain, and will get a ton of possible ways of use - we will talk about them in later announces.</p>
                  </div>
                  <br></br>
                  <h3>Tutorial</h3>
                  <p>EOS-based TravelChain token swap tutorial, step by step instructions: <a href="http://travelchain.io/instructions.pdf" target="_blank">ENG</a>/<a href="https://travelchain.io/instructions_rus.pdf" target="_blank">RUS</a>.</p>

                  <br></br>
                  <h3> The plan </h3>
                  <br></br>
                  <b>Step 1. Synchronizing software. STATUS: COMPLETE</b>
                  <p>Delegates will be the first ones to enter the new network . They have to open and synchronize TravelChain software, providing end points for external connections and addresses of the seed-nodes.End points will be used for add-ons and applications, and seed-nodes will be used for the general network synchronization. At this point recorders are turned off. Delegates only can synchronize the software and cant sign blocks yet, because -as everyone- they don't have the accounts yet, and the network isn't active yet.</p>
                  <p>BLOG: <a href= "https://dacom.io/en/the-tc-eos-launch-step-1-synchronization/">ENG</a>/<a href = "https://dacom.io/ru/shagh-1-sinkhronizatsiia/">RUS</a></p>
                  <br></br>
                  <br></br>
                  <b>Step 2. Turning on the registrators. STATUS: COMPLETE</b>
                  <p>There will be at least 2 registrators. They will be based on different scenarios and have different duties. The main recorder will be the desktop wallet -  tc-wallet, in which voting for the delegates and network activation will take place. The secondary recorder- web-recorder from DACom community groups - will record the small achievements.At this point delegates will make the accounts and adjust nodes to sign the blokes. At the same time the community will start making their own accounts.</p>
                  <p>BLOG: <a href= "https://dacom.io/en/tc-eos-launch-step-2-enabling-registrators/">ENG</a>/<a href = "https://dacom.io/ru/zapusk-tc-eos-etap-2-vkliuchieniie-rieghistratorov/">RUS</a></p>
                  <br></br>
                  <br></br>
                  <b>Step 3. Enabling the gateway. STATUS: COMPLETE</b>
                  <p>To transfer tokens from TC-OLD to TC-EOS, you'll need to send it to a special account from the old network, and in the memo field you'll need to put the name of the new account in the new network.  Tokens will appear on your new account in the TC-EOS network in a few minutes. Reverse transfer won't be possible.</p>
                  <p>BLOG: <a href= "https://dacom.io/en/step-3/">ENG</a>/<a href = "https://dacom.io/ru/shagh-3-zapusk-shliuza/">RUS</a></p>
                  <br></br>
                  <b>Step 4. Activation. STATUS: PROCESS</b>
                  <p>Before the network activation there will be no rewards for the delegates. The network isn't fully safe, because delegates have no motivation to support it. For a network to become The Network it needs to be activated. Activation is a collective process.</p>
                  <p>To participate in the network activation with the tc-wallet, you need to  gain the power of decision-making. This process is called "stake". To "stake" tokens means to get some weight of voice in the community decision making process.</p>
                  <p>The main point of stake is exchanging your TT for the power and bandwidth of the CPU and NET. Reverse exchange for the same amount of TT will take 3 days without any loss of tokens. More detail about the bandwidth and limited resources of the network in later announces. </p>
                  <p>The bandwidth will let you take action and make decisions in the network, without the bandwidth any action will be limited. The limits will be barely noticeable at first, but they will get stricter with TravelChain evolvement. So it's better to stake your tokens now and have a resource reserve. </p>
                  <p>Activation will happen when the total amount of votes given for the delegates will reach 20 000 000 TT. After that the network will be fully operating and rewards to the delegates will start happening. It's impossible to say the exact time of the activation, because everything depends on the activity of the community. </p>
                  <p>Follow the news on the <a href="https://dacom.io">BLOG</a></p>
                  <br></br>
                  <p><i>TravelChain Core Team</i></p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Migration;
