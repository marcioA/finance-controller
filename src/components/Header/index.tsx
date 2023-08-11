import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import logoImg from '../../assets/Logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    return (
        <Container>
            <Content>
                <UserButton afterSignOutUrl="/" />
                <Image src={logoImg} alt="Oliveira Jardins" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}