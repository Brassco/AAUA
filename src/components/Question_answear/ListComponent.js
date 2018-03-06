import React,{Component} from 'react';
import {View, Text} from 'react-native';
import Item from './Item';
import {
    MainCard,
    CardItem,
    Header
} from '../common';


class ListComponent extends Component {

    render() {
        return (
            <MainCard>
                <Header burger >
                    ВОПРОС/ОТВЕТ
                </Header>
                <Item
                    id={1}
                    style={{
                        marginTop: 25
                    }}
                    title='Что входит в услугу "Консьерж сервис" ?'
                >
                    Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
                    Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,
                    а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации
                    "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
                </Item>
                <Item
                    id={2}
                    title='Что входит в услугу "Консьерж сервис" ?'>
                    Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
                    Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,
                    а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации
                    "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
                </Item>
                <Item
                    id={3}
                    title='Что входит в услугу "Консьерж сервис" ?'>
                    Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
                    Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,
                    а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации
                    "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
                </Item>
                <Item
                    id={4}
                    title='Что входит в услугу "Консьерж сервис" ?'>
                    Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
                    Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,
                    а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации
                    "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
                </Item>
            </MainCard>
        )
    }
}

export default ListComponent;