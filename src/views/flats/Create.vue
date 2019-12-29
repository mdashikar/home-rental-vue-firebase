<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar/>
      </div>
      <div class="w-4/5 bg-gray-200 mx-auto h-12">
       
        <form class="w-full max-w-lg mx-auto mt-16">
             <h2 class="text-center text-blue-600 m-8 text-2xl">Create Flats</h2>
            
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-label">
                    Label
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-label" type="text" placeholder="01" v-model="flatData.label">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Monthly Rent">
                    Monthly Rent
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="৳ 2500" v-model="flatData.monthlyRent">
                
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Number Of room">
                    Number Of Room
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="2" v-model="flatData.numberOfRoom">
                <a-button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded" type="primary"  @click.prevent="saveFlats" :loading="loading"  >Save</a-button>
                </div>
                
            </div>
        </form>
      
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar";
const fb = require("../../firebase/fbConfig");


export default {
  data(){
      return{
          flatData: {
              label: '',
              monthlyRent: '',
              numberOfRoom: ''
          },
          loading: false
      }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  components: {
    Navbar
  },
  methods: {
      saveFlats(){
          this.loading = true;
          fb.flatsCollection
            .add({
                createdOn: new Date(),
                label: this.flatData.label,
                monthlyRent: this.flatData.monthlyRent,
                numberOfRoom: this.flatData.numberOfRoom,
                createdBy: this.user.data.uid
            })
            .then( doc => {
                doc.update({id : doc.id})
                this.loading = false;
                this.$message.success("Flats saved succuessfully!!!")
                this.flatData = {};
            })
            .catch( err => {
                this.loading = false;
                this.$message.error(err);
               
            })
      }
  }
};
</script>

<style scoped></style>
