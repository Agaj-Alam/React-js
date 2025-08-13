import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{

  const[input,setInput]=useState("");
  const[recentPrompt,setRecentPrompt]=useState("");
  const[prevPrompt,setPrevPrompt]=useState([]);
  const[showResult,setShowResult]=useState(false);
  const[loading,setLoading]=useState(false);
  const[resultData,setResultData]=useState("");


  const delayPara = (index, nextWord) => {
  setTimeout(() => {
    setResultData(prev => prev + nextWord);
  }, 75 * index);
};

  const newChat=()=>{
    setLoading(false)
    setShowResult(false)
  }


const formatChatbotText = (text) => {
  let formatted = text;

  // Headings
  formatted = formatted.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  formatted = formatted.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');

  // New lines to <br/>
  formatted = formatted.replace(/\n/g, '<br/>');

  return formatted.trim();
};

const onSent = async (prompt) => {
  setResultData("");
  setLoading(true);
  setShowResult(true);

  let response;
  if (prompt !== undefined) {
    response = await runChat(prompt);
    setRecentPrompt(prompt);
  } else {
    setPrevPrompt(prev => [...prev, input]);
    setRecentPrompt(input);
    response = await runChat(input);
  }

  // Format the response
  let formattedResponse = formatChatbotText(response);

  // Typing animation with HTML tag safety
  const wordsArray = formattedResponse.match(/(<[^>]+>|[^<>\s]+|\s+)/g);
  wordsArray.forEach((word, i) => {
    delayPara(i, word);
  });

  setLoading(false);
  setInput("");
};


  const contextValue={
    prevPrompt,
    setPrevPrompt,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }

  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;