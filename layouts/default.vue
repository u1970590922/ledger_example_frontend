<template>
  <v-app dark>
    <AppBar />
    <Drawer />
    <v-main>
      <Nuxt />
    </v-main>
    <Footer />
    <Overlay />
    <Snackbar />
    <DialogMessage />
  </v-app>
</template>

<script>
import AppBar from "~/components/core/AppBar"
import Drawer from "~/components/core/Drawer"
import Footer from "~/components/core/Footer"
import Overlay from "~/components/core/Overlay"
import Snackbar from "~/components/core/Snackbar"
import DialogMessage from "~/components/message/DialogMessage";

export default {
  name: 'DefaultLayout',
  components: {
    AppBar,
    Drawer,
    Footer,
    Overlay,
    Snackbar,
    DialogMessage
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  watch: {
    '$nuxt.isOffline': function (isOffline) {
      if (isOffline) {
        this.$dialogMessage.show('您的網路已中斷，請重新連線')
      } else {
        this.$dialogMessage.close()
      }
    }
  },
  methods: {
    handleResize() {
      this.$store.commit('components/core/updateWindowSize', {
        height: window.innerHeight,
        width: window.innerWidth,
      })
    },
  },
}
</script>
