import { Avatar, Box, Card, CardContent, SvgIcon, Typography } from "@mui/material";
import CartaoGenericoComIndicadorProps from "./CartaoGenericoComIndicadorProps";


import { useVariationStyles } from "../../hooks/useVariationsStyles";


export const CartaoGenericoComIndicador = (props: CartaoGenericoComIndicadorProps) => {
  const Icon = props.icone;
  const { IndicatorIcon, indicatorColor, message, MessageIcon } = useVariationStyles(props.variacao);


  return (
    <Card sx={{
      height: "150px",
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      padding: '15px'
    }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                color: "#A3AED0",
                mb: 1
              }}
            >
              PIX
            </Typography>

            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-2%",
                color: "#2B3674",
                mb: 1
              }}
            >
              {props.valor}
            </Typography>

            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                color: "#A3AED0",
                mb: 2
              }}
            >
              {props.descritivo}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MessageIcon fontSize={'small'} style={{ color: indicatorColor, marginRight: '5px' }} />
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "28px",
                  letterSpacing: "-2%",
                  color: indicatorColor,
                  mr: 2
                }}
              >
                {message}
              </Typography>
              <Box sx={{display:'flex', alignItems:'center'}}>
              <IndicatorIcon fontSize={'small'} style={{ color: indicatorColor, marginRight: '5px' }} />
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "28px",
                  letterSpacing: "-2%",
                  color: indicatorColor,
                }}
              >
                {props.variacao}
              </Typography>
              </Box>
            </Box>
          </Box>

          <Avatar
            sx={{
              backgroundColor: "#F4F7FE",
              height: 56,
              width: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SvgIcon>
              <Icon color="primary" />
            </SvgIcon>
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};
