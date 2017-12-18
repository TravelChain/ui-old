// look for more icons here https://linearicons.com/free or here http://hawcons.com/preview/

import React from "react";

let icons = ["user", "trash", "chevron-down", "menu", "database", "download", "search",
    "plus-circle", "question-circle", "cross-circle", "cog", "layers", "users", "wand", "b-logo",
    "accounts", "witnesses", "assets", "proposals", "blocks", "committee_members", "workers", "key",
    "checkmark-circle", "checkmark", "piggy", "locked", "unlocked", "markets", "fi-star", "fees",
    "thumb-tack", "clock", "clippy", "shuffle", "transfer", "dollar", "deposit", "withdraw",
    "settle", "trade", "adjust", "excel", "share", "minus-circle", "accounts_gradient", "accounts_white",
    "assets_gradient", "assets_white", "blockchain_grdient", "blockchain_white", "commitee_gradient", "commitee_white",
    "fee_gradient", "fee_white", "locked-padlock", "market_gradient", "market_white", "qr-code_header", "settings",
    "Witnesses_gradient", "Witnesses_white", "balance_gray", "dashboard_gray", "issued_asset_gray",
    "membership_gray", "permition_gray", "voting_gray", "whitelist_gray", "closed-lock", "logo", "github-sign",
    "telegram", "vkontakte-logo"];

let icons_map = {};
for (let i of icons) icons_map[i] = require(`./${i}.svg`);

require("./icon.scss");

class Icon extends React.Component {
    render() {
        let classes = "icon " + this.props.name;
        if (this.props.size) {
            classes += " icon-" + this.props.size;
        }
        if (this.props.className) {
            classes += " " + this.props.className;
        }
        return <span className={classes} style={this.props.style || {}}
                     dangerouslySetInnerHTML={{__html: icons_map[this.props.name]}}/>;
    }
}

Icon.propTypes = {
    name: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(["1x", "2x", "3x", "4x", "5x", "10x"]),
    inverse: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default Icon;
