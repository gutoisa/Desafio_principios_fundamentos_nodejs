import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    try {
      if (type === 'income' && total > value) {
        const transactions = this.transactionsRepository.create({
          title,
          value,
          type,
        });
        return transactions;
      }
    } catch (error) {
      throw new Error('Account balance unavailable');
    }
  }
}

export default CreateTransactionService;
