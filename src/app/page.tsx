'use client'
import Image from 'next/image'
import { TransactionsProvider } from '@/hooks/useTransactions';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { NewTransactionModal } from '@/components/NewTransactionModal';
import { GlobalStyled } from '@/styles/globals';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/Loading/style';

// Modal.setAppElement('#root');



export default function Home() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TransactionsProvider>
          <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
          <Dashboard />


          <NewTransactionModal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseNewTransactionModal}
          />
          <GlobalStyled />
        </TransactionsProvider>

      )}
    </>
  )
}
