<template>
  <div>
    <template v-if="routes.hasOwnProperty('children')">
      <v-list-group no-action color="cyan">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>{{ routes.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ routes.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ routes.children.subTitle }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <RouteList :routes="routes.children.subRoutes" />
        </v-list-group>
      </v-list-group>
    </template>
    <template v-else-if="Array.isArray(routes)">
      <div v-for="(item, index) in routes" :key="index">
        <RouteList :routes="item" :key="index" />
      </div>
    </template>
    <template v-else>
      <v-list-item :to="routes.to" router exact>
        <v-list-item-action>
          <v-icon>{{ routes.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="routes.title" />
        </v-list-item-content>
      </v-list-item>
    </template>
  </div>
</template>

<script>

export default {
  name: 'RouteList',
  props: {
    routes: {
      type: [Array, Object],
      default: () => [],
    },
  },
}
</script>
