import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
    transactionDate: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (Transaction: TransactionInput) => Promise<void>;
    deleteTransaction: (id : string) => Promise<void>;
    editTransaction: (Transaction: TransactionInput) => Promise<void>;
    buscaUmaTransaction: (id: string) => Promise<void>; 
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [ offset, setOffset ] = useState(0);

    useEffect(()=> {
        api.get('transactions', 
        // {
            // params: {
            //     limit: 30
            // }
        // }
        )
            .then((response) => setTransactions(response.data.transactions));
    }, []);

    async function  createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });

        const { transaction } = response.data;
        
        setTransactions([transaction, ...transactions]);
    }

    async function editTransaction(transactionInput: TransactionInput){
        const response = await api.put('/transactions', {
            ...transactionInput,
        });

        const { transaction } = response.data;
        
        setTransactions([transaction, ...transactions]);
    }

    async function buscaUmaTransaction(id: string) {
        const transaction = await api.get(`transactions/${id}`);
    }

    async function deleteTransaction(id: string) {
        
        api.delete(`transactions/${id}`);
        
        const filteredTransactions = transactions.filter((transaction)=> transaction.id !== id)
        setTransactions([...filteredTransactions]);

    }


    return (
        <TransactionsContext.Provider value={{transactions, createTransaction, deleteTransaction, editTransaction, buscaUmaTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}

