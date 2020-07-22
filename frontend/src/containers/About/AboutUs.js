import React from 'react';
import './AboutUs.css'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {NavLink} from "react-router-dom";

const AboutUs = () => {
    return (
        <>
            <div className='block1'>
                <div>
                    <h4 className="title">Все легко и просто</h4>
                    <p className="block1Text">
                        Наш сервис готов предоставить Вам услуги доставки ваших вещей по городу Бишкек. Сейчас у всех не
                        хватает времени. Вам нужно перевезти какие-то книги ? Ваш сын забыл докуметы дома и их некому
                        привезти ? Не успеваете привезти своей дочери подарок на день рожденья ? Теперь Вам не нужно об
                        это беспокоится. Ведь есть мы, Delivery For All! Вы в любой момент можете заказать доставку из
                        одной, а то из нескольких точек города в другую. Готовы сделать заказ ? Так вперед, <NavLink
                        to="/add-order">Заказать
                        доставку</NavLink>. А если Вы по каким-то причинам не можете этого сделать, то Вы
                        можете <NavLink to="/contacts">
                        связаться с нами.
                    </NavLink>
                    </p>
                </div>
                <div className="item2">
                    <img src="https://www.groovypost.com/wp-content/uploads/2016/12/ms-teams-review.png" alt="team"
                         className="image1"/>
                </div>
            </div>
            <div>
                <h4 className="title">Преимущества</h4>
                <div className="block2">


                    <div className="flex-item">
                        <LiveHelpIcon className="iconStyle"/>
                        <h5>полный контроль процесса заказа от приема до выдaчи кypьepy</h5>
                    </div>
                    <div className="flex-item">
                        <DesktopWindowsIcon className="iconStyle"/>
                        <h5>полный контроль процесса заказа от приема до выдaчи кypьepy</h5>
                    </div>
                    <div className="flex-item">
                        <CardGiftcardIcon className="iconStyle"/>
                        <h5>полный контроль процесса заказа от приема до выдaчи кypьepy</h5>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="title">Команда</h4>
                <p className="title">
                    Каждый человек в нашей команде профессионал в своем деле и настоящий гурман. И все мы сходимся в
                    одном
                    мнении: "Самое дорогое - это время". Только на одних суши, пиццах и фаст-фуде долго не протянешь,
                    особенно,
                    когда не всегда есть время готовить самостоятельно.</p>
                <img src="https://squalio.com/wp-content/uploads/2018/08/Teams.png" alt="team" className="teamImg"/>
            </div>

        </>
    );
};

export default AboutUs;