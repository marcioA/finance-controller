import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { Container } from './styles';

interface SumaryCardProps extends HTMLAttributes<HTMLDivElement> {
    moneyValue: Number,
    iconCard: string,
    titleCard: string,
};

export function SummaryCard({ titleCard, moneyValue, iconCard, className }: SumaryCardProps) {
    console.log(iconCard)
    return (
        <div className={className}>
            <header className='header'>
                <p>{titleCard}</p>
                <Image src={iconCard} alt="Entradas" />
            </header>
            <strong className='strong'>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(Number(moneyValue))}
            </strong>
        </div>
    );
}