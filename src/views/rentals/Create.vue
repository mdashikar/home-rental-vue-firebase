<template>
  <div>
    <!-- Two columns -->

<div class="flex mb-4">
  <div class="w-1/5 h-12">
    <Navbar/>
  </div>
  <div class="w-4/5 bg-gray-200 mx-auto h-12">


    <h2 class="text-center text-blue-600 text-2xl">Create Rentals</h2>

    <a-form :form="form" @submit="handleSubmit">
    <div class="w-6/12 flex my-12 mx-auto">
      <div class="w-1/2  h-12 mx-4">


        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Name">
        Name
        </label>
        <a-form-item >
          <a-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Dewan Akil Gazi" for="Name"
            v-decorator="['name', { rules: [{ required: true, message: 'Please input Name!' }] }]"
          />
      </a-form-item>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Advance Payment">
        Advance Payment
        </label>

        <a-form-item >
        <a-input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="৳ 2500" for="Advance Payment"
          v-decorator="['advancePayment', { rules: [{ required: true, message: 'Please input advance payment!' }] }]"
        />
        </a-form-item>

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Flat Number">
        Flat Number
        </label>
        <a-form-item >
          <a-select
            showSearch
            placeholder="Select flat label"
            optionFilterProp="selectFalts"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="selectFlats"
            :filterOption="filterOption"
            v-decorator="['flatNumber', { rules: [{ required: true, message: 'Please select flat label' }] }]"
          >
            <a-select-option  v-for="(item, index) in flats"  :key="index" :value="index">{{item.label}}</a-select-option>
          </a-select>
      </a-form-item>

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Mobile Number">
        Mobile Number
        </label>
        <a-form-item >
          <a-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="01942010059" for="Mobile Number"
            v-decorator="['mobileNumber', { rules: [{ required: true, message: 'Please input Mobile Number!' }] }]"
          />
      </a-form-item>


        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Reference">
        Reference
        </label>
        <a-form-item >
          <a-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Md. Ashiqur Rahman" for="Reference"
            v-decorator="['reference', { rules: [{ required: true, message: 'Please input Reference!' }] }]"
          />
      </a-form-item>

        <!-- Button -->
        <a-button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded" type="primary" :loading="loading" html-type="submit" >Save</a-button> 
      </div>

    <div class="w-1/2 h-12 mx-4">

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Family Member">
      Family Member
      </label>
      <a-form-item >
          <a-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Ex. 04" for="Family Member"
            v-decorator="['familyMember', { rules: [{ required: true, message: 'Please input Family Member!' }] }]"
          />
      </a-form-item>

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Home Number">
      Home Number
      </label>
      <a-form-item >
          <a-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Ex. 02" for="Home Number"
            v-decorator="['homeNumber', { rules: [{ required: true, message: 'Please input Home Number!' }] }]"
          />
      </a-form-item>

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Monthly Rent">
      Monthly Rent
      </label>
      <a-form-item >
          <a-input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Monthly rent" for="Monthly Rent"
            v-decorator="['monthlyRent', { rules: [{ required: true, message: 'Please input Monthly Rent!' }] }]"
          />
      </a-form-item>

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="NID scan copy">
      NID scan copy
      </label>
      <a-upload 

      name="file"
      :multiple="true"
      :headers="headers"
      @change="handleChange"
     
      >
      <a-button class="mb-10"> <a-icon type="upload" /> Click to Upload </a-button>
      </a-upload>

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Start Date">
      Start Date
      </label>

      <a-form-item >
          <a-date-picker  placeholder="Start Date" for="Start Date"  @change="setStartDate"
            v-decorator="['startDate', { rules: [{ required: true, message: 'Please input Join Date!' }] }]"
            
          />
      </a-form-item> 

                         
    </div>  
    </div>

    </a-form>

    

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
              startDate:'',
              flatNumber: '',
              createId:''
          },
          headers: {
          authorization: 'authorization-text',
          

        },
          flats: [],
          loading: false,
          formLayout: 'horizontal',
          form: this.$form.createForm(this, { name: 'coordinated' }),
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
          //console.log(info.file, info.fileList);
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
      saveRentals(values){
         
         this.loading = true;
          fb.rentalsCollection
            .add({
                createdOn: new Date(),
                advancePayment: values.advancePayment,
                flatNumber: this.rentalData.flatNumber,
                mobileNumber: values.mobileNumber,
                name: values.name,
                reference: values.reference,
                familyMember: values.familyMember,
                homeNumber: values.homeNumber,
                monthlyRent: values.monthlyRent,
                nidScan: '',
                startDate: this.rentalData.startDate,
                createdBy: this.user.data.uid
            })
            .then( doc => {
                doc.update({id : doc.id})
                this.loading = false;
                this.$message.success("Rentals saved succuessfully!!!")
                this.flatData = {};
                this.form.setFieldsValue({ 
                    name: '',
                    advancePayment: '',
                    flatNumber: '',
                    mobileNumber: '',
                    reference: '',
                    familyMember: '',
                    homeNumber: '',
                    monthlyRent: '',
                    nidScan: '',
                    startDate: '',
                 });
            })
            .catch( err => {
                this.loading = false;
                this.$message.error(err);
               
            })
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.saveRentals(values);
          }
        });
      },
      selectFlats(index) {
        this.rentalData.flatNumber = this.flats[index].label;
        this.form.setFieldsValue({ flatNumber:  this.flats[index].label});
        this.form.setFieldsValue({ monthlyRent:  this.flats[index].monthlyRent});
      },
      handleBlur() {
        // console.log('blur');
      },
      handleFocus() {
        // console.log('focus');
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
 

      async getFlats() {
        await fb.flatsCollection.where("createdBy", "==", this.user.data.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.flats.push(doc.data());
          
        });
        this.tableLoading= false;
      });
    },
    
  }
  ,
  created() {
    this.getFlats();
  }
};
</script>