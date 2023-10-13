import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ErrorIcon from '@mui/icons-material/Error';

export const useVariationStyles = (variacao: number) => {
    const isPositive = variacao > 0;

    return {
        IndicatorIcon: isPositive ? ArrowDropUpIcon : ArrowDropDownIcon,
        indicatorColor: isPositive ? "#05CD99" : "#FF3B30",
        message: isPositive ? "Parabéns" : "Melhoria",
        MessageIcon: isPositive ? CheckCircleIcon : ErrorIcon
    };
};
