import React, {useContext, useEffect} from "react";
import style from "./Page.module.css"
import {BookContext} from "../App";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import {fetchNui} from "../../utils/fetchNui";


const loadPage = (bookName: string, pageNumber: number) => {
    // return `../../../build/books/${bookName}/page${pageNumber}`
    const result = `./Books/${bookName}/page${pageNumber}.html`;
    // console.log(result);
    return result;
}


interface IProps {
    isLeftPage?: boolean
}

const Page: React.FC<IProps> = (props: IProps) => {
    const info = useContext(BookContext)
    const localPageNumber = props.isLeftPage ? info.pageNumber : info.pageNumber+1;

   useEffect(()=>{
    // console.log("rendering page", info.pageNumber, info.bookName, localPageNumber)
   }, [info])


    const renderPageArrow = () => {
        if (props.isLeftPage) {
            return (
            <div className={`${style.arrow}`} onClick={ () => {
                info.setPageNumber(info.pageNumber-1)
            }}>
                <FaArrowLeft/>
            </div>)
        }

        return (
            <div className={`${style.arrow}`} onClick={ () => {
                info.setPageNumber(info.pageNumber+1)
            }}>
                <FaArrowRight/>
        </div>)

    }

    return (
        <div className={style.page}>
            { info.isQuizTime ?
                <>
                    <iframe  src={`./Books/${info.bookName}/test.html`}>
                    </iframe>
                </>:
                <>
                    <iframe src={loadPage(info.bookName, localPageNumber)}>
                    </iframe>

                    <div className={style.pageIndicator}>
                        {props.isLeftPage ? renderPageArrow() : undefined}
                        <h3 style={{textAlign: "center"}}>{localPageNumber}</h3>
                        {props.isLeftPage ? undefined : renderPageArrow()}

                    </div>


                </>}



        </div>
    )
};

export default Page