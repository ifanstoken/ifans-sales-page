
import { Currency } from 'blockchain/types/Currency';
import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

const CurrencyRowWrapper = styled.div<{
  selected: boolean
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: transaprent;
  padding: 5px 5px;
  &:hover {
    background: rgba(1, 1, 1, 0.1);
    cursor: pointer;
  }
  ${({selected}) => selected && css`
    background: rgba(1, 1, 1, 0.2);
  `}
`;

const CurrencyLogo = styled.img`
  height: 30px;
  margin: 0px 12px
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CurrencySymbol = styled.div`
  font-size: 16px;
  color: black;
`;

const CurrencyName = styled.div`
font-size: 12px;
color: black;
`;

interface CurrencyRowProps {
  data: Currency[];
  index: number;
  style: CSSProperties
}

const CurrencyRow = (onCurrencySelect: (Currency) => void, selectedCurrency: Currency | null) => ({
  data, index, style
}: CurrencyRowProps) => {
  console.log(style);
  const currency = data[index];
  return (
    <CurrencyRowWrapper 
      style={style} 
      onClick={() => onCurrencySelect(currency)}
      selected={currency.address == selectedCurrency?.address}
    >
      <CurrencyLogo src={currency.logo}/>
      <ColumnWrapper>
        <CurrencySymbol>{ currency.symbol }</CurrencySymbol>
        <CurrencyName>{ currency.name }</CurrencyName>
      </ColumnWrapper>
    </CurrencyRowWrapper>
  )
}

export default CurrencyRow;