import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, ButtonTransaction } from './styles';
import closeButton from '../../assets/close.svg';
import incomingImg from '../../assets/income.svg';
import outcomingImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionsModal({isOpen, onRequestClose}: NewTransactionsModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  
  async function handlerCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({ title, category, amount, type });
    setType('');
    setTitle('');
    setCategory('');
    setAmount(0);
    onRequestClose();
  }
  
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeButton} alt="Fechar modal" />
      </button>

      <Container onSubmit={handlerCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input 
          placeholder="Título" 
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input 
          type="number" 
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <ButtonTransaction 
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomingImg} alt="Entrada" />
            <span>Entrada</span>
          </ButtonTransaction>
          <ButtonTransaction 
            type="button" 
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomingImg} alt="Saída" />
            <span>Saída</span>
          </ButtonTransaction>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria" 
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}