import { jwtDecode } from "jwt-decode"

export interface User {
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

export interface LoginDbSchema {
    email: string;
    password: string;
}

export interface DebtDbSchema {
    debtId: string;
    userId: string;
    lender: string;
    amountOwed: Number;
    interestRate: Number;
    dueDate: string; // ISO format (YYYY-MM-DD)
    createdAt: Date;
}

export interface InvestmentDbSchema {
    investmentId: string;
    userId: string;
    category: string,
    specficDetails: string,
    amount: number;
    dateInvested: string; // ISO format (YYYY-MM-DD)
    createdAt: Date;
}

export interface ReportDBSchema {
    amount: number,
    name: string
}

export interface SavingsDbSchema {
    savingId: string;
    userId: string;
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    createdAt: Date;
}


export interface BudgetDbSchema {
    budgetId: string;
    userId: string;
    monthYear: string;
    category: string;
    allocatedAmount: number;
    createdAt: Date;
}



export interface ExpenseDbSchema {
    expenseId: string;
    userId: string;
    category: string;
    amount: number;
    dateSpent: string; // ISO format (YYYY-MM-DD)
    isFixed: boolean;
    createdAt: Date;
}

export interface IncomeDbSchema {
    incomeId: string;
    userId: string;
    source: string;
    amount: number;
    createdAt: Date;
}

export interface TransactionDbSchema {
    transactionId: string
    userId: string;
    sourceCategory: string;
    amount: number;
    transactionType: string;
    financeType: string;
    createdAt: Date;
}

export type lspayload = {
    userid: string;
    username: string;
    jwttoken: string;
};

export type PyAiPromptSchema = {
    PromptData: string;
}

type JWTPAYLOAD = {
    username: string;
    id: string;
};

export function GetUserDetails() {
    const dataString = localStorage.getItem("JwtToken");


    // Check if data is available and parse it
    if (dataString) {
        try {
            return { jwt_token: dataString, user_id: jwtDecode<JWTPAYLOAD>(dataString).id, user_name: jwtDecode<JWTPAYLOAD>(dataString).username };
        } catch (e) {
            console.error("Failed to parse JWT token data", e);
            return { jwt_token: "", user_id: "", user_name: "" };
        }
    }

    return { jwt_token: "", user_id: "", user_name: "" };
}


export function CurrentSelectedTab(Tab?: string) {
    if (Tab) {

        localStorage.setItem("CurrentTab", Tab || "Home")
    }


    return localStorage.getItem("CurrentTab") || "Home"
}

