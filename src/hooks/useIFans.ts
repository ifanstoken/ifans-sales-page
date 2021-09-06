import { useContext } from 'react';
import { Context } from '../contexts/IFansProvider';

const useIFans = () => {
  const { ifans } = useContext(Context);
  return ifans;
}

export default useIFans;