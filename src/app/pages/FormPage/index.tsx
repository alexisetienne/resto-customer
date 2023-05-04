import * as React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { isEmpty } from 'lodash';
export function FormPage() {
  const [errorMail, setErrorMail] = useState<string>('');
  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { register, control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <Stack
        mt={16}
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack justifyContent="center" spacing={2} direction="column">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Nom"
                  variant="outlined"
                  value={field.value}
                />
              )}
            />
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Numéro d'emplacement"
                  variant="outlined"
                  value={field.value}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Numéro de téléphone"
                  variant="outlined"
                  value={field.value}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  error={!isEmpty(errorMail) && !isEmpty(field.value)}
                  label="Email"
                  variant="outlined"
                  value={field.value}
                  onChange={event => {
                    field.onChange(event.target.value);
                    if (
                      !event.target.value.match(regexMail) &&
                      !isEmpty(event.target.value)
                    )
                      setErrorMail('email invalide');
                    else setErrorMail('');
                  }}
                  helperText={errorMail}
                />
              )}
            />
          </Stack>
        </form>
        <Button variant="contained" color="success">
          Suivant
        </Button>
      </Stack>
    </>
  );
}
