import { Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import CartaoGenericoComIndicadorProps from "./CartaoGenericoComIndicadorProps";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const CartaoGenericoComIndicador = (props: CartaoGenericoComIndicadorProps) => {
  const Icon = props.icone;
  return (
    <Card sx={{
      height: "150px",
      borderRadius: '8px'
    }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center"
        }}
      >
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                color: "#A3AED0",
              }}
            >
              PIX
            </Typography>

            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "700",
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-2%",
                color: "#2B3674",
              }}
            >
              {props.valor}
            </Typography>
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                color: "#A3AED0",
              }}
            >
              {props.descritivo}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon fontSize={'small'} color={'success'} sx={{ mr: '5px' }} />
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "28px",
                    letterSpacing: "-2%",
                    color: "#05CD99",
                  }}
                >
                  Parabéns
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: '100%' }}>
                <ArrowDropUpIcon fontSize={'small'} color={'success'} sx={{ mr: '5px' }} />
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "28px",
                    letterSpacing: "-2%",
                    color: "#05CD99",
                  }}
                >
                  2.78
                </Typography>
              </Box>
            </Box>

          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#F4F7FE",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Icon color="primary" />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};