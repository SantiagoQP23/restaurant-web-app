import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';

import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import { Add, CloseOutlined, EditOutlined, Save } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';

import {
  selectTables,
  setActiveTable
} from '../../../../../redux/slices/tables';

import { TitlePage } from '../../../components/TitlePage.component';
import { DraggableTable } from '../../components/DraggableTable.component';
import { useUpdateManyTables } from '../../hooks/useTables';
import { ITable } from '../../../../../models';
import { LoadingButton } from '@mui/lab';

export const ListTables = () => {
  const { tables } = useSelector(selectTables);

  const [orderedTables, setOrderedTables] = useState<ITable[]>(tables);

  const [reorder, setReorder] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTable = () => {
    dispatch(setActiveTable(null));
    navigate('edit');
  };

  const updateManyTablesMutation = useUpdateManyTables();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = orderedTables.findIndex(
        (table) => table.id === active.id
      );

      const newIndex = orderedTables.findIndex((table) => table.id === over.id);

      const newTables = arrayMove(orderedTables, oldIndex, newIndex);

      const tablesUpdated = newTables.map((table, index) => {
        return {
          ...table,
          order: index + 1
        };
      });

      setOrderedTables(tablesUpdated);
    }
  };

  const saveOrderedTables = () => {
    updateManyTablesMutation.mutateAsync(orderedTables).then(() => {
      setReorder(false);
    });
  };

  const tablesListAreEqual =
    JSON.stringify(tables) === JSON.stringify(orderedTables);

  useEffect(() => {
    setOrderedTables(tables);
  }, [tables]);

  return (
    <>
      <TitlePage
        title='Mesas'
        action={
          <Stack direction='row' spacing={1}>
            {reorder ? (
              <>
                <Button
                  size='small'
                  onClick={() => {
                    setReorder(false);
                    setOrderedTables(tables);
                  }}
                  startIcon={<CloseOutlined />}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  size='small'
                  variant='contained'
                  startIcon={<Save />}
                  disabled={tablesListAreEqual}
                  onClick={saveOrderedTables}
                  loading={updateManyTablesMutation.isPending}
                >
                  Guardar
                </LoadingButton>
              </>
            ) : (
              <>
                <Button
                  size='small'
                  onClick={() => {
                    setReorder(true);
                  }}
                  startIcon={<EditOutlined />}
                >
                  Reordenar
                </Button>

                <Button
                  size='small'
                  variant='contained'
                  startIcon={<Add />}
                  onClick={createTable}
                >
                  Añadir mesa
                </Button>
              </>
            )}
          </Stack>
        }
      />

      <Grid
        container
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mt={1}
        mb={4}
      >
        <Grid item>
          <Typography variant='h6'>
            Mesas registradas: {tables.length}
          </Typography>
        </Grid>
      </Grid>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedTables}>
          <Grid container spacing={2}>
            {orderedTables.map((table) => (
              <Grid item xs={12} sm={3} key={table.id}>
                <DraggableTable
                  table={table}
                  key={table.id}
                  reorder={reorder}
                />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  );
};
