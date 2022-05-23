<template>
    <v-card class="mx-auto">
        <v-card-title>
            <v-icon color="cyan accent-4" class="mr-2">
                mdi-format-list-bulleted
            </v-icon>
            <span>帳本資料</span>
            <template v-if="useDialog">
                <v-spacer></v-spacer>
                <v-btn icon @click="onClickClose">
                    <v-icon medium>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-card-title>
        <v-card-text>
            <ValidationObserver tag="form" ref="ledgerObserver">
                <v-row>
                    <v-col cols="12" sm="6">
                        <InputMenu v-model="form.type" vid="type" name="類型" rules="required" :items="typeDropdown"
                            :keys="['text', 'value']" label="請選擇類型" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <InputText v-model="form.amount" vid="amount" name="金額" rules="required|min_value:1"
                            type="number" :min="1" label="金額" />
                    </v-col>
                    <v-col cols="12">
                        <ValidationProvider vid="description" name="描述" rules="max:1000" v-slot="{ errors }">
                            <v-textarea v-model="form.description" label="描述" :error-messages="errors"></v-textarea>
                        </ValidationProvider>
                    </v-col>
                </v-row>
            </ValidationObserver>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue accent-2" @click="save">
                <v-icon left>
                    mdi-content-save-outline
                </v-icon>
                儲存
            </v-btn>
            <v-btn color="orange accent-4" @click="onClickClose">
                <v-icon left>
                    mdi-arrow-u-left-top-bold
                </v-icon>
                取消
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
import LedgerModel from '~/models/ledger'

export default {
    props: {
        useDialog: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        ...mapState('ledger', ['typeDropdown'])
    },
    methods: {
        async save() {
            if (await this.$refs.ledgerObserver.validate()) {
                this.$overlay.show()
                try {
                    let ledger = new LedgerModel(this.form)
                    await ledger.save()
                    this.$snackbar.show('保存成功')
                    this.$emit('refresh')
                    this.onClickClose()
                } catch (err) {
                    console.log(err)
                    let res = err.response
                    if (res.data.hasOwnProperty('errors')) {
                        this.$refs.ledgerObserver.setErrors(res.data.errors)
                    }
                }
                this.$overlay.close()
            }
        },
        onClickClose() {
            this.$refs.ledgerObserver.reset()
            this.$emit('close')
        }
    },
}
</script>