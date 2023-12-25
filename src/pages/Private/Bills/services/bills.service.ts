import { restauranteApi } from "../../../../api";
import { Bill } from "../../../../models/bill.model";

export const getBill = async (id: number) => {
  const resp = await restauranteApi.get<Bill>(`/bills/${id}`);
  return resp.data;
}