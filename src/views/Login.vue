<template>
  <div class="user-login">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form bg-white p-8"
      @submit="handleSubmit"
    >
      <h2 class="text-4xl text-center ">Login</h2>
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                { required: true, message: 'Please input your email!' }
              ]
            }
          ]"
          placeholder="Email"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true
            }
          ]"
        >
          Remember me
        </a-checkbox>
        <a class="login-form-forgot float-right " href="">
          Forgot password
        </a>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button block shadow-xl"
          :loading="loading"
        >
          Log in
        </a-button>
        Or
        <router-link to="/register" class="text-blue-600">
          register now!
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(data => {
              if (data) {
                this.$message.success("You are logged in !!!");
              }
              this.$router.replace({ name: "dashboard" });
              this.loading = false;
            })
            .catch(err => {
              this.$message.error(err.message);
              this.loading = false;
            });
        }
      });
    },
    isUserLoggedIn() {
      if (this.user.loggedIn) {
        this.$router.replace({ name: "dashboard" });
      }
    }
  },
  mounted() {
    this.isUserLoggedIn();
  }
};
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.user-login {
  padding: 15% 30%;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgb(17, 31, 63) 100%,
    rgba(9, 9, 121, 1) 100%
  );
  color: #fff;

  /* Set a specific height */
  height: 100vh;
  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  scrollbar-width: none;
}
.login-form {
  /* background-color: blueviolet; */
}
</style>
