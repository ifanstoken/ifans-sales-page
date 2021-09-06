
import { Currency } from 'blockchain/types/Currency';
import useCurrencies from 'hooks/useCurrencies';
import { useState, useCallback, useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FixedSizeList } from 'react-window'
import CurrencyRow from './CurrencyRow';
import styled from 'styled-components';

const LIST_HEIGHT = 400;

const ListWrapper = styled.div`
  border: solid 1px #CCCCCC;
  border-radius: 4px;
  width: 100%;
  min-height: ${LIST_HEIGHT + 2}px;
  overflow: hidden;
  background: white;
  display: flex;
  padding: 10px 5px;
`;

const NoResultSpan = styled.span`
  font-size: 24px;
  color: #BBBBBB;
  margin: auto;
`;

interface CurrencyModalProps {
  show: boolean;
  onHide: () => void;
  onCurrencySelect: (currency: Currency) => void;
  selectedCurrency: Currency | null;
}

const CurrencyModal = ({
  show,
  onHide,
  onCurrencySelect,
  selectedCurrency
} : CurrencyModalProps) => {

  const [search, setSearch] = useState<string>('');
  const { currencies } = useCurrencies();
  const [filtered, setFiltered] = useState<Currency[]>(currencies);

  useEffect(() => {
    const isContain = (text: string, word: string) => {
      return text.toLowerCase().includes(word.toLowerCase());
    }
    const _filtered = currencies.filter((currency) => {
      return isContain(currency.symbol, search) ||
            isContain(currency.name, search) ||
            currency.address == search
    })
    setFiltered(_filtered);
  }, [currencies, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const itemKey = useCallback((index: number, data: Currency[]) => {
    const currency = data[index];
    return currency.symbol;
  }, [])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Select a currency</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control className="mb-3" type="text" placeholder="Search name or paste address" value={search} onChange={handleSearchChange} />
        <ListWrapper>
          {
            filtered.length > 0 ?
              <FixedSizeList
                height={LIST_HEIGHT}
                itemData={filtered}
                itemCount={filtered.length}
                itemSize={56}
                itemKey={itemKey}
                width="100%"
              >
                {CurrencyRow(onCurrencySelect, selectedCurrency)}
              </FixedSizeList>
            :
              <NoResultSpan>No result found</NoResultSpan>
          }
        </ListWrapper>
      </Modal.Body>
    </Modal>
  )
}

export default CurrencyModal;