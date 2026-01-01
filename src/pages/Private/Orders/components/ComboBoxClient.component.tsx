import { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useClients } from '../../Clients/hooks/useClients';
import { IClient } from '../../../../models';

interface Props {
  client: IClient | null;
  handleChangeClient: (client: IClient | null) => void;
}

export const ComboBoxClient: FC<Props> = ({ client, handleChangeClient }) => {
  const { clientsQuery, search, handleChangeSearch } = useClients();

  return (
    <>
      <Autocomplete
        id='combo-box-client'
        filterOptions={(x) => x}
        options={clientsQuery.data?.clients || []}
        getOptionLabel={(option) =>
          option.person.lastName + ' ' + option.person.firstName
        }
        value={client}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Cliente (opcional)'
            variant='outlined'
          />
        )}
        onChange={(event, newValue: IClient | null) => {
          handleChangeClient(newValue);
          // setClients(newValue ? [newValue, ...clients] : clients)
        }}
        noOptionsText='Sin clientes'
        onInputChange={(e, newInputValue) => {
          const event = e as React.ChangeEvent<HTMLInputElement>;

          if (e) handleChangeSearch(event);
        }}
        fullWidth

        // loading={clientsQuery.isPending}
      />
    </>
  );
};
