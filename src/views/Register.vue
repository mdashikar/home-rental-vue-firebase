<template>
  <div class="user-register">
    <a-form :form="form" @submit="handleSubmit" class="bg-white p-8">
      <h2 class="text-4xl text-center py-4">Register</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <a-form-item v-bind="formItemLayout" label="Name">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Password">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Confirm Password">
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Phone Number">
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: 'Please input your phone number!' }
              ]
            }
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '880' }]"
            style="width: 70px"
          >
            <a-select-option value="860">
              +860
            </a-select-option>
            <a-select-option value="870">
              +870
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>

      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          I have read the
          <a href="">
            agreement
          </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
          class="block"
          :loading="loading"
        >
          Register
        </a-button>
        Or
        <router-link to="/" class="text-blue-600">
          login now!
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const fb = require("../firebase/fbConfig");

export default {
  data() {
    return {
      confirmDirty: false,
      loading: false,
      error: null,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true;
          fb
            .auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(data => {
                //console.log(data)
                // create user obj
                fb.usersCollection
                  .doc(data.user.uid)
                  .set({
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    userId: data.user.uid,
                  })
                  .then(() => {
                      data.user
                      .updateProfile({
                        displayName: values.name,
                        phoneNumber: values.phone
                      })
                      .then(() => {
                        this.loading = false;
                        this.$message.success("Registration completed!!!!");
                        this.$router.replace({ name: "login" });
                      })
                      
                  })
                  .catch(err => {
                    this.$message.error(err.message);
                    this.loading = false;
                  });
            })
            .catch(err => {
                        this.$message.error(err.message);
                        this.loading = false;
                      });
            
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>
<style scoped>
.user-register {
  padding: 5% 25%;
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
</style>
