import { Balance } from '@shared/models/balance/balance.model';
import { Group } from './group.model';
import { User } from '@shared/models/user/user.model';
import { Payment } from '@shared/models/payment/payment.model';
import { Expense } from '@shared/models/expense/expense.model';
import { ExpenseSplit } from '@shared/models/expense-split/expense-split.model';

export interface GroupDetails {
  group: Group;
  members: User[];
  balances: Balance[];
  payments: Payment[];
  expenses: (Expense & { splits: ExpenseSplit[] })[];
}
