import { FC, useEffect, useState } from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";

import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { ICreateOrderDetail } from "../../../../../../models";

import { sharingInformationService } from "../../../services/sharing-information.service";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";
import { useNewOrderStore } from "../../../store/newOrderStore";
import { CounterInput } from "../../../components";

interface Props {
  detalle: ICreateOrderDetail;
}

export const NewOrderDetail: FC<Props> = ({ detalle }) => {
  const [quantity, setQuantity] = useState<number>(detalle.quantity);

  const { removeDetail, updateDetail } = useNewOrderStore((state) => state);

  const deleteDetail = () => {
    // dispatch({ type: OrderActionType.DELETE_DETAIL, payload: detalle });
    removeDetail(detalle);
  };

  const handleUpdateQuantity = (value: number) => {
    setQuantity(value);
    updateDetail({ ...detalle, quantity: value });
  }


  const editDescription = () => {
    console.log(detalle);

    sharingInformationService.setSubject(true, detalle);
  };

  useEffect(() => {
    setQuantity(detalle.quantity);
  }, [detalle]);


  return (
    <>
      <Box
        sx={{
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "column",
          p: 1,
          px: 2,
          gap: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack>
            <Typography variant="h4" whiteSpace={"normal"}>
              {detalle.quantity} - {detalle.product.name}
            </Typography>

            <Typography variant="subtitle1" whiteSpace="pre-wrap">
              {detalle.description && detalle.description}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton onClick={editDescription} color="primary" size="small">
              <EditOutlined />
            </IconButton>
            <IconButton
              aria-label="Eliminar detalle"
              onClick={deleteDetail}
              disabled={false}
              color="error"
              size="small"
            >
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="right"
          alignItems="center"
        >
          <CounterInput 
            value={quantity}
            onChange={(value: number) => {
              handleUpdateQuantity(value);
            }}
            min={1}
          />

          <Typography variant="body1">
            {formatMoney(detalle.product.price)}
          </Typography>
        </Stack>

        <Typography variant="h5" textAlign="right">
          {formatMoney(detalle.product.price * quantity)}
        </Typography>
      </Box>
    </>
  );
};
