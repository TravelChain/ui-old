import React from "react";
import {Link} from "react-router/es";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";

class ExplorerCard extends React.Component {

    render() {

        return (
            <div className="grid-content">
                <div className="card">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Explorer extends React.Component {

    render() {

        return (
            <div className="grid-block page-layout flex-start">
                <div className="grid-block small-up-1 medium-up-2 large-up-3 category-list">
                    <ExplorerCard>
                        <Link to="explorer/blocks">
                            <div>
                                <Icon name="blockchain_grdient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="explorer.blocks.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    <ExplorerCard className="ds">
                        <Link to="explorer/assets">
                            <div>
                                <Icon name="assets_gradient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="explorer.assets.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    <ExplorerCard>
                        <Link to="explorer/accounts">
                            <div>
                                <Icon name="accounts_gradient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="explorer.accounts.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    <ExplorerCard>
                        <Link to="explorer/witnesses">
                            <div>
                                <Icon name="Witnesses_gradient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="explorer.witnesses.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    <ExplorerCard>
                        <Link to="explorer/committee-members">
                            <div>
                                <Icon name="commitee_gradient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="explorer.committee_members.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    <ExplorerCard>
                        <Link to="explorer/markets">
                            <div>
                                <Icon name="market_gradient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="markets.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    <ExplorerCard>
                        <Link to="explorer/fees">
                            <div>
                                <Icon name="fee_gradient" size="5x" fillClass="fill-black"/>
                            </div>
                            <div className="card-divider text-center">
                                <Translate component="span" content="fees.title"/>
                            </div>
                        </Link>
                    </ExplorerCard>
                    {/*<ExplorerCard>
                            <Link to="blocks">
                                <div>
                                    <Icon name="proposals" size="5x" fillClass="fill-black"/>
                                </div>
                                <div className="card-divider text-center">
                                    <Translate component="span" content="explorer.proposals.title" />
                                </div>
                            </Link>
                        </ExplorerCard>*/}
                </div>

            </div>
        );
    }
}

export default Explorer;
