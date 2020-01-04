<template>
  <div>
    <!-- Two columns -->

<div class="flex mb-4">
  <div class="w-1/5 h-12">
    <Navbar/>
  </div>
  <div class="w-4/5 bg-gray-200 mx-auto h-12">


    <h2 class="text-center text-blue-600 text-2xl">Monthly Rent</h2>

    <a-form :form="form" @submit="handleSubmit">
    <div class="w-6/12 flex my-12 mx-auto">
      <div class="w-1/2  h-12 mx-4">


        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Rentals Name">
        Rentals Name
        </label>
        <a-form-item >
          <a-select
            showSearch
            placeholder="Select rentals"
            optionFilterProp="selectRentals"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="selectRentals"
            :filterOption="filterOption"
            v-decorator="['rentalName', { rules: [{ required: true, message: 'Please select Rental Name' }] }]"
          >
            <a-select-option  v-for="(item, index) in rentals"  :key="index" :value="index">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>



        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Monthly Rent">
        Monthly Rent
        </label>
        <a-form-item >
            <a-input
                placeholder="Monthly rent" for="Monthly Rent"
                v-decorator="['monthlyRent', { rules: [{ required: true, message: 'Please input Monthly Rent!' }] }]"
            />
        </a-form-item>



        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Payment Status">
        Payment Status
        </label>
        <a-form-item >
          <a-select
            showSearch
            placeholder="Select Payment Status"
            optionFilterProp="selectFalts"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="selectFlats"
            :filterOption="filterOption"
            v-decorator="['paymentStatus', { rules: [{ required: true, message: 'Please select Payment Status' }] }]"
          >
            <a-select-option value="jack">Paid</a-select-option>
            <a-select-option value="lucy">Due</a-select-option>
          </a-select>
        </a-form-item>



        <!-- Button -->
        <a-button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded" type="primary" :loading="loading" html-type="submit" >Save</a-button> 
      </div>

    <div class="w-1/2 h-12 mx-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Flat Number">
        Flat Number
        </label>
        <a-form-item >
          <a-input
             placeholder="Ex." for="Mobile Number"
            v-decorator="['flatNumber', { rules: [{ required: true, message: 'Please input Flat Number!' }] }]"
          />
        </a-form-item>

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Rented Month">
        Rented Month
        </label>

        <a-form-item >
            <a-month-picker class="w-full" placeholder="Select Month" for="Start Date"  @change="monthPicker"
                v-decorator="['paymentDate', { rules: [{ required: true, message: 'Please input Payment Date!' }] }]"
            />
        </a-form-item> 

        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Payment Date">
        Payment Date
        </label>

        <a-form-item >
            <a-date-picker class="w-full"  placeholder="Payment Date" for="Start Date"  @change="setStartDate"
                v-decorator="['paymentDate', { rules: [{ required: true, message: 'Please input Payment Date!' }] }]"
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
          paymentData: {
              startDate:'',
              createId:''
          },

          rentals: [],
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
      monthPicker(date, dateString) {
          console.log(date, dateString); //month picker
      },
      setStartDate(date, dateString) {
        this.paymentData.startDate = dateString;
      },
      saveRentals(values){
          this.loading = true;
          fb.rentalsCollection
            .add({
                createdOn: new Date(),
                rentalName: values.rentalName,
                rentalId: values.rentalId,
                rentedMonth: values.rentedMonth,
                flatNumber: values.flatNumber,
                id: values.id,
                monthlyRent: values.monthlyRent,
                paymentStatus : values.paymentStatus,
                paymentDate: this.paymentData.startDate,
                createdBy: this.user.data.uid
            })
            .then( doc => {
                doc.update({id : doc.id})
                this.loading = false;
                this.$message.success("Rentals saved succuessfully!!!")
                this.flatData = {};
                this.form.setFieldsValue({ 
                    rentalName: '',
                    rentalId: '',
                    rentedMonth: '',
                    flatNumber: '',
                    id: '',
                    monthlyRent: '',
                    paymentStatus: '',
                    paymentDate: '',
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
      selectRentals(index) {
        this.form.setFieldsValue({ monthlyRent:  this.rentals[index].monthlyRent});
        this.form.setFieldsValue({ flatNumber:  this.rentals[index].flatNumber});

      },
      handleBlur() {
        console.log('blur');
      },
      handleFocus() {
        console.log('focus');
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
 

      async getRentals() {
        await fb.rentalsCollection.where("createdBy", "==", this.user.data.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.rentals.push(doc.data());
          
        });
        this.tableLoading= false;
      });
    },
    
  }
  ,
  created() {
    this.getRentals();
  }
};
</script>