import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  reset,
  RootState,
  updateQuantity,
} from '../HomePage/slice';
import {
  IconButton,
  Stack,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { withdrawalTime } from './timePlanning';
import { handleResponse } from '../../../utils/handleResponse';
import { useNavigate } from 'react-router-dom';

export function OrderPage() {
  const order = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();
  const [time, setTime] = useState();
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const formatTime = hours + ':' + minutes;
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    // @ts-ignore
    setTime(event.target.value as string);
  };

  const filterWithdrawalTime = withdrawalTime.filter(time => {
    const itemTime = time.split(':');
    const currentTime = formatTime.split(':');
    return (
      (parseInt(itemTime[0]) >= parseInt(currentTime[0]) &&
        parseInt(itemTime[1]) > parseInt(currentTime[1])) ||
      parseInt(itemTime[0]) > parseInt(currentTime[0])
    );
  });

  const sendOrder = () => {
    const formatedData = order?.orderItems?.map(data => {
      return { itemId: data.id, quantity: data.quantity };
    });

    const finalOrder = {
      ...order,
      orderItems: formatedData,
      withdrawalHour: time,
      status: 'in progress',
      buy: false,
    };

    fetch('https://order-backend.herokuapp.com/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderItems: finalOrder.orderItems,
        buy: finalOrder.buy,
        email: finalOrder.email,
        homeNumber: finalOrder.homeNumber,
        withdrawalHour: finalOrder.withdrawalHour,
        phone: finalOrder.phone,
        name: finalOrder.name,
        status: finalOrder.status,
      }),
    })
      .then(handleResponse)
      .then(() => {
        navigate('/');
        dispatch(reset());
      });
  };

  const amount = () => {
    let result = 0;
    order.orderItems?.forEach(item => {
      if (item.price && item.quantity) result += item.price * item.quantity;
    });
    return result;
  };

  return (
    <Stack direction="column">
      <Typography textAlign="center" variant="h6">
        Récapitulatif de votre commande
      </Typography>
      {order &&
        order?.orderItems?.map(item => {
          return (
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                p: 1,
              }}
              spacing={2}
              xs={12}
            >
              <Grid item xs={5}>
                <Typography variant="body2">{item.title}</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  sx={{ maxWidth: 50 }}
                  id="standard-number"
                  label="Quantité"
                  type="number"
                  onChange={e => {
                    if (e.currentTarget.value)
                      dispatch(
                        updateQuantity({
                          quantity: parseInt(e.target.value),
                          id: item.id,
                        }),
                      );
                  }}
                  defaultValue={item.quantity}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">{item.price}€</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <FormControl sx={{ m: 4 }}>
        <InputLabel id="demo-simple-select-label">Heure de retrait</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Séléctionnez l'heure de retrait"
          onChange={handleChange}
        >
          {filterWithdrawalTime.map(value => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Typography textAlign="center" variant="h6">
        {`Montant total: ${amount()}€`}
      </Typography>
      <Button
        onClick={() => sendOrder()}
        variant="outlined"
        color="success"
        sx={{ m: 4 }}
      >
        Valider ma commande
      </Button>
    </Stack>
  );
}
