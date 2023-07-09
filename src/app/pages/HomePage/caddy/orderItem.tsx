import {
  Stack,
  Typography,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrderInfos } from '../slice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export function OrderItem({ item }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function addItem(itemTarget) {
    dispatch(addOrderInfos(itemTarget));
    handleClick();
  }
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column">
          <Typography color="#ff5a5f" variant="body1">
            {item.title}
          </Typography>
          <Typography variant="subtitle2">{item.description}</Typography>
          <Typography variant="body1">{`${item.price}€`}</Typography>
        </Stack>
        <IconButton color="success" onClick={() => addItem(item)}>
          <AddShoppingCartIcon />
        </IconButton>
      </Stack>
      <Divider light />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {`${item.title} à bien était ajouté au panier`}
        </Alert>
      </Snackbar>
    </>
  );
}
