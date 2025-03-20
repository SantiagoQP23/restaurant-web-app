import { FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import NiceModal from '@ebay/nice-modal-react';

import { ITable } from '../../../../models';
import { Box, Button, Card, CardHeader, IconButton } from '@mui/material';
import { Dehaze, DeleteTwoTone, EditOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTable } from '../../../../redux';
import { UpdateTableDto } from '../dto/table.dto';
import { useUpdateTable } from '../hooks/useTables';
import { RegisteredModals } from '../../modals';

import { ModalDeleteTableProps } from './ModalDeleteTable.component';

interface Props {
  table: ITable;
  reorder: boolean;
}

export const DraggableTable: FC<Props> = ({ table, reorder }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: table.id });

  const updateTableMutation = useUpdateTable();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const editTable = () => {
    dispatch(setActiveTable(table));
    navigate('edit');
  };

  const deleteTable = () => {
    const props: ModalDeleteTableProps = {
      table
    };

    NiceModal.show(RegisteredModals.ModalDeleteTable, props);
  };

  const enableTable = () => {
    const data: UpdateTableDto = {
      isActive: true,
      id: table.id
    };

    updateTableMutation.mutate(data);
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes}>
        <Card>
          <CardHeader
            title={`Mesa ${table.name}`}
            avatar={
              reorder && <Dehaze {...listeners} sx={{ cursor: 'pointer' }} />
            }
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

                    <IconButton onClick={deleteTable} color='error'>
                      <DeleteTwoTone fontSize='medium' />
                    </IconButton>
                  </>
                ) : (
                  <Button variant='outlined' size='small' onClick={enableTable}>
                    Habilitar
                  </Button>
                )}
              </Box>
            }
          />
        </Card>
      </div>
    </>
  );
};
