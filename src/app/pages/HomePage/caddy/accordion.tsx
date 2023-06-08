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
                background:
                  'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{cat}</Typography>
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
