import { Balance } from '@shared/models/balance/balance.model';
import { Group } from './group.model';
import { User } from '@shared/models/user/user.model';
import { Payment } from '@shared/models/payment/payment.model';
import { ExpenseWithSplit } from '@shared/models/expense/expense.model';

export interface GroupDetails {
  group: Group;
  members: User[];
  balances: Balance[];
  payments: Payment[];
  expenses: ExpenseWithSplit[];
}
