import React from 'react';
import './AboutUs.css'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const AboutUs = () => {
    return (
        <>
            <div className="title">
                <h4>Готовы сделать свой заказ ?</h4>
                <NavLink to="/add-order"><Button color="primary" variant="contained">Заказать доставку</Button></NavLink>
            </div>
            <div className='block1'>
                <div>
                    <h4 className="title">Все легко и просто</h4>
                    <p className="block1Text">
                        Абсолютно каждому человеку важно питаться регулярно, чтобы всегда быть в тонусе. А с учетом
                        растущего ритма жизни в Бишкеке это просто необходимость! Поэтому мы разработали и запустили
                        сервис доставки по Бишкеку Namba Food. Он позволяет не только вовремя и регулярно питаться
                        всегда вкусной, горячей и разнообразной едой. И при этом, не тратить время на ее приготовление.
                        Но и заказывать свежие продукты из супермаркетов, медикаменты из аптек, еду для Ваших питомцев.
                        А услуга "личный курьер" легко решит проблемы с доставкой: Если у вас интернет-магазин, инста -
                        магазин, ресторан и любой другой бизнес Цветов, подарков и посылок Вашим родным и близким
                        Деловой корреспонденции, важных документов, срочных пакетов из рук в руки и многого другого,
                        доставку которого Вам необходимо осуществить.
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