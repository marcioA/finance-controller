import Modal from 'react-modal';
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg'
import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from '../NewTransactionModal/styles'
import { FormEvent, useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { TextField } from '@mui/material';
import Image from 'next/image';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');
    const date = new Date();
    const today = `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;
    const [transactionDate, settransactionDate] = useState(today);

    async function handleCreateNewTransaction(e: FormEvent) {
        e.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
            transactionDate
        })


        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        settransactionDate('');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <Image src={closeImg} alt="Fechar" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <TextField
                    id="outlined-basic"
                    className='input'
                    label="Produto"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    variant="outlined"
                    required
                />

                <TextField
                    id="outlined-basic"
                    className='input'
                    type="number"
                    label="Valor"
                    value={amount}
                    onFocus={(event) => event.currentTarget.value = ''}
                    onChange={event => setAmount(Number(event.target.value))}
                    variant="outlined"
                    required
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <Image src={incomeImg} alt="Entradas" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <Image src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <TextField
                    id="outlined-basic"
                    className='input'
                    label="Artesão"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    variant="outlined"
                    required
                />

                <TextField
                    id="transactionDate"
                    className='input'
                    label="Data da transação"
                    type="date"
                    value={transactionDate}
                    onChange={event => settransactionDate(event.target.value)}
                    variant="outlined"
                    required
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>
    )
}