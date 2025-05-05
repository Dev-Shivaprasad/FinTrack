import { GetUserDetails } from "./DbSchema"

// export const BaseURL = "https://localhost:7155/api/"
export const BaseURL = "http://localhost:5115/api/"
// export const BaseURL = "https://sbkei4n8j543.share.zrok.io/api/"
export const AIURL = "http://localhost:8000/api/"
// export const AIURL = "https://wia58rj0aot4.share.zrok.io/"


export const AuthHeaders = {
    headers: {
        Authorization: `bearer ${GetUserDetails().jwt_token}`,
        "Content-Type": "application/json",
    },
}

export enum Validate {
    Get = "Validate",
    Getpublic = "Validate/Apiworking"
}



export enum PyAiprompt {
    Post = "AnalyzeFinancialData/"
}

export enum getpromptdata {
    Get = "GenerateTransactionPrompt/"
}
export enum getreportdata {
    Get = "Report/byuser/"
}

export enum Budget {
    Get = "Budget",
    GetById = "Budget/",
    GetByUserId = "Budget/byuser/",
    Post = "Budget",
    Put = "Budget/",
    Delete = "Budget/",
}

export enum Debt {
    Get = "Debt",
    GetById = "Debt/",
    GetByUserId = "Debt/byuser/",
    Post = "Debt",
    Put = "Debt/",
    Delete = "Debt/",
}

export enum Expense {
    Get = "Expense",
    GetById = "Expense/",
    GetByUserId = "Expense/byuser/",
    Post = "Expense",
    Put = "Expense/",
    Delete = "Expense/",
}

export enum Income {
    Get = "Income",
    GetById = "Income/",
    GetByUserId = "Income/byuser/",
    Post = "Income",
    Put = "Income/",
    Delete = "Income/",
}
export enum Investment {
    Get = "Investment",
    GetById = "Investment/",
    GetByUserId = "Investment/byuser/",
    Post = "Investment",
    Put = "Investment/",
    Delete = "Investment/",
}
export enum Login {
    Post = "Login/",
}
export enum Savings {
    Get = "Savings",
    GetById = "Savings/",
    GetByUserId = "Savings/byuser/",
    Post = "Savings",
    Put = "Savings/",
    Delete = "Savings/",
}
export enum Users {
    Get = "User",
    GetById = "User/",
    Post = "User",
    Put = "User/",
    Delete = "User/",
}
export enum Transaction {
    Get = "Transaction",
    GetById = "Transaction/",
    GetByUserId = "Transaction/byuser/",
    Post = "Transaction",

}