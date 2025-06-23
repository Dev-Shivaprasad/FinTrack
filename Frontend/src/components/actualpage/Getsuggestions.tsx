import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./github-markdown.css";
import axios from "axios";
import {
  // AIURL,
  AuthHeaders,
  BaseURL,
  getpromptdata,
  // PyAiprompt,
} from "../utils/DBLinks";
import { GetUserDetails } from "../utils/DbSchema";
import {
  Aiinfer,
  GetCurrentDateTimeWithSecondsInString,
} from "../utils/Helperfunction";
import Button from "../Button";
import { TextLoop } from "../utils/textanim";

interface aiResponse {
  Suggestion: string | undefined;
  timegenerated: string | undefined;
}

export default function Getsuggestions() {
  const [_, setPromptData] = useState("");
  const [aiResponse, setAiResponse] = useState<aiResponse>({
    Suggestion: "",
    timegenerated: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getCachedResult = () => {
    const json = localStorage.getItem("Airesult");
    return json ? JSON.parse(json) : null;
  };

  const fetchPrompt = () =>
    axios
      .get(
        `${BaseURL}${getpromptdata.Get}${GetUserDetails().user_id}`,
        AuthHeaders
      )
      .then((res) => {
        setPromptData(res.data.promptData);
        return res.data.promptData;
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Failed to fetch AI prompt data. \n\n Due to high AI deployment costs, we're using Zrok for hosting our AI service. As a result, AI inferencing may not be available 24/7. Thank you for your understanding!"
        );
        return null;
      });

  // const fetchAIResponse = (prompt: string) =>
  //   axios
  //     .post(`${AIURL}${PyAiprompt.Post}`, { Prompt: prompt })
  //     .then((res) => {
  //       const result = res.data.message;
  //       const responseData = {
  //         Suggestion: result,
  //         timegenerated: GetCurrentDateTimeWithSecondsInString(),
  //       };
  //       localStorage.setItem("Airesult", JSON.stringify(responseData));
  //       setAiResponse(responseData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError(
  //         "Failed to fetch AI prompt data. Due to high AI deployment costs, we're using Zrok for hosting our AI service. As a result, AI inferencing may not be available 24/7. Thank you for your understanding!"
  //       );
  //     });

  const fetchAIResponsefromgoogle = (prompt: string) =>
    Aiinfer(prompt)
      .then((res) => {
        const result = res;
        const responseData: aiResponse = {
          Suggestion: result,
          timegenerated: GetCurrentDateTimeWithSecondsInString(),
        };
        localStorage.setItem("Airesult", JSON.stringify(responseData));
        setAiResponse(responseData);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Failed to fetch AI prompt data. Due to high AI deployment costs, we're using Zrok for hosting our AI service. As a result, AI inferencing may not be available 24/7. Thank you for your understanding!"
        );
      });
  const handleSuggestionFetch = (force: boolean = false) => {
    setLoading(true);
    const cached = getCachedResult();

    const load = async () => {
      if (cached && !force) {
        setAiResponse(cached);
      } else {
        localStorage.removeItem("Airesult");
        const prompt = await fetchPrompt();
        if (prompt) await fetchAIResponsefromgoogle(prompt);
      }
      setLoading(false);
    };

    load();
  };

  useEffect(() => {
    handleSuggestionFetch();
  }, []);

  if (loading) {
    return (
      <TextLoop className="w-full h-full flex flex-col items-center mt-32">
        <span>Analysing Portfolio Data...</span>
        <span>Loading suggestions...</span>
        <span>Taking time...</span>
        <span>Good things take time... 😉</span>
        <span>Making sure suggestion is valid...</span>
        <span>Simplifying and beautifying...</span>
      </TextLoop>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-2xl h-[50vh] italic flex text-center items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col items-center justify-center">
      <div className="m-2 p-2 text-xl text-yellow-200">
        <span className="text-yellow-500">Suggestion Generated on: </span>
        {aiResponse.timegenerated}
      </div>
      <Button
        title="Re-analyse Data"
        className="bg-text text-background"
        action={() => handleSuggestionFetch(true)}
      />
      <span className="gp text-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {aiResponse.Suggestion || "*No suggestions available.*"}
        </ReactMarkdown>
      </span>
    </div>
  );
}
