import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";
import deleteImg from '../../assets/Delete.svg';
import editImg from '../../assets/Edit.svg';
import { ChangeEvent, ChangeEventHandler, FormEvent, HtmlHTMLAttributes, useEffect, useState } from "react";
import { EditTransactionModal } from "../EditTransactionModal";
import { Pagination } from '@mui/material';
// import { InputUnstyled } from '@mui/base';
import { Input } from '@mui/base';
import Image from "next/image";



type TransactionType = {
    amount: string;
    category: string;
    createdAt: string;
    title: string;
    transactionDate: string;
    type: string;
}

export function TransactionTable() {
    const { transactions, deleteTransaction } = useTransactions();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [showTransactions, setShowTransactions] = useState(transactions.slice(start, end));
    const [isLoading, setIsLoading] = useState(true);

    const ITEM_PER_PAGE = 10;
    const TOTAL_ITEMS = transactions.length;
    const PAGES = Math.ceil(TOTAL_ITEMS / ITEM_PER_PAGE);

    const FIELD_OF_TRANSACTION: TransactionType = {
        amount: 'amount',
        category: 'category',
        createdAt: 'createdAt',
        title: 'title',
        transactionDate: 'transactionDate',
        type: 'type'
    };

    useEffect(() => {
        setShowTransactions(transactions.slice(start, end));
    }, [start, end, transactions])

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }


    async function handleDeleteTransaction(e: FormEvent, id: string) {
        e.preventDefault();

        await deleteTransaction(id)
    }

    async function handleEditTransaction(e: FormEvent, id: string) {
        e.preventDefault();

        console.log(id);

        // await editTransaction(id)
    }

    async function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        const digitedValue = event.target.value;
        if (!digitedValue.length) return setShowTransactions(transactions.slice(0, 10));

        const keysOfTransaction = Object.keys(FIELD_OF_TRANSACTION);

        const filteredTransactions = transactions.filter((transaction) => {
            return transaction['title'].toLocaleLowerCase().includes(digitedValue.toLocaleLowerCase());
        });

        setShowTransactions(filteredTransactions);
    }

    async function handlePageChange(event: object, page: number) {
        setStart(ITEM_PER_PAGE * (page - 1));//0
        setEnd(ITEM_PER_PAGE * page);//10
    }

    return (
        <Container>
            {/* <EditTransactionModal 
                isOpen={False}
                onRequestClose={handleEditTransaction}
                /> */}

            <Input onChange={(event) => handleFilter(event)} />

            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Artesão</th>
                        <th>Data da transação</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {showTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}

                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Date(transaction.transactionDate) ? new Intl.DateTimeFormat('pt-BR', {
                                }).format(new Date(transaction.transactionDate)) : ''}
                            </td>
                            <td>
                                <button type="button" onClick={async (event) => {
                                    handleDeleteTransaction(event, transaction.id);
                                }}>
                                    <Image src={deleteImg} alt="excluir" />
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={async (event) => {
                                    handleEditTransaction(event, transaction.id);
                                }}>
                                    <Image src={editImg} alt="editar" />
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <Pagination count={PAGES}
                variant="outlined"
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={(event, page) => handlePageChange(event, page)}
            />

        </Container>
    )
}