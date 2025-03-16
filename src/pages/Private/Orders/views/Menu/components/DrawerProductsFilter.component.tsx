import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { CloseOutlined } from '@mui/icons-material';
import {
  Drawer,
  Box,
  useTheme,
  Stack,
  Typography,
  IconButton,
  Divider,
  FormControlLabel,
  Radio,
  FormGroup
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuth,
  selectMenu,
  setActiveCategory
} from '../../../../../../redux';
import { ICategory } from '../../../../../../models';
import { useMemo } from 'react';

export const DrawerProductsFilter = NiceModal.create(() => {
  const drawer = useModal();

  const theme = useTheme();

  const { sections, activeCategory, categories } = useSelector(selectMenu);

  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const closeDrawer = () => {
    drawer.hide();
  };

  const findPublicSections = () =>
    sections.filter((section) => section.isPublic);

  const availableSections = useMemo(() => {
    let filteredSections = sections;

    if (!user) {
      filteredSections = findPublicSections();
    }

    return filteredSections.filter((section) => section.categories.length > 0);
  }, [user, sections]);

  const getCategory = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId);
  };

  const changeCategory = (category: ICategory) => {
    const categorySelected = getCategory(category.id);

    if (!categorySelected) return;

    dispatch(setActiveCategory(categorySelected));
    closeDrawer();
  };

  return (
    <Drawer
      anchor='right'
      open={drawer.visible}
      onClose={closeDrawer}
      sx={{
        width: 'auto',
        zIndex: 10000
      }}
    >
      <Box
        sx={{
          display: 'flex',
          p: 1,
          [theme.breakpoints.down('sm')]: { width: '80vw' },
          [theme.breakpoints.up('sm')]: { width: 300, flexShrink: 0 }
        }}
      >
        <Stack direction='column' spacing={2} width='100%'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='h4'>Filtros</Typography>

            <IconButton onClick={closeDrawer}>
              <CloseOutlined />
            </IconButton>
          </Box>

          <Divider />

          <Stack direction='column' spacing={2} width='100%'>
            {availableSections.map((section) => (
              <Box key={section.id}>
                <Typography variant='h5'>{section.name}</Typography>
                <FormGroup>
                  {section.categories.map(
                    (category) =>
                      category.isPublic && (
                        <FormControlLabel
                          key={category.id}
                          control={<Radio />}
                          label={category.name}
                          checked={activeCategory?.id === category.id}
                          onChange={() => changeCategory(category)}
                        />
                      )
                  )}
                </FormGroup>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
});
