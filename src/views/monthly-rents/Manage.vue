<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar />
      </div>
      <div class="w-4/5 bg-gray-200 mx-auto h-12 p-8">
        <h2 class="text-center text-blue-600 m-8 text-2xl">Manage Monthly Rent</h2>
        <a-table :columns="columns" :dataSource="monthlyRents" @change="onChange" :loading="tableLoading">
          
          <template slot="action" slot-scope="text, record, index">

            <a-button class="mx-1"  type="primary" shape="circle" icon="edit" @click="showModal(record.id, index)"></a-button>
            <a-popconfirm
              title="Are you sure delete?"
              @confirm="confirm(record.id)"
              @cancel="cancel"
              okText="Delete"
              cancelText="Cancel"
              class="mx-1">
              <a-button class="mx-1"  type="danger" shape="circle" icon="delete"></a-button>
            </a-popconfirm>
          </template>
          
          
        </a-table>
        <a-modal title="Edit Monthly Rent" v-model="modalVisible" @ok="editMonthlyRent" okText="Update" :width="800">
          <a-form  :form="form" layout="horizontal">

            <a-row>
              <a-col :span="12" class="px-4">

            <a-form-item label='Rentals Name'>
                <a-input
                  
                  v-decorator="[
                    'rentalName',
                    {
                      rules: [{ required: true, message: 'Please input Rental Name!' }],
                    }
                  ]"
                />
            </a-form-item>
            <a-form-item label='Monthly Rent'>
                <a-input
                  
                  v-decorator="[
                    'monthlyRent',
                    {
                      rules: [{ required: true, message: 'Please input Monthly Rent!' }],
                    }
                  ]"
                />
            </a-form-item>
           <a-form-item  label='Payment Status'>
              <a-select
                showSearch
                placeholder="Select Payment Status"
                optionFilterProp="selectPayment"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="selectPaymentStatus"
                :filterOption="filterOption"
                v-decorator="['paymentStatus', { rules: [{ required: true, message: 'Please select Payment Status' }] }]"
              >
                <a-select-option value="paid">Paid</a-select-option>
                <a-select-option value="due">Due</a-select-option>
              </a-select>
        </a-form-item>
          </a-col>

          <a-col :span="12" class="px-2">
              <a-form-item label='Flat Number'>
                <a-input
                  
                  v-decorator="[
                    'flatNumber',
                    {
                      rules: [{ required: true, message: 'Please input Flat Number!' }],
                    }
                  ]"
                />
            </a-form-item>

            <a-form-item label='Rented Month'>
                <a-month-picker class="w-full" placeholder="Select Month" for="Start Date"  @change="setRentedMonth"

                v-decorator="['rentedMonth', { rules: [{ required: true, message: 'Please input Payment Date!' }] }]"
            />
            </a-form-item>

            <a-form-item label='Payment Date'>
                 <a-date-picker class="w-full"  placeholder="Payment Date" for="Start Date"  @change="setPaymentDate"
                v-decorator="['paymentDate', { rules: [{ required: true, message: 'Please input Payment Date!' }] }]"
            />
            </a-form-item>
          </a-col>
        </a-row>
            
           
        

          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar";
const fb = require("../../firebase/fbConfig");

const columns = [
  {
    title: "Rentals Name",
    dataIndex: "rentalName",
    sorter: (a, b) => a.rentalName.length - b.rentalName.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Monthly Rent",
    dataIndex: "monthlyRent",
    sorter: (a, b) => a.monthlyRent.length - b.monthlyRent.length,
    sortDirections: ["descend", "ascend"]
  },
  {                                                                                     
    title: "Payment Status",
    dataIndex: "paymentStatus",
    scopedSlots: { customRender: "advancePayment" },
    sorter: (a, b) => a.paymentStatus- b.paymentStatus
  },
  {
    title: "Flat Number",
    dataIndex: "flatNumber",
    sorter: (a, b) => a.flatNumber.length - b.flatNumber.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Rented Month",
    dataIndex: "rentedMonth",
    sorter: (a, b) => a.rentedMonth.length - b.rentedMonth.length,
    sortDirections: ["descend", "ascend"]
  },

  {
    title: "Payment Date",
    dataIndex: "paymentDate",
    sorter: (a, b) => a.paymentDate.length - b.paymentDate.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    scopedSlots: { customRender: "action" }
  }
];
function onChange(pagination, filters, sorter) {
  return pagination, filters, sorter;
}

export default {
  data() {
    return {
      monthlyRentData: {
              paymentDate:'',
              rentedMonth: '',
              paymentStatus: '',
              rentalId: '',
              rentalName: '',
              createId:''
          },
      monthlyRents: [],
      loading: false,
      tableLoading: true,
      columns,
      modalVisible: false,
      monthlyRentId: '',

    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
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
      setRentedMonth(date, dateString) {
           this.monthlyRentData.rentedMonth = dateString; //month picker
      },
      setPaymentDate(date, dateString) {
        this.monthlyRentData.paymentDate = dateString;
      },
      selectPaymentStatus(value){
        this.monthlyRentData.paymentStatus = value;

      },
    onChange,
    async getMonthlyRent() {
      await fb.monthlyRentCollection.where("createdBy", "==", this.user.data.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.monthlyRents.push(doc.data());
          
        });
        this.tableLoading = false;
      });
    },
    async deleteMonthlyRent(id){
      await fb.monthlyRentCollection.doc(id).delete()
        .then( () => {
            this.$message.success(" successfully deleted!");
            this.monthlyRents = [];
            this.getMonthlyRent()
        }).catch(error =>  {
            this.$message.error("Error deleting rental: ", error);
        }); 
    },
    editMonthlyRent() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
        fb.monthlyRentCollection.doc(this.monthlyRentId).update({
          rentalName: values.rentalName,
          monthlyRent: values.monthlyRent,
          paymentStatus :this.monthlyRentData.paymentStatus,
          flatNumber: values.flatNumber,
          rentedMonth: this.monthlyRentData.rentedMonth,
          paymentDate: this.monthlyRentData.paymentDate,
        })
        this.form.resetFields();
        this.monthlyRents = [];
        this.getMonthlyRent();
        this.modalVisible = false;
        this.$$message.success("Updated successfully!!!")
        
      });
    },
    showModal(id, index) {
        this.modalVisible = true;
        this.monthlyRentId = id;
        
          this.form.setFieldsValue({ rentalName: this.monthlyRent[index].rentalName });
          this.form.setFieldsValue({ monthlyRent : this.monthlyRent[index].monthlyRent });
          this.form.setFieldsValue({ paymentStatus: this.monthlyRent[index].paymentStatus });
          this.form.setFieldsValue({ flatNumber: this.monthlyRent[index].flatNumber });
          this.form.setFieldsValue({ rentedMonth: this.monthlyRent[index].flatNumber });
          this.form.setFieldsValue({ paymentDate: this.monthlyRent[index].paymentDate });
    },
    confirm(id) {
        this.deleteMonthlyRent(id)
    },
    cancel() {
      //this.$message.error('Clicked on Cancel');
    }
  },
  created() {
    this.tableLoading = true;
    this.getMonthlyRent();
  }
};
</script>

<style scoped></style>
