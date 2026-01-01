import { useState, useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

//Material UI
import {
  Typography,
  Box,
  Grid,
  Popover,
  MenuItem,
  Button,
  Stack
} from '@mui/material/';

import { ISection } from '../../../../../../models';

import { Section } from './Section.component';
import { useDispatch, useSelector } from 'react-redux';
import NiceModal from '@ebay/nice-modal-react';

import {
  Close,
  DeleteOutlined,
  EditOutlined,
  Reply,
  ReplyOutlined,
  Save,
  Visibility,
  VisibilityOutlined
} from '@mui/icons-material';

import {
  loadSections,
  selectMenu,
  setActiveSection
} from '../../../../../../redux';

import {
  ModalDeleteSection,
  Props as PropsModalDelete
} from './ModalDeleteSection.component';
import {
  useUpdateManySections,
  useUpdateSection
} from '../../../hooks/useSections';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { LoadingButton } from '@mui/lab';

export const SectionsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeSection, sections } = useSelector(selectMenu);

  const getActiveSections = () => {
    return sections.filter((section) => section.isActive);
  };
  const activeSections = useMemo(getActiveSections, [sections]);

  const inactiveSections = useMemo(
    () => sections.filter((section) => !section.isActive),
    [sections]
  );

  const [orderedSections, setOrderedSections] =
    useState<ISection[]>(activeSections);

  const [reorder, setReorder] = useState(false);

  const updateSectionMutation = useUpdateSection();

  const [open, setOpen] = useState<HTMLButtonElement | null>();

  const updateManySectionsMutation = useUpdateManySections();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = orderedSections.findIndex(
        (section) => section.id === active.id
      );

      const newIndex = orderedSections.findIndex(
        (section) => section.id === over.id
      );

      const newSections = arrayMove(orderedSections, oldIndex, newIndex);

      const sectionsUpdated = newSections.map((section, index) => {
        return {
          ...section,
          order: index + 1
        };
      });

      setOrderedSections(sectionsUpdated);
    }
  };

  const saveOrderedSections = () => {
    updateManySectionsMutation.mutateAsync(orderedSections).then(() => {
      toggleReorder();
    });
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    section: ISection
  ) => {
    dispatch(setActiveSection(section));
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const toggleActiveSection = async (section: ISection) => {
    handleCloseMenu();
    if (section.isActive) {
      showModalDelete(section);
    } else {
      //TODO: Activar sección
      await updateSectionMutation.mutateAsync({
        id: section.id,
        isActive: true
      });
      // .then(() => {
      //   dispatch(loadSections(orderedSections));
      // });
    }
  };

  const showModalDelete = (section: ISection) => {
    NiceModal.show(ModalDeleteSection, { section } as PropsModalDelete);
  };

  const showCategories = (section: ISection) => {
    navigate(`/menu/categories`);
    handleCloseMenu();
    setActiveSection(section);
  };

  const toggleReorder = () => {
    setReorder(!reorder);
  };

  const handleReorder = () => {
    toggleReorder();
    setOrderedSections(activeSections);
  };

  useEffect(() => {
    const sections = getActiveSections();
    setOrderedSections(sections);
  }, [sections]);

  return (
    <>
      {/* <Typography variant='subtitle1'>Secciones: {sections.length}</Typography> */}
      <Box
        mb={2}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h6'>
          Secciones activas: {activeSections.length}
        </Typography>
        <Stack spacing={2} direction='row'>
          {reorder ? (
            <>
              <Button
                size='small'
                variant='outlined'
                startIcon={<Close />}
                onClick={toggleReorder}
              >
                Cancelar
              </Button>
              <LoadingButton
                size='small'
                variant='contained'
                startIcon={<Save />}
                onClick={saveOrderedSections}
                loading={updateManySectionsMutation.isPending}
              >
                Guardar
              </LoadingButton>
            </>
          ) : (
            <Button startIcon={<EditOutlined />} onClick={handleReorder}>
              Reordenar
            </Button>
          )}
        </Stack>
      </Box>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedSections}>
          <Grid container rowSpacing={1} spacing={1}>
            {orderedSections.map((seccion) => (
              <Grid key={seccion.id} item xs={12} sm={4} lg={3}>
                <Section
                  seccion={seccion}
                  handleOpenMenu={handleOpenMenu}
                  draggable={reorder}
                />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>

      <Box mt={6}>
        {inactiveSections.length > 0 && (
          <Typography variant='h6' my={2}>
            Secciones inactivas: {inactiveSections.length}
          </Typography>
        )}

        <Grid container rowSpacing={1} spacing={1}>
          {inactiveSections.map((seccion) => (
            <Grid key={seccion.id} item xs={12} sm={4} lg={3}>
              <Section seccion={seccion} handleOpenMenu={handleOpenMenu} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {activeSection && (
        <>
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75
                }
              }
            }}
          >
            <MenuItem onClick={() => showCategories(activeSection)}>
              <VisibilityOutlined />
              <Typography variant='subtitle2' ml={2}>
                Categorías
              </Typography>
            </MenuItem>

            <MenuItem
              sx={{
                color: activeSection.isActive ? 'error.main' : 'success.main'
              }}
              onClick={() => toggleActiveSection(activeSection)}
            >
              {!activeSection.isActive ? (
                <>
                  <ReplyOutlined />
                  <Typography variant='subtitle2' ml={2}>
                    Activar
                  </Typography>
                </>
              ) : (
                <>
                  <DeleteOutlined />
                  <Typography variant='subtitle2' ml={2}>
                    Eliminar
                  </Typography>
                </>
              )}
            </MenuItem>
          </Popover>
        </>
      )}
    </>
  );
};
