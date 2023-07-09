import {
  Stack,
  Accordion as AccordionMui,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { OrderItem } from './orderItem';

export function Accordion({ items, category }) {
  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      {category.map(cat => {
        return (
          <AccordionMui>
            <AccordionSummary
              sx={{
                background: '#ff5a5f',
              }}
              expandIcon={<ExpandMoreIcon color="secondary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" color="#ffffff">
                {cat}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {items
                .filter(item => item.category == cat)
                .map(item => {
                  return <OrderItem item={item} />;
                })}
            </AccordionDetails>
          </AccordionMui>
        );
      })}
    </Stack>
  );
}
