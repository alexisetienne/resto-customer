import * as React from 'react';
import {
  Button,
  MobileStepper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { isEmpty } from 'lodash';

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

export function HomePage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errorMail, setErrorMail] = useState<string>('');
  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Stack direction="column" spacing={3}>
      <MobileStepper
        variant="progress"
        steps={3}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 1 || activeStep === 2}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      {activeStep == 0 && (
        <Stack
          mt={12}
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <Typography variant="h6">Vous souhaitez passer commande ?</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveStep(1)}
          >
            Oui, je commande
          </Button>
        </Stack>
      )}
      {activeStep == 1 && (
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
                control={control}
                {...register('name', { required: true })}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Nom"
                    variant="outlined"
                    value={field.value}
                  />
                )}
              />
              <Controller
                {...register('id', { required: true })}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Numéro d'emplacement"
                    variant="outlined"
                    value={field.value}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                )}
              />
              <Controller
                {...register('phone', { required: true })}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Numéro de téléphone"
                    variant="outlined"
                    value={field.value}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                )}
              />
              <Controller
                {...register('email', { required: true })}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
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
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="success"
              >
                Suivant
              </Button>
            </Stack>
          </form>
        </Stack>
      )}
    </Stack>
  );
}
