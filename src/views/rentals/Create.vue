<template>
  <div>
    <!-- Two columns -->

<div class="flex mb-4">
  <div class="w-1/5 h-12">
    <Navbar/>
  </div>
  <div class="w-4/5 bg-gray-200 mx-auto h-12">


    <h2 class="text-center text-blue-600 text-2xl">Create Rentals</h2>

    <!-- Two columns -->
    <div class="w-6/12 flex my-12 mx-auto">
      <div class="w-1/2  h-12 mx-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Advance Payment">
        Advance Payment
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="৳ 2500" v-model="rentalData.advancePayment">

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Flat Number">
        Flat Number
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="2" v-model="rentalData.flatNumber">

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Mobile Number">
        Mobile Number
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="01942010059" v-model="rentalData.mobileNumber">

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Name">
        Name
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="John Alex" v-model="rentalData.name">

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Reference">
        Reference
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="2" v-model="rentalData.reference">

        <!-- Button -->
        <a-button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded" type="primary"  @click.prevent="saveRentals" :loading="loading"  >Save</a-button> 
      </div>

    <div class="w-1/2 h-12 mx-4">

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Family Member">
      Family Member
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="2" v-model="rentalData.familyMember">

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Home Number">
      Home Number
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="2" v-model="rentalData.homeNumber">

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Monthly Rent">
      Monthly Rent
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="৳ 15,000" v-model="rentalData.monthlyRent">

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="NID scan copy">
      NID scan copy
      </label>
      <a-upload 
      v-model="rentalData.nidScan"
      name="file"
      :multiple="true"
      :headers="headers"
      @change="handleChange"
      >
      <a-button class="mb-6 bg-gray-200 "> <a-icon type="upload" /> Click to Upload </a-button>
      </a-upload>

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Start Date">
      Start Date
      </label>
      <a-date-picker @change="setStartDate"/>

                         
    </div>  
    </div>

  </div>
</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar";
const fb = require("../../firebase/fbConfig");


export default {
  data(){
      return{
          rentalData: {
              label: '',
              advancePayment: '',
              flatNumber: '',
              mobileNumber:'',
              name:'',
              reference:'',
              familyMember:'',
              homeNumber:'',
              monthlyRent:'',
              nidScan:'',
              startDate:''
          },
          headers: {
          authorization: 'authorization-text',
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
      handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully`); //Upload File
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
      setStartDate(date, dateString) {
        this.rentalData.startDate = dateString;
      },

      saveRentals(){
          this.loading = true;
          fb.rentalsCollection
            .add({
                createdOn: new Date(),
                label: this.rentalData.label,
                advancePayment: this.rentalData.advancePayment,
                flatNumber: this.rentalData.flatNumber,
                mobileNumber: this.rentalData.mobileNumber,
                name: this.rentalData.name,
                reference: this.rentalData.reference,
                familyMember: this.rentalData.familyMember,
                homeNumber: this.rentalData.homeNumber,
                monthlyRent: this.rentalData.monthlyRent,
                nidScan: this.rentalData.nidScan,
                startDate: this.rentalData.startDate,
                createdBy: this.user.data.uid
            })
            .then( doc => {
                doc.update({id : doc.id})
                this.loading = false;
                this.$message.success("Rentals saved succuessfully!!!")
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