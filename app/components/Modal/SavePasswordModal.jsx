import React from "react";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Trigger from "react-foundation-apps/src/trigger";
import Translate from "react-translate-component";
import BaseModal from "./BaseModal";

export default class SavePasswordModal extends React.Component {

    show() {
        ZfApi.publish("SavePasswordModal", "open");
    }


    render() {
        return (
            <BaseModal id="SavePasswordModal" overlay={true} ref="SavePasswordModal">
                <div className="grid-block vertical no-overflow">
                    <Translate component="h3" content="wallet.attention"/>
                    <Translate component="p" content="wallet.save_password_message"/>
                    <div className="button-group no-overflow" style={{paddingTop: 0}}>
                        <Trigger close="SavePasswordModal">
                            <div className="button"><Translate content="wallet.i_understand_button" /></div>
                        </Trigger>
                    </div>
                </div>
            </BaseModal>
        );
    }
}
