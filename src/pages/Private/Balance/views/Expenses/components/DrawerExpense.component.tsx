import { Expense } from '../../../models/expense.model';
import { FC } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  expense: Expense;
}

export const DrawerExpense: FC<Props> = ({ open, onClose, expense }) => {
  // const [supplier, setSupplier] = useState<Supplier | null>(expense.supplier || null);

  // const { handleClose, isOpen, handleOpen } = useModal();

  // const modalDelete = useModal();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   control,
  //   setValue,
  // } = useForm<UpdateExpenseDto>({});

  // const [responsibleUser, setResponsibleUser] = useState<IUser | null>(
  //   expense.transaction.responsible || null
  // );

  // const { mutateAsync, isPending } = useUpdateExpense();

  // const deleteMutation = useDeleteExpense(expense.id);

  // const handleChangeResponsible = (user: IUser | null) => {
  //   setResponsibleUser(user);
  // };

  // const onSubmit = (form: UpdateExpenseDto) => {
  //   if (responsibleUser) {
  //     form.responsibleId = responsibleUser.id;
  //   }

  //   mutateAsync({ ...form, id: expense.id });
  // };

  // const handleDelete = () => {
  //   deleteMutation.mutateAsync().then(() => {
  //     onClose();
  //   });
  // };

  // useEffect(() => {
  //   console.log("expense change");
  //   // setSupplier(expense.supplier || null);

  //   setValue("description", expense.transaction.description);
  //   setValue("amount", expense.transaction.amount);
  //   setValue("paymentMethod", expense.transaction.paymentMethod);
  //   setResponsibleUser(expense.transaction.responsible || null);
  // }, [expense]);

  // const theme = useTheme();

  return (
    <>
      {/* <ModalSelectSupplier open={isOpen} onClose={handleClose} onChange={handleChangeSupplier} /> */}

      {/* <ModalSelectUser
        open={isOpen}
        onClose={handleClose}
        onChange={handleChangeResponsible}
      />

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          width: "auto",
          zIndex: 1550,
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            [theme.breakpoints.down("sm")]: { width: "100vw" },
            [theme.breakpoints.up("sm")]: { width: 500, flexShrink: 0 },

            // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
          }}
        >
          <Stack direction="column" spacing={2} width="100%">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={modalDelete.handleOpen}
                >
                  Eliminar
                </Button>
              </Stack>
            </Stack>
            <Divider />

            {!modalDelete.isOpen ? (
              <>
                <Box px={2}>
                  <Typography variant="h4">Editar Gasto</Typography>
                </Box>

                <FormControl
                  fullWidth
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12}>
                    
                      <TextField
                        label="Nombre"
                        type="text"
                        // placeholder="Nombre del gasto"
                        fullWidth
                        {...register("description", {
                          required: "Este campo es requerido",
                          minLength: {
                            value: 2,
                            message: "Minimo 2 caracteres",
                          },
                        })}
                        rows={2}
                        helperText={
                          <Typography color="red">
                            {errors.description?.message}{" "}
                          </Typography>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Monto"
                        type="number"
                        fullWidth
                        inputProps={{ step: 0.05, min: 0.05 }}
                        {...register("amount", {
                          required: "Este campo es requerido",
                          min: {
                            value: 0.05,
                            message: "Debe ser mayor a 5 centavos",
                          },
                          valueAsNumber: true,
                        })}
                        helperText={
                          <Typography color="red">
                            {errors.amount?.message}{" "}
                          </Typography>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="subtitle2">Responsable</Typography>
                        <Box>
                          <Button onClick={handleOpen}>
                            {responsibleUser ? "Cambiar" : "Seleccionar"}
                          </Button>
                          {responsibleUser && (
                            <IconButton
                              color="error"
                              onClick={() => handleChangeResponsible(null)}
                            >
                              <Close />
                            </IconButton>
                          )}
                        </Box>
                      </Stack>
                      <Typography variant="h6">
                        {responsibleUser
                          ? `${responsibleUser.person.firstName} ${responsibleUser.person.lastName} `
                          : "No seleccionado"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <FormControl fullWidth>
                            <RadioGroup
                              name="use-radio-group"
                              value={value}
                              onChange={onChange}
                            >
                              <Typography variant="subtitle2">
                                Metodo de pago
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                <FormControlLabel
                                  value={PaymentMethod.CASH}
                                  label={"Efectivo"}
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  value={PaymentMethod.TRANSFER}
                                  label={"Transferencia"}
                                  control={<Radio />}
                                />
                              </Stack>
                            </RadioGroup>
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid item direction="row" xs={12}>
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        loading={isPending}
                      >
                        Guardar
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </FormControl>
              </>
            ) : (
              <>
                <Box px={2}>
                  <Typography variant="h4">Eliminar gasto</Typography>
                </Box>

                <Box p={2}>
                  <Typography variant="h6">
                    ¿Estas seguro de eliminar este gasto?
                  </Typography>
                </Box>

                <Divider />

                <Box p={2}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={modalDelete.handleClose}
                    >
                      Cancelar
                    </Button>

                    <LoadingButton
                      variant="contained"
                      color="error"
                      type="submit"
                      loading={deleteMutation.isPending}
                      onClick={handleDelete}
                    >
                      Eliminar
                    </LoadingButton>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Drawer> */}
    </>
  );
};
