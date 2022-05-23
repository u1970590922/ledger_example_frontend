import { LEDGER_TYPE } from '~/enums/ledger'

export const state = () => ({
    typeDropdown: [
        {
            text: '支出',
            value: LEDGER_TYPE.EXPEND
        },
        {
            text: '存入',
            value: LEDGER_TYPE.DEPOSIT
        }
    ]
})
