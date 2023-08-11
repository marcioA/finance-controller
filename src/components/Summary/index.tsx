import incomeImg from '../../assets/Entradas.svg';
import outcomeImg from '../../assets/Saídas.svg';
import totalImg from '../../assets/Total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";
import { SummaryCard } from '../SumaryCard';

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <Container>

            <SummaryCard
                key="Entradas"
                titleCard="Entradas"
                moneyValue={summary.deposits}
                iconCard={incomeImg}
            />

            <SummaryCard
                key="Saidas"
                titleCard="Saidas"
                moneyValue={summary.withdraws}
                iconCard={outcomeImg}
            />

            <SummaryCard
                key="Total"
                titleCard="Total"
                moneyValue={summary.total}
                iconCard={totalImg}
                className='highlight-background'
            />

        </Container>
    );
}