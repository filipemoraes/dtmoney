import { GlobalStyle } from './styles/global';
import { Header } from './components/Header/index';
import { Dashboard } from "./components/Dashboard";
import Modal from 'react-modal';
import { useState } from 'react';
import { NewTransactionsModal } from './components/NewTransactionsModal/index';
import { TransactionProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  } 

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} /> 
      <Dashboard />
      <GlobalStyle />
      <NewTransactionsModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}
