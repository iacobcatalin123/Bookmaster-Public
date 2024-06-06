import React from "react";

interface IPageTitleProps {
    title: string;
}


const PageTitle: React.FC<IPageTitleProps> = ( props: IPageTitleProps) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
};

export default PageTitle