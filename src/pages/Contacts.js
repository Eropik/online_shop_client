
import {Card, Row, Col} from "react-bootstrap";
import React from 'react';

import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Contacts = () => {
    return (
        <Row>
           <Col md={7}><p className="welcome_text_cont"><h3>Contacts</h3></p>
            <Card className="cont_card"  border={"dark"}>
                <div>
                <p><h5>Покупателям</h5>
                Если у вас есть вопросы, напишите нам в чат. Почта для юридических лиц — <NavLink>2cons@hip.ru</NavLink>.
                </p>

                <p>
                <h5>Клиентам Hip-Travel</h5>
                    По вопросам, связанным с покупкой железнодорожных и авиабилетов, бронированием номера в отеле и тура или предстоящей поездкой напишите в чат поддержки <NavLink>Travelippo</NavLink>.

                </p>
                
                <p>
                <h5>Клиентам Hip-Bank</h5>
                Если у вас есть вопросы по карте или другим продуктам Hip-Bank, напишите в чат поддержки <NavLink>BaHip</NavLink>.
                </p>

                <p>
                <h5>Органам государственной власти</h5>
                <NavLink>2gover@hip.ru</NavLink> — почта для входящей корреспонденции от органов государственной власти.
                </p>
                 
                 <p>   
                <h5>Правоохранительным органам</h5>
                <NavLink>2docrequest@hip.ru</NavLink> — почта для запросов правоохранительных органов государственной власти.
                 </p>
                
                <p>
                <h5>Таможенным органам</h5>
                <NavLink>2border_cuns@hip.ru</NavLink> — почта для запросов таможенных органов по вопросам подачи продавцами Ozon статистических форм учёта перемещения товаров.
                </p>

                </div>
            </Card></Col>
            <Col md={5}>
                <section className="cont_section">
                <p><h5>Также следите за скидками и распродажами:</h5></p>
                    <NavLink to={"https://www.instagram.com/"}>
                        <FaInstagram style={{width:40, height:40}}className="footer-media-link m-2" />
                    </NavLink>
                    <NavLink to={""}>
                        <FaVk style={{width:40, height:40}} className="footer-media-link m-2"/>
                    </NavLink>
                    <NavLink to={""}>
                        <FaYoutube style={{width:40, height:40}} className="footer-media-link m-2"/>
                    </NavLink>
                    <NavLink to={""}>
                        <FaTiktok style={{width:40, height:40}} className="footer-media-link m-2"/>
                    </NavLink>
                </section></Col>
        </Row>
    );
};

export default Contacts;