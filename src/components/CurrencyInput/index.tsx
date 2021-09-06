
import { Currency } from '../../blockchain/types/Currency';
import { useState, useCallback } from 'react'
import styled from 'styled-components/macro'
import CurrencyModal from '../CurrencyModal'
import { Button } from 'react-bootstrap'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

const CurrencySelect = styled(Button)<{}>`
  align-items: center;
  font-size: 16px;
  background-color: white;
  color: black;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  border: solid 1px gray;
  width: initial;
  padding: 6px 8px;
  justify-content: space-between;
  &:focus,
  &:hover {
    background-color: #CCCCCC !important;
    color: black !important;
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.35rem;
  height: 35%;

  path {
    stroke: black;
    stroke-width: 1.5px;
  }
`

const StyledTokenName = styled.span`
  margin: 0 0.25rem 0 0.25rem;
  font-size: 16px;
`

interface CurrencyInputProps {
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
}

export default function CurrencyInput({
  onCurrencySelect,
  currency
}: CurrencyInputProps) {

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const onSelect = useCallback((currency: Currency) => {
    setModalOpen(false);
    if (onCurrencySelect)
      onCurrencySelect(currency);
  }, [setModalOpen, onCurrencySelect])

  return (
    <div>
    <CurrencySelect
      selected={!!currency}
      className="open-currency-select-button"
      onClick={() => {
        if (onCurrencySelect) {
          setModalOpen(true)
        }
      }}
    >
      <Aligner>
        {currency ? (
          <img style={{ marginRight: '0.5rem' }} src={currency.logo} height={'24px'} />
        ) : null}
        <StyledTokenName className="token-symbol-container">
          {(currency && currency.symbol && currency.symbol.length > 20
            ? currency.symbol.slice(0, 4) +
              '...' +
              currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
            : currency?.symbol) || <span>Select a token</span>}
        </StyledTokenName>
        {onCurrencySelect && <StyledDropDown selected={!!currency} />}
      </Aligner>
    </CurrencySelect>
    {onCurrencySelect && (
      <CurrencyModal
        show={modalOpen}
        onHide={handleCloseModal}
        onCurrencySelect={onSelect}
        selectedCurrency={currency?currency:null}
      />
    )}
    </div>
  )
}
