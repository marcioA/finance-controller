import Modal from 'react-modal';
import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg'
import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from '../NewTransactionModal/styles'
import { FormEvent, useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Image from 'next/image';

interface EditTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function EditTransactionModal({ isOpen, onRequestClose }: EditTransactionModalProps) {
    const { editTransaction, buscaUmaTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');
    const [transactionDate, settransactionDate] = useState('');

    useEffect(() => {
        // buscaUmaTransaction(id)
    }, []);


    async function handleEditTransaction(e: FormEvent) {
        e.preventDefault();


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
            <Container onSubmit={handleEditTransaction}>
                <h2>Editar transação</h2>

                <input
                    placeholder="Produto"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onFocus={(event) => event.currentTarget.value = ''}
                    onChange={event => setAmount(Number(event.target.value))}
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

                <input
                    placeholder="Artesão"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    required
                />

                <input
                    placeholder="Data da transação"
                    type="date"
                    value={transactionDate}
                    onChange={event => settransactionDate(event.target.value)}
                    required
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>
    )
}