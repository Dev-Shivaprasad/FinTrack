from gpt4all import GPT4All
import time

MODEL_PATH = r"M:\0~CODEBASE\All_AI_Models\phi-2-orange-v2.Q8_0.gguf"

try:
    model = GPT4All(model_name=MODEL_PATH, device="cuda",
                    allow_download=False, verbose=True)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Failed to load model: {e}")
    model = None


async def AnalyzeFinancialData(prompt):

    if model is None:
        return {"message": "Model not loaded. Please check server logs."}

    try:
        print(prompt)
        with model.chat_session():
            response = model.generate(
                prompt=prompt,
                temp=0.4,
                top_k=50,
                top_p=0.95,
                repeat_penalty=1.1,
                n_predict=512,

            )

        # clean_response = response.strip().replace("\\n", "\n")
        return {"message": response}

    except Exception as e:
        print(f"Error during generation: {e}")
        return {"message": f"Error: {e}"}


if __name__ == "__main__":
    financial_data = "Hi, who are you and what are your capabilities?"
    start = time.perf_counter()
    analysis_result = AnalyzeFinancialData(financial_data)
    end = time.perf_counter()
    execution_time = end - start
    print(analysis_result["message"])
    print(f"Suggestion generated in : {execution_time:.4f} seconds")
