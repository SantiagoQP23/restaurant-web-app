import { FC } from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Button,
  Card,
  useTheme,
  Box,
  TablePagination,
  Switch,
  IconButton
} from '@mui/material';
import { usePagination } from '../../../../../hooks/usePagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMenu,
  setActiveCategories,
  setActiveCategory,
  setActiveProducts,
  setActiveSection,
  updateSection
} from '../../../../../redux/slices/menu/menu.slice';
import Scrollbars from 'react-custom-scrollbars-2';
import { Scrollbar } from '../../../components';
import { LabelStatus } from '../../../components/LabelStatus.component';
import { ISection } from '../../../../../models';
import { updateSection as updateSectionS } from '../../services/menu.service';
import { useFetchAndLoad } from '../../../../../hooks';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, ShowerOutlined, Visibility } from '@mui/icons-material';

interface TableRowSectionProps {
  section: ISection;
}

const TableRowSection: FC<TableRowSectionProps> = ({ section }) => {
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const editarCategorias = () => {
    dispatch(setActiveSection(section));
    navigate(`${section.name.toLowerCase()}`);
  };

  const editarSeccion = () => {
    dispatch(setActiveSection(section));

    dispatch(setActiveCategories(section!.categories));

    if (section!.categories.length > 0) {
      dispatch(setActiveCategory(section!.categories[0]));

      dispatch(setActiveProducts(section!.categories[0].products));
    } else {
      dispatch(setActiveProducts([]));
    }

    navigate(`seccion`);
  };

  const changeStatusSection = async (seccion: ISection) => {
    // await callEndpoint(updateSectionS(seccion.id, { isActive: !seccion.isActive }))
    //   .then((resp) => {
    //     const { data } = resp;
    //     console.log(data.section)
    //     dispatch(updateSection({ ...seccion, isActive: !seccion.isActive }))
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar('Ya existe', { variant: 'error' })
    //   });
  };

  return (
    <TableRow key={section.id}>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>{section.name}</TableCell>
      <TableCell align='center'>
        {/* <LabelStatus status={section.isActive} /> */}
        <Switch
          checked={section.isActive}
          onClick={(e) => {
            e.stopPropagation();
            changeStatusSection(section);
          }}
          color='success'
        />
      </TableCell>
      <TableCell align='center'>
        {section.categories.length}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            editarCategorias();
          }}
          color='primary'
        >
          <Visibility />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <Button
          startIcon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            editarSeccion();
          }}
        >
          Editar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const SectionsTable = () => {
  const { sections } = useSelector(selectMenu);
  const {
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedList
  } = usePagination<ISection>(sections);

  const theme = useTheme();

  return (
    <>
      <Card>
        <TableContainer sx={{ minWidth: 800, height: 'auto' }}>
          <Table sx={{ height: 'auto' }} size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align='center'>Estado</TableCell>
                <TableCell align='center'>Categorías</TableCell>
                <TableCell align='center'>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedList.map((section) => (
                <TableRowSection section={section} key={section.id} />
              ))}

              {/* <TableRow */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={sections.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};
