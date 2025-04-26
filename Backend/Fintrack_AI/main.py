
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from AI import AnalyzeFinancialData
from pydantic import BaseModel


class Promptschema(BaseModel):
    Prompt: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def DefaultRoute():
    return "Welcome to AI"


@app.post("/api/AnalyzeFinancialData/")
async def Analyse(data: Promptschema = Body(...)):
    # jsondata = json.loads(data.Prompt)
    prompt = f"""You are a smart and helpful financial advisor.
    Analyze the user's financial data below and suggest improvements to help them make better economic decisions
    Financial Data:
    {data.Prompt}

    Tips:"""

    RES = await AnalyzeFinancialData(prompt=prompt)
    print(f"Successful!!!")
    return RES


@app.post("/api/Chat/")
async def Chat(data: Promptschema = Body(...)):
    # jsondata = json.loads(data.Prompt)
    prompt = f"""
You are a financial advisor AI and are only allowed to discuss topics strictly related to finance — such as budgeting, saving, investing, personal finance, financial planning, or economic decisions.

❗ If the user's message is not related to finance, you must immediately respond with **only this exact line**, and do absolutely nothing else:

"I'm here to help only with financial topics. Please ask a question related to personal finance, investing, or economic planning."

Do not explain, continue, apologize, or add anything else.

Do not talk about or acknowledge the topic if it is not financial — no exceptions. If the message is off-topic, respond with the line above and end immediately.

Now here is the message from the user:
{data.Prompt}
"""

    RES = await AnalyzeFinancialData(prompt=prompt)
    print(f"Successful!!!")
    return RES
