import BaseApiService from '~/services/apis/baseApiService'

export default new class LedgerService extends BaseApiService {

  constructor() {
    super('ledger')
  }

  getAllLedgers() {
      return this.get('/')
  }
}
