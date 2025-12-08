import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
  Button,
  Grid,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CardContent,
  Card,
  Box,
  Typography,
  Chip
} from '@mui/material';

import { useContext, useEffect, useState } from 'react';
import {
  ArrowBackIos,
  DeliveryDining,
  LocalDining,
  ShoppingCart
} from '@mui/icons-material';
import { OrderActionType, OrderContext } from '../../context/Order.context';

import { TitlePage } from '../../../components/TitlePage.component';

import { OrderDetails, NewOrderSummary } from './components';
import {
  ICategory,
  IProduct,
  ISection,
  TypeOrder
} from '../../../../../models';
import { ModalAddDetail, TableOrder } from '../../components';
import { ModalOrderAdded } from './components/ModalOrderAdded.component';
import { useNewOrderStore } from '../../store/newOrderStore';
import { AddProductsMenu, AllMenu, ListProducts } from '../Menu/components';
import { ComboBoxProducts } from '@/pages/Private/EditMenu/components/products/ComboBoxProducts.component';
import NiceModal from '@ebay/nice-modal-react';
import { useSelector } from 'react-redux';
import { selectMenu } from '@/redux';

export const AddOrder = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<number>(0);
  const { sections, categories, products } = useSelector(selectMenu);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [activeCategories, setActiveCategories] = useState<ICategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [productsByCategory, setProductsByCategory] = useState<IProduct[]>([]);

  const { reset } = useNewOrderStore((state) => state);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setActiveCategories(categories.filter((c) => c.section.id === sectionId));
  };

  const handleChangeCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    if (categoryId) {
      setProductsByCategory(
        products.filter((p) => p.category.id === categoryId && p.isActive)
      );
    } else {
      setProductsByCategory([]);
    }
  };

  const {
    dispatch,
    state: { typeOrder }
  } = useContext(OrderContext);

  const addProductoToOrder = (product: IProduct) => {
    NiceModal.show(ModalAddDetail, { detail: { product, quantity: 1 } });
  };

  useEffect(() => {
    if (!activeSectionId && sections.length > 0) {
      handleChangeSection(sections[0].id);
    }
  }, [sections]);

  useEffect(() => {
    if (activeCategoryId && activeCategories.length === 0) {
      handleChangeCategory('');
    }
    if (!activeCategoryId && activeCategories.length > 0) {
      handleChangeCategory(activeCategories[0].id);
    }
  }, [activeCategories]);

  return (
    <>
      <Container maxWidth='xl' sx={{ pb: 5 }}>
        <TitlePage title='Nuevo pedido' />

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {/* <Card> */}
            <Box display='flex' flexDirection='row'>
              <Stack spacing={2} flex={1}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 1
                  }}
                >
                  <ComboBoxProducts selectProduct={addProductoToOrder} />
                </Box>
                <Typography variant='h6'>Secciones</Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap'>
                  {sections.map((section) => (
                    <SectionCard
                      section={section}
                      active={section.id === activeSectionId}
                      key={section.id}
                      onClick={() => {
                        handleChangeSection(section.id);
                      }}
                    />
                  ))}
                </Stack>
                <Typography variant='h6'>Categorías</Typography>
                <Box
                  sx={{
                    overflowX: 'auto',
                    flex: 1
                  }}
                >
                  <Stack direction='row' spacing={1} rowGap={1} flexWrap='wrap'>
                    {activeCategories.map((category) => (
                      <Chip
                        label={category.name}
                        key={category.id}
                        onClick={() => handleChangeCategory(category.id)}
                        variant={
                          category.id === activeCategoryId
                            ? 'filled'
                            : 'outlined'
                        }
                      />
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      {activeCategoryId && (
                        <ListProducts products={productsByCategory} />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Box>
            {/* </Card> */}
            {activeStep === 0 && (
              <>
                {/* <OrderDetails /> */}

                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='space-between'
                  my={2}
                >
                  {/* <Button */}
                  {/*   startIcon={<ShoppingCart />} */}
                  {/*   fullWidth={false} */}
                  {/*   onClick={() => { */}
                  {/*     navigate('/orders/add/menu'); */}
                  {/*   }} */}
                  {/*   color='primary' */}
                  {/* > */}
                  {/*   Añadir productos */}
                  {/* </Button> */}
                  <Button
                    color='error'
                    variant='outlined'
                    size='small'
                    onClick={reset}
                  >
                    Limpiar
                  </Button>
                </Stack>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Card>
                  <CardContent>
                    <Stack spacing={2} direction='column'>
                      <Stack direction='row' justifyContent='center'>
                        <ToggleButtonGroup
                          value={typeOrder}
                          onChange={(e, value) =>
                            dispatch({
                              type: OrderActionType.SET_TYPE_ORDER,
                              payload: value
                            })
                          }
                          exclusive
                        >
                          <ToggleButton value={TypeOrder.TAKE_AWAY}>
                            <DeliveryDining />
                            Para llevar
                          </ToggleButton>
                          <ToggleButton value={TypeOrder.IN_PLACE}>
                            <LocalDining />
                            Para servir
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Stack>

                      {typeOrder === TypeOrder.IN_PLACE && (
                        <>
                          <TableOrder />
                        </>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </>
            )}

            {/* <Button

                onClick={() => {
                  dispatch({ type: OrderActionType.RESET })
                  navigate('/orders')
                }}
                color='error'
              >
                Limpiar
              </Button> */}
          </Grid>

          <Grid item xs={12} md={4}>
            <NewOrderSummary step={activeStep} />
          </Grid>
        </Grid>
      </Container>

      <ModalOrderAdded />
    </>
  );
};

interface SectionCardProps {
  section: ISection;
  active: boolean;
  onClick?: () => void; // Add this line
}

function SectionCard({
  section,
  active,
  onClick
}: SectionCardProps): JSX.Element {
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 2,
        border: active ? `1px solid ${theme.palette.primary.main}` : 'none',
        cursor: 'pointer'
      }}
      key={section.id}
      onClick={onClick}
    >
      <Typography
        variant='body1'
        component='span'
        sx={{ wordWrap: 'break-word' }}
      >
        {section.name}
      </Typography>
    </Card>
  );
}
