import React, {useContext} from "react";
import style from "./Book.module.css"
import Page from "../Page/Page";
import {BookContext} from "../App";


const Book: React.FC = () => {
    const info = useContext(BookContext);

    return (
        <div className={style.book}>
            { info.isQuizTime ?
            <>
                <Page />
            </> :

            <>
                <Page isLeftPage={true}/>
                <div className={style.middleFade}></div>
                <Page  />
            </> }

        </div>
    );
};

export default Book;
