import * as React from 'react';
import {
  Button,
  MobileStepper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { isEmpty } from 'lodash';

import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { handleResponse } from '../../../utils/handleResponse';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateInfos } from './slice';
import { Accordion } from './caddy/accordion';
import { OrderPage } from '../OrderPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function HomePage() {
  const theme = useTheme();
  const [items, setItems] = useState();
  const order = useSelector((state: RootState) => state.order);
  const [activeStep, setActiveStep] = React.useState(0);
  const [errorMail, setErrorMail] = useState<string>('');
  const isNextButton = activeStep > 0 && activeStep < 3;
  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const dispatch = useDispatch();
  const category = [
    'Entrées',
    'Plats',
    'Desserts',
    'Pizza',
    'Vin',
    'Bieres',
    'Boissons',
  ];

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch('https://order-backend.herokuapp.com/api/items/all', {
      method: 'GET',
    })
      .then(handleResponse)
      .then(value => {
        setItems(value);
      });
  }, []);

  const nextButtonDisabled = () => {
    const isEmptyItems = activeStep == 2;
    const orderItemsIsEmpty = !order.orderItems || isEmpty(order.orderItems);
    return isEmptyItems && orderItemsIsEmpty;
  };

  const onSubmit = data => {
    dispatch(updateInfos(data));
    setActiveStep(activeStep + 1);
  };
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
        steps={4}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Typography
            variant="body1"
            color="primary"
          >{`${activeStep}/3`}</Typography>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <ArrowBackIcon /> : <ArrowBackIcon />}
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
      <Stack
        mt={16}
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Stack justifyContent="center" spacing={2} m={3} direction="column">
            {activeStep == 1 && (
              <>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      required
                      id="outlined-basic"
                      label="Nom"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="homeNumber"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      id="outlined-basic"
                      label="Numéro d'emplacement"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      id="outlined-basic"
                      label="Numéro de téléphone"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  rules={{ required: true }}
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
              </>
            )}
            {activeStep == 2 && <Accordion items={items} category={category} />}
            {activeStep == 3 && <OrderPage />}
            {isNextButton && (
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="success"
                disabled={nextButtonDisabled()}
              >
                Suivant
              </Button>
            )}
            {nextButtonDisabled() && (
              <Typography color="error" variant="caption">
                vous devez séléctionner au moins un article
              </Typography>
            )}
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
