import { createContext, FC, useReducer, useState } from 'react';

import { IClient, ITable } from '../../../../models';

import { ICreateOrderDetail, TypeOrder } from '../../../../models/orders.model';
import { CreateOrderDto, CreateOrderDetailDto } from '../dto/create-order.dto';

export enum OrderActionType {
  SET_CLIENT = 'set_client',
  SET_TABLE = 'set_table',
  SET_PEOPLE = 'set_people',
  SET_TYPE_ORDER = 'set_type_order',
  ADD_DETAIL = 'add_detail',
  UPDATE_DETAIL = 'update_detail',
  DELETE_DETAIL = 'delete_detail',
  RESET = 'reset',
  SET_NOTES = 'set_notes',
  SET_DELIVERY_TIME = 'set_delivery_time'
}

interface IOrderState {
  amount: number;
  client: IClient | null;
  details: ICreateOrderDetail[];
  table: ITable | undefined;
  people: number;
  typeOrder: TypeOrder;
  totalProducts: number;
  notes: string;
  deliveryTime: Date | null;
}

const initialState: IOrderState = {
  details: [],
  amount: 0,
  client: null,
  table: undefined,
  people: 0,
  typeOrder: TypeOrder.IN_PLACE,
  totalProducts: 0,
  notes: '',
  deliveryTime: new Date()
};

type ActionType =
  | { type: 'set_client'; payload: IClient | null }
  | { type: 'set_table'; payload: ITable | undefined }
  | { type: 'set_people'; payload: number }
  | { type: 'set_type_order'; payload: TypeOrder }
  | { type: 'add_detail'; payload: ICreateOrderDetail }
  | { type: 'update_detail'; payload: ICreateOrderDetail }
  | { type: 'delete_detail'; payload: ICreateOrderDetail }
  | { type: 'reset' }
  | { type: OrderActionType.SET_NOTES; payload: string }
  | { type: OrderActionType.SET_DELIVERY_TIME; payload: Date | null };

const orderReducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case OrderActionType.SET_CLIENT:
      return {
        ...state,
        client: action.payload
      };

    case OrderActionType.SET_NOTES:
      return {
        ...state,
        notes: action.payload
      };

    case OrderActionType.SET_DELIVERY_TIME:
      return {
        ...state,
        deliveryTime: action.payload
      };

    case OrderActionType.SET_TABLE:
      return {
        ...state,
        table: action.payload
      };

    case OrderActionType.SET_PEOPLE:
      return {
        ...state,
        people: action.payload
      };

    case OrderActionType.SET_TYPE_ORDER:
      return {
        ...state,
        typeOrder: action.payload
      };

    case OrderActionType.ADD_DETAIL:
      const isDetail = state.details.find(
        (det) => det.product.id === action.payload.product.id
      );

      if (!isDetail) {
        return {
          ...state,
          details: [action.payload, ...state.details],
          amount:
            state.amount +
            action.payload.product.price * action.payload.quantity,
          totalProducts: state.details.reduce(
            (acc, detail) =>
              acc +
              Math.floor(detail.quantity) +
              (Number.isInteger(detail.quantity) ? 0 : 1),
            0
          )
        };
      } else {
        return {
          ...state,
          details: state.details.map((detail) => {
            if (detail.product.name === action.payload.product.name) {
              return action.payload;
            }
            return detail;
          })
        };
      }

    case OrderActionType.UPDATE_DETAIL:
      return {
        ...state,
        details: state.details.map((detail) => {
          if (detail.product.name === action.payload.product.name) {
            return action.payload;
          }
          return detail;
        }),
        amount: state.details.reduce(
          (acc, detail) => acc + detail.product.price * detail.quantity,
          0
        ),
        totalProducts: state.details.reduce(
          (acc, detail) =>
            acc +
            Math.floor(detail.quantity) +
            (Number.isInteger(detail.quantity) ? 0 : 1),
          0
        )
      };

    case OrderActionType.DELETE_DETAIL:
      return {
        ...state,
        details: state.details.filter(
          (detail) => detail.product.name !== action.payload.product.name
        ),
        amount:
          state.amount - action.payload.product.price * action.payload.quantity,
        totalProducts: state.details.reduce(
          (acc, detail) =>
            acc +
            Math.floor(detail.quantity) +
            (Number.isInteger(detail.quantity) ? 0 : 1),
          0
        )
      };

    case OrderActionType.RESET:
      return initialState;

    default:
      return state;
  }
};

interface IOrderContext {
  dispatch: React.Dispatch<ActionType>;
  state: IOrderState;
  activeStep: number;
  changeStep: (step: number) => void;

  // amount: number;
  // client: IClient | null;
  // details: ICreateOrderDetail[];
  // table: ITable | undefined;

  // people: number | undefined;
  // typeOrder: TypeOrder;

  // addDetail: (detail: ICreateOrderDetail) => void;
  // deleteDetail: (nameProduct: string) => void;
  // reset: () => void;
  // setPeople: (people: number) => void;
  // setClient: (client: IClient | null) => void;
  // setTable: (table: ITable) => void;
  // updateDetail: (detail: ICreateOrderDetail) => void;
  // getOrder: () => CreateOrderDto;
  // setDetails: (details: ICreateOrderDetail[]) => void;
  // setTypeOrder: (typeOrder: TypeOrder) => void;
  // getTotalProducts: () => number;
}

interface Props {
  children: React.ReactNode;
}

export const OrderContext = createContext({} as IOrderContext);

export const OrderProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const [activeStep, setActiveStep] = useState<number>(0);

  const changeStep = (step: number) => {
    setActiveStep(step);
  };

  const [details, setDetails] = useState<ICreateOrderDetail[]>([]);
  const [table, setTable] = useState<ITable>();
  const [client, setClient] = useState<IClient | null>(null);
  const [people, setPeople] = useState<number>(1);
  const [typeOrder, setTypeOrder] = useState<TypeOrder>(TypeOrder.IN_PLACE);

  const addDetail = (detail: ICreateOrderDetail) => {
    const isDetail = details.find(
      (det) => det.product.id === detail.product.id
    );

    if (!isDetail) {
      setDetails((details) => [detail, ...details]);
    } else {
      updateDetail(detail);
    }
  };

  const deleteDetail = (nameProduct: string) => {
    setDetails((details) =>
      details.filter((det) => {
        const isSameProduct = det.product.name !== nameProduct;

        if (!isSameProduct) {
          const amountDiff = det.quantity * det.product.price;
        }

        return isSameProduct;
      })
    );
  };

  const updateDetail = (detail: ICreateOrderDetail) => {
    console.log('actualizando detalle', detail);

    setDetails((details) =>
      details.map((det) => {
        if (det.product.name === detail.product.name) {
          return detail;
        }
        return det;
      })
    );
  };

  const getOrder = () => {
    const order: CreateOrderDto = {
      clientId: client?.id || '',
      tableId: table?.id || '',
      details: details.map((detail) => {
        const orderDetail: CreateOrderDetailDto = {
          productId: detail.product.id,
          quantity: detail.quantity,
          description: detail.description,
          price: detail.product.price
        };
        return orderDetail;
      }),

      people,
      typeOrder
    };

    return order;
  };

  const getTotalProducts = (): number => {
    return details.reduce(
      (acc, detail) =>
        acc +
        Math.floor(detail.quantity) +
        (Number.isInteger(detail.quantity) ? 0 : 1),
      0
    );
  };

  const amount = details.reduce(
    (acc, detail) => acc + detail.product.price * detail.quantity,
    0
  );

  const reset = () => {
    setClient(null);
    setTable(undefined);
    setDetails([]);
    setPeople(1);
    setTypeOrder(TypeOrder.IN_PLACE);
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        activeStep,
        changeStep
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
