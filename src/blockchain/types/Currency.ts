
import  { tokens } from '../constants';

export class Currency {

  /**
   * The chain ID on which this currency resides
   */
  public readonly chainId: number
  /**
   * The decimals used in representing currency amounts
   */
  public readonly decimals: number
  /**
   * The symbol of the currency, i.e. a short textual non-unique identifier
   */
  public readonly symbol: string
  /**
   * The name of the currency, i.e. a descriptive textual non-unique identifier
   */
  public readonly name: string
  /**
   * The address of the currency, i.e. 0xa050886815cfc52a24b9c4ad044ca199990b6690
   */
  public readonly address: string

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param chainId the chain ID on which this currency resides
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  constructor(chainId: number, decimals: number, symbol: string, name: string, address: string) {

    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.address = address
  }

  get logo() {
    return tokens[this.symbol].logo;
  }

}