
<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click=""
          :to="item.path"
          v-bind:class="[$route.path == item.path ? activeClass : '']"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      activeClass: 'listActive',
      items: [{
        icon: 'accessibility',
        title: 'Player VS Computer',
        path: '/pvc'
      },
      {
        icon: 'computer',
        title: 'Computer VS Player',
        path: '/cvp'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Hangman Game'
    }
  },
  name: 'App'
}
</script>

<style scoped>
.listActive {
  background: #e0e0e0;
}
</style>
