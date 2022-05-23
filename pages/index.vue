<template>
    <v-container>
        <v-card class="mx-auto mt-4">
            <CardSheet color="teal lighten-1" text="帳本列表" refresh @click="getAllLedgers"></CardSheet>
            <v-card-title>
                <v-btn color="deep-purple accent-2" class="mx-1" @click="openFormDialog()">
                    <v-icon left>mdi-text-box-plus-outline</v-icon>新增
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="查詢" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-card-text>
                <v-data-table :loading="loading" :headers="headers" :items="ledgers" :items-per-page="10"
                    :search="search">
                    <template v-slot:[`item.type`]="{ item }">
                        <template v-if="item.type === LEDGER_TYPE.EXPEND">
                            <v-chip class="ma-2" color="red">
                                <v-icon left>
                                    mdi-cash-minus
                                </v-icon>
                                支出
                            </v-chip>
                        </template>
                        <template v-else-if="item.type === LEDGER_TYPE.DEPOSIT">
                            <v-chip class="ma-2" color="primary">
                                <v-icon left>
                                    mdi-cash-plus
                                </v-icon>
                                存入
                            </v-chip>
                        </template>
                    </template>
                    <template v-slot:[`item.amount`]="{ item }">
                        <template v-if="item.type === LEDGER_TYPE.EXPEND">
                            <v-icon small color="pink">
                                mdi-minus
                            </v-icon>
                        </template>
                        <template v-else-if="item.type === LEDGER_TYPE.DEPOSIT">
                            <v-icon small color="success">
                                mdi-plus
                            </v-icon>
                        </template>
                        {{ item.amount }}
                    </template>
                    <template v-slot:[`item.description`]="{ item }">
                        <template v-if="item.description != null">
                            <template v-if="item.description.length > 10">
                                {{ item.description.substring(0, 11) }}
                                <v-btn icon color="info" @click="showMoreDescription(item.description)">
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <template v-else>
                                {{ item.description }}
                            </template>
                        </template>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn fab small color="secondary" @click="openFormDialog(item)">
                                    <v-icon class="mx-2" v-on="on">mdi-pencil-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>編輯</span>
                        </v-tooltip>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn fab small color="warning" @click="openFormDialog(item, true)">
                                    <v-icon left class="mx-2" v-on="on">mdi-cash-refund</v-icon>
                                </v-btn>
                            </template>
                            <span>來源新增</span>
                        </v-tooltip>
                        <v-tooltip right v-if="item.is_latest">
                            <template v-slot:activator="{ on }">
                                <v-btn fab small color="red" @click="deleteLedger(item)">
                                    <v-icon class="mx-2" v-on="on">mdi-delete-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>刪除</span>
                        </v-tooltip>
                        <v-tooltip right v-if="item.source_id">
                            <template v-slot:activator="{ on }">
                                <v-btn fab small color="indigo lighten-1" @click="openSourceDialog(item.source_id)">
                                    <v-icon class="mx-2" v-on="on">mdi-share-circle</v-icon>
                                </v-btn>
                            </template>
                            <span>來源參考</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog v-model="dialog.form.status" max-width="600" persistent transition="slide-x-transition">
            <LedgerForm useDialog :form.sync="form" @refresh="getAllLedgers" @close="closeFormDialog" />
        </v-dialog>
        <v-dialog v-model="dialog.more.status" transition="dialog-top-transition" max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    更多描述
                </v-card-title>
                <v-card-text>
                    {{ dialog.more.content }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="cyan" text @click="dialog.more.status = false">
                        關閉
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog.source.status" transition="dialog-bottom-transition" max-width="400">
            <template v-if="dialog.source.loading">
                <v-sheet :color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`" class="pa-3">
                    <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                </v-sheet>
            </template>
            <template v-else>
                <v-list three-line subheader>
                    <v-subheader>來源帳本資料</v-subheader>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>類型</v-list-item-title>
                            <v-list-item-subtitle v-if="dialog.source.ledger.type === LEDGER_TYPE.EXPEND">
                                支出
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-else-if="dialog.source.ledger.type === LEDGER_TYPE.DEPOSIT">
                                存入
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>金額</v-list-item-title>
                            <v-list-item-subtitle>{{ dialog.source.ledger.amount }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>餘額</v-list-item-title>
                            <v-list-item-subtitle>{{ dialog.source.ledger.balance }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>時間</v-list-item-title>
                            <v-list-item-subtitle>{{ dialog.source.ledger.created_at }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-spacer></v-spacer>
                <v-btn color="cyan" @click="dialog.source.status = false">
                    關閉
                </v-btn>
            </template>
        </v-dialog>
    </v-container>
</template>

<script>
import { pick } from 'lodash'
import { LEDGER_TYPE } from '~/enums/ledger'
import LedgerForm from '~/components/ledger/form'
import LedgerModel from '~/models/ledger'
import ledgerService from '~/services/apis/ledger'

const DEFAULT_USER_ID = 1

export default {
    components: {
        LedgerForm
    },
    created() {
        this.getAllLedgers()
    },
    data() {
        return {
            LEDGER_TYPE,
            loading: false,
            search: '',
            headers: [
                { text: '使用者', value: 'relation.user.name' },
                { text: '類型', value: 'type' },
                { text: '金額', value: 'amount' },
                { text: '餘額', value: 'balance' },
                { text: '描述', value: 'description' },
                { text: '時間', value: 'created_at' },
                { text: '操作', value: 'action', sortable: false },
            ],
            ledgers: [],
            form: {
                user_id: DEFAULT_USER_ID,
                type: LEDGER_TYPE.EXPEND,
                amount: 1,
                description: ''
            },
            dialog: {
                form: {
                    status: false
                },
                more: {
                    status: false,
                    content: ''
                },
                source: {
                    status: false,
                    loading: false,
                    ledger: {}
                }
            }
        }
    },
    methods: {
        async getAllLedgers() {
            this.loading = true
            let res = await ledgerService.getAllLedgers()
            this.ledgers = res.data.data
            this.loading = false
        },
        showMoreDescription(description) {
            this.dialog.more.content = description
            this.dialog.more.status = true
        },
        openFormDialog(editItem = null, withSource = false) {
            this.form = this.$options.data().form
            if (editItem != null) {
                if (withSource) {
                    this.form.source_id = editItem.id
                } else {
                    Object.assign(this.form, pick(editItem, ['id'].concat(Object.keys(this.form))))
                }
            }
            this.dialog.form.status = true
        },
        closeFormDialog() {
            this.dialog.form.status = false
        },
        async deleteLedger(item) {
            this.$overlay.show()
            let ledger = new LedgerModel(pick(item, ['id']))
            await ledger.delete()
            this.$snackbar.show('刪除成功')
            this.getAllLedgers()
            this.$overlay.close()
        },
        async openSourceDialog(sourceId) {
            this.dialog.source.loading = true
            this.dialog.source.status = true
            let ledger = await LedgerModel.find(sourceId)
            this.dialog.source.ledger = ledger
            this.dialog.source.loading = false
        }
    },
}
</script>