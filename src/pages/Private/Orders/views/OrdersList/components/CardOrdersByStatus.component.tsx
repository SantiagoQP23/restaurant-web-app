import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Order, OrderStatus } from '../../../../../../models';
import { FC } from 'react';
import { Label } from '../../../../../../components/ui';
import { useNavigate } from 'react-router-dom';

interface Props {
  orders: Order[];
  title: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
  status?: OrderStatus;
}

export const CardOrdersByStatus: FC<Props> = ({ orders, title, color }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '600px',
        overflowY: 'auto',
        width: '325px',
        mr: 1
      }}
    >
      <CardHeader
        title={
          <>
            <Label color={color}>{title}</Label>
            {orders.length}
          </>
        }
      />
      <Divider />

      {orders.length > 0 && (
        <List>
          {orders.map((order) => (
            <ListItemButton
              key={order.id}
              onClick={() => {
                navigate(`edit/${order.id}`);
              }}
              sx={{
                border: '1px solid #ccc',
                mb: 1
              }}
            >
              <ListItemText
                primary={
                  <>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Box>
                        <Typography variant='h5'>
                          Mesa {order.table?.name}
                        </Typography>
                      </Box>
                      <Typography variant='body1' fontWeight='bold'>
                        $ {order.total}
                      </Typography>
                    </Box>
                    {/* {
                        order.client &&
                        <Typography variant='body1' >Cliente: {`${order.client.person.firstName} ${order.client.person.lastName}`}</Typography>

                      } */}
                    <Typography variant='body1'>
                      Por:{' '}
                      {`${order.user.person.firstName} ${order.user.person.lastName}`}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography variant='body1'>
                      {format(new Date(order.createdAt), 'dd MMMM HH:mm:ss', {
                        locale: es
                      })}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Card>
  );
};
