export interface User {
    UserId: string;
    Name: string;
    Email: string;
    PasswordHash: string;
    CreatedAt: Date;
}

export interface Login {
    Email: string;
    Password: string;
}

export interface Investment {
    InvestmentId: string;
    UserId: string;
    Type: string;
    Amount: number;
    DateInvested: string; // ISO format (YYYY-MM-DD)
    CreatedAt: Date;
}

export interface Savings {
    SavingId: string;
    UserId: string;
    GoalName: string;
    TargetAmount: number;
    CurrentAmount: number;
    CreatedAt: Date;
}

export interface Transaction {
    TransactionId: string;
    UserId: string;
    Type: string;
    Amount: number;
    Date: string; // ISO format (YYYY-MM-DD)
    Category: string;
    CreatedAt: Date;
}

export interface Budget {
    BudgetId: string;
    UserId: string;
    MonthYear: string;
    Category: string;
    AllocatedAmount: number;
    CreatedAt: Date;
}

export interface Debt {
    DebtId: string;
    UserId: string;
    Lender: string;
    AmountOwed: number;
    InterestRate: number;
    DueDate: string; // ISO format (YYYY-MM-DD)
    CreatedAt: Date;
}

export interface Expense {
    ExpenseId: string;
    UserId: string;
    Category: string;
    Amount: number;
    DateSpent: string; // ISO format (YYYY-MM-DD)
    IsFixed: boolean;
    CreatedAt: Date;
}

export interface Income {
    IncomeId: string;
    UserId: string;
    Source: string;
    Amount: number;
    CreatedAt: Date;
}
