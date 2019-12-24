<template>

  <div>
    <div class="bg-blue-900 logo">
        <img src="../assets/img/boss.png" alt="Admin avatar" class="inline-block">
        <label class="inline-block text-3xl text-white pl-4">ADMIN</label>
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
        <a-icon type="user" />
        Dashboard
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="calendar" />
        Navigation Two
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Three</span></span>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
        <a-sub-menu key="sub1-2" title="Submenu">
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="setting" /><span>Navigation Four</span></span>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
    data() {
      return {
        current: '1',
        theme: 'dark',
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
        console.log('click ', e);
        this.current = e.key;
      },
      changeTheme(checked) {
        this.theme = checked ? 'dark' : 'light';
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
    .side-nav{
        width: 15%;
        height: 100vh;
    }
    .logo{
        width: 15%;
    }
</style>