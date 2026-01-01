import { useEffect, FC } from 'react';
import { useUsers } from '../../Users/hooks/useUsers';
import { IUser } from '../../../../models';
import { Autocomplete, TextField } from '@mui/material';

interface Props {
  user: IUser | null;
  handleChangeUser: (user: IUser | null) => void;
}

export const ComboBoxUser: FC<Props> = ({ user, handleChangeUser }) => {
  const { usersQuery, search, handleChangeSearch } = useUsers();

  useEffect(() => {
    usersQuery.refetch();
  }, [search]);

  return (
    <>
      <Autocomplete
        id='combo-box-user'
        filterOptions={(x) => x}
        options={usersQuery.data?.users || []}
        getOptionLabel={(option) =>
          option.person.firstName + ' ' + option.person.lastName
        }
        value={user}
        renderInput={(params) => (
          <TextField {...params} label='Usuario' variant='outlined' />
        )}
        onChange={(event, newValue: IUser | null) => {
          handleChangeUser(newValue);
        }}
        noOptionsText='Sin usuarios'
        onInputChange={(event, newInputValue) => {
          handleChangeSearch(event as any);
        }}
        fullWidth

        // loading={clientsQuery.isPending}
      />
    </>
  );
};
