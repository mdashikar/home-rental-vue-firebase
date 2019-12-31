<template>
  <div>
    <div class=" flex bg-blue-900 logo">
      <img
        src="../assets/img/boss.png"
        alt="Admin avatar"
        class="inline-block p-2"
      />
      <strong
        class="inline-block text-3xl text-white pl-2 pt-4 truncate"
        v-if="user.data"
      >
        {{ user.data.displayName }}
      </strong>
    </div>
    <a-menu
      class="side-nav"
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      :theme="theme"
      :selectedKeys="[current]"
      @click="handleClick"
    >
      <a-menu-item key="1">
        <router-link to="/dashboard">
          <a-icon type="dashboard" />
          Dashboard
        </router-link>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="usergroup-add" /><span>Rentals</span></span
        >
        <a-menu-item key="3"> <router-link to="/rentals/create"> Create </router-link></a-menu-item>
        <a-menu-item key="4"> <router-link to="/rentals/manage"> Manage </router-link></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="home" /><span>Flats</span></span>
        <a-menu-item key="5">
          <router-link to="/flats/create"> Create </router-link></a-menu-item
        >
        <a-menu-item key="6">
          <router-link to="/flats/manage">Manage</router-link></a-menu-item
        >
      </a-sub-menu>

      <a-sub-menu key="sub3">
        <span slot="title"
          ><a-icon type="dollar" /><span>Monthly Rents</span></span
        >
        <a-menu-item key="7">Create</a-menu-item>
        <a-menu-item key="8">Manage</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9" @click="signOut">
        <a-icon type="logout" />
        Logout
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      current: "1",
      theme: "dark"
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    handleClick(e) {
      this.current = e.key;
    },
    changeTheme(checked) {
      this.theme = checked ? "dark" : "light";
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    }
  }
};
</script>

<style scoped>
.side-nav {
  width: 100%;
  height: 100vh;
}
.logo {
  width: 100%;
}
</style>
