import React from "react";
import {Link} from "react-router/es";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";


class TopApps extends React.Component {

    render() {

        return (
            <div className="grid-block flex-start">
                <div className="grid-block shrink vertical medium-horizontal large-10 large-offset-1 top-apps-list">
                    <div className="grid-block shrink vertical medium-horizontal">
                        <div className="generic-bordered-box">
                            <h2>Top Apps</h2>
                        </div>
                    </div>

                    <div className="grid-block shrink vertical medium-horizontal">

                        <div className="item">
                            <div className="img__block">
                                <img src="http://via.placeholder.com/170x170" alt="Mapala"/>
                            </div>

                            <div className="info__block">
                                <h3 className="item__title">Mapala</h3>
                                <p className="item__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis
                                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
                                    sit
                                    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                                    illo
                                    inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    consequuntur
                                    magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                                    qui
                                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                                    eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                    voluptatem.</p>

                                <a href="https://mapala.net" className="item__link">https://mapala.net</a>
                            </div>
                            <ul className="social__block">
                                <li><Icon name="vkontakte-logo" size="2x" fillClass="fill-black"/></li>
                                <li><Icon name="github-sign" size="2x" fillClass="fill-black"/></li>
                                <li><Icon name="telegram" size="2x" fillClass="fill-black"/></li>
                            </ul>
                        </div>


                        <div className="item">
                            <div className="img__block">
                                <img src="http://via.placeholder.com/170x170" alt="Aigents"/>
                            </div>
                            <div className="info__block">
                                <h3 className="item__title">Aigents</h3>
                                <p className="item__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis
                                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
                                    sit
                                    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                                    illo
                                    inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    consequuntur
                                    magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                                    qui
                                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                                    eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                    voluptatem.</p>

                                <a href="https://mapala.net" className="item__link">https://mapala.net</a>
                            </div>
                            <ul className="social__block">
                                <li><Icon name="vkontakte-logo" size="2x" fillClass="fill-black"/></li>
                                <li><Icon name="github-sign" size="2x" fillClass="fill-black"/></li>
                                <li><Icon name="telegram" size="2x" fillClass="fill-black"/></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopApps;
