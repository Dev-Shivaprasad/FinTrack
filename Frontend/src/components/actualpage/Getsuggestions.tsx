import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./github-markdown.css";
import axios from "axios";
import {
  AIURL,
  AuthHeaders,
  BaseURL,
  getpromptdata,
  PyAiprompt,
} from "../utils/DBLinks";
import { GetUserDetails } from "../utils/DbSchema";
import { GetCurrentDateTimeWithSecondsInString } from "../utils/Helperfunction";
import Button from "../Button";
import { TextLoop } from "../utils/textanim";

export default function Getsuggestions() {
  const [AiPromptData, setAiPromptData] = useState("");
  const [AIResponsedata, setAIResponsedata] = useState({
    Suggestion: "",
    timegenerated: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getlocalAiresult = () => {
    try {
      const data = localStorage.getItem("Airesult");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("Invalid JSON in localStorage");
      return null;
    }
  };

  const GetAiPrompt = () => {
    return axios
      .get(BaseURL + getpromptdata.Get + GetUserDetails().user_id, AuthHeaders)
      .then((res) => {
        setAiPromptData(res.data.promptData);
        return res.data;
      })
      .catch((err) => {
        setError("Failed to fetch AI prompt data.");
        console.error(err);
      });
  };

  const Airesult = () => {
    const data = { Prompt: AiPromptData };
    return axios
      .post(AIURL + PyAiprompt.Post, data)
      .then((res) => {
        const result = res.data.message;
        localStorage.setItem(
          "Airesult",
          JSON.stringify({
            Suggestion: result,
            timegenerated: GetCurrentDateTimeWithSecondsInString(),
          })
        );
        setAIResponsedata(getlocalAiresult());
      })
      .catch((err) => {
        setError("Failed to fetch AI response.");
        console.error(err);
      });
  };
  function FetchAndPlaceAiSuggestions(force: boolean = false) {
    setLoading(true);
    const cached = getlocalAiresult();

    if (cached && !force) {
      setAIResponsedata(cached);
      setLoading(false);
    } else {
      localStorage.removeItem("Airesult");
      GetAiPrompt()
        .then((prompt) => {
          if (prompt) return Airesult();
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    FetchAndPlaceAiSuggestions();
  }, []);

  if (loading)
    return (
      <TextLoop className="w-full h-full flex flex-col items-center mt-32">
        <span>Analysing trasaction Data...</span>
        <span>Loading suggestions...</span>
        <span>Making sure suggestion is valid...</span>
        <span>Taking time...</span>
        <span>Good things Take time... 😉</span>
      </TextLoop>
    );
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-2 flex flex-col items-center justify-center">
      <div className="m-2 p-2 text-xl text-yellow-200">
        <span className="text-yellow-500">Suggestion Generated on : </span>
        {AIResponsedata.timegenerated}
      </div>
      <Button
        title="Re-analyse Data"
        className="bg-text text-background"
        action={() => FetchAndPlaceAiSuggestions(true)}
      />

      <span className="gp text-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {AIResponsedata.Suggestion || "*No suggestions available.*"}
        </ReactMarkdown>
      </span>
    </div>
  );
}
