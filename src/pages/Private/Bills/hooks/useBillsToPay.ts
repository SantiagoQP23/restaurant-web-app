import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../redux';
import { Bill } from '../../../../models/bill.model';
import { IUser } from '../../../../models';
import { useEffect, useState } from 'react';

export interface UserSummaryBills extends IUser {
  totalToPay: number;
  totalInBills: number;
}

export const useBillsToPay = (bills: Bill[]) => {
  const { orders } = useSelector(selectOrders);

  const [usersWithOrders, setUsersWithOrders] = useState<UserSummaryBills[]>(
    []
  );

  const getUsersWithOrders = () => {
    const usersWithOrders: IUser[] = [];

    orders.forEach((order) => {
      if (!usersWithOrders.some((user) => user.id === order.user.id)) {
        usersWithOrders.push(order.user);
      }
    });
    return usersWithOrders;
  };

  const getUserSummary = (user: IUser): UserSummaryBills => {
    const billsUsers = bills.filter((bill) => bill.createdBy.id === user.id);
    const totalInBills = billsUsers.reduce((acc, bill) => acc + bill.total, 0);
    const totalToPay = orders
      .filter((order) => order.user.id === user.id)
      .reduce((acc, order) => acc + order.total, 0);
    return { ...user, totalToPay, totalInBills };
  };

  const getSummary = () => {
    const usersWithOrders = getUsersWithOrders();
    const usersSummary = usersWithOrders.map((user) => getUserSummary(user));
    setUsersWithOrders(usersSummary);
  };

  useEffect(() => {
    getSummary();
  }, [bills, orders]);

  return { usersWithOrders, getSummary };
};
