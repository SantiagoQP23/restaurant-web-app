import {
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  lighten,
  styled
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { EditOutlined } from '@mui/icons-material';
import { ITable } from '../../../../models';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTable } from '../../../../redux/slices/tables';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Box } from '@mui/system';
import { statusModalDeleteTable } from '../services/tables.service';
import { useUpdateTable } from '../hooks/useTables';
import { UpdateTableDto } from '../dto/table.dto';

import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import Draggable from 'react-draggable';

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

interface Props {
  table: ITable;
}

export const CardTable: FC<Props> = ({ table }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const updateTableMutation = useUpdateTable();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: table.order });

  const editTable = () => {
    dispatch(setActiveTable(table));
    navigate('edit');
  };

  const deleteTable = () => {
    statusModalDeleteTable.setSubject(true, table);
    console.log('deleteTable');
  };

  const enableTable = () => {
    const data: UpdateTableDto = {
      isActive: true,
      id: table.id
    };

    updateTableMutation.mutate(data);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <>
      <Grid item xs={12} sm={3} key={table.id}>
        <div>
          <Card>
            <CardHeader
              title={`Mesa ${table.name}`}
              avatar={<TableRestaurantIcon />}
              subheader={`Asientos: ${table.chairs}`}
              titleTypographyProps={{
                variant: 'h5'
              }}
              action={
                <Box display='flex' alignItems='center'>
                  {table.isActive ? (
                    <>
                      <IconButton onClick={editTable} color='primary'>
                        <EditOutlined fontSize='medium' />
                      </IconButton>

                      <IconButtonError onClick={deleteTable}>
                        <DeleteTwoToneIcon fontSize='medium' />
                      </IconButtonError>
                    </>
                  ) : (
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={enableTable}
                    >
                      Habilitar
                    </Button>
                  )}
                </Box>
              }
            />
          </Card>
        </div>
      </Grid>
    </>
  );
};
