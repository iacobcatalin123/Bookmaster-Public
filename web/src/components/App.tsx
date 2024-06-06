/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
// import { fetchNui } from "../utils/fetchNui";
import Book from "./Book/Book";
import React, { Context, createContext, useEffect, useState } from "react";
import bookData from "../../build/Books/BookData"
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: unknown;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({
  data,
}) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

interface ReturnData {
  x: number;
  y: number;
  z: number;
}
interface IBookContext {
  bookName: string,
  pageNumber: number,
  totalPages: number,
  setBookName: (bookName: string) => void,
  setPageNumber: (pageNumber: number) => void,
  isQuizTime: boolean,
  renderViaIframes: boolean, //unused
}

export const BookContext: React.Context<IBookContext> = createContext({} as IBookContext)

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null);

  const handleGetClientData = () => {
    fetchNui<ReturnData>("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  };




  const isRequestedPageValid = (pageNumber: number): boolean => {

    if (pageNumber < 1) return false
    if (pageNumber >= bookInformation.totalPages) {
      setBookInformation( (prev) => {
        return { ...prev, isQuizTime: true }
      })
      return false;
    }

    return true;
  }


  const setPageNumber = (pageNumber: number) => {
    if (!isRequestedPageValid(pageNumber)) return;

    setBookInformation((prev) => {
      return { ...prev, pageNumber: pageNumber }
    })
  };

  const setBookName = (bookName: string) => {
    setBookInformation( (prev) => {
      return { ...prev, bookName: bookName, pageNumber: 1, totalPages: bookData[bookName].pages.length, isQuizTime: false }
    })
  }


  const [bookInformation, setBookInformation] = useState<IBookContext>({
    bookName: "mining",
    pageNumber: 1,
    setBookName: setBookName,
    setPageNumber: setPageNumber,
    totalPages: bookData["mining"].pages.length,
    isQuizTime: false,
    renderViaIframes: false, //unused
  });

  useNuiEvent("setBookName", (data: string) => {
    setBookName(data);
  })

  useEffect(() => {
    // console.log("Book Information: ", JSON.stringify(bookInformation))
  }, [bookInformation])



  return (
    <div className="nui-wrapper">
      <BookContext.Provider value={bookInformation}>
        <Book />
      </BookContext.Provider>
    </div>
  );
  // <div className="nui-wrapper">
  //   <div className="popup-thing">
  //     <div>
  //       <h1>This is the NUI Popup!</h1>
  //       <p>Exit with the escape key</p>
  //       <button onClick={handleGetClientData}>Get Client Data</button>
  //       {clientData && <ReturnClientDataComp data={clientData} />}
  //     </div>
  //   </div>
  // </div>

};

export default App;
