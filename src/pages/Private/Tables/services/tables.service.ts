import { restauranteApi } from '../../../../api';
import { loadAbort } from '../../../../helpers';
import { ICreateTable, ITable } from '../../../../models';
import { UpdateTableDto } from '../dto/table.dto';
import { SubjectDeleteTable } from '../helpers/subjects-tables.helper';

export const statusModalDeleteTable = new SubjectDeleteTable();

export const getTables = async (): Promise<ITable[]> => {
  const resp = await restauranteApi.get<ITable[]>('/tables');

  return resp.data;
};

export const createTable = (data: ICreateTable) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.post<ITable>('/tables', data, {
      signal: controller.signal
    }),
    controller
  };
};

export const updateTable = async (
  updateTableDto: UpdateTableDto
): Promise<ITable> => {
  const { id, ...data } = updateTableDto;

  const resp = await restauranteApi.patch<ITable>(`/tables/${id}`, data);

  return resp.data;
};

export const updateManyTables = async (
  tablesToUpdateDto: UpdateTableDto[]
): Promise<ITable[]> => {
  const resp = await restauranteApi.patch<ITable[]>(
    `/tables`,
    tablesToUpdateDto
  );

  return resp.data;
};

export const deleteTable = (id: string) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.delete(`/tables/${id}`, { signal: controller.signal }),
    controller
  };
};
