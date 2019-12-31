<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar />
      </div>
      <div class="w-4/5 bg-gray-200 mx-auto h-12 p-8">
        <h2 class="text-center text-blue-600 m-8 text-2xl">Manage Rentals</h2>
        <a-table :columns="columns" :dataSource="rentals" @change="onChange" :loading="tableLoading">
          <span slot="monthlyRent" slot-scope="text" >৳ {{ text }}</span>
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
        <a-modal title="Edit Rental" v-model="modalVisible" @ok="editRental" okText="Update" :width="800">
          <a-form  :form="form" layout="horizontal">

            <a-row>
              <a-col :span="12" class="px-4">

            <a-form-item label='Name'>
                <a-input
                  
                  v-decorator="[
                    'name',
                    {
                      rules: [{ required: true, message: 'Please input Name!' }],
                    }
                  ]"
                />
            </a-form-item>
            <a-form-item label='Advance Payment'>
                <a-input
                  
                  v-decorator="[
                    'advancePayment',
                    {
                      rules: [{ required: true, message: 'Please input Advance Payment!' }],
                    }
                  ]"
                />
            </a-form-item>
                <a-form-item label='Reference'>
                <a-input
                  
                  v-decorator="[
                    'reference',
                    {
                      rules: [{ required: true, message: 'Please input Reference' }],
                    }
                  ]"
                />
            </a-form-item>
            <a-form-item label='Family Member'>
                <a-input
                  
                  v-decorator="[
                    'familyMember',
                    {
                      rules: [{ required: true, message: 'Please input Family Member!' }],
                    }
                  ]"
                />
            </a-form-item>
            <a-form-item label='Home Number'>
                <a-input
                  
                  v-decorator="[
                    'homeNumber',
                    {
                      rules: [{ required: true, message: 'Please input Home Number!' }],
                    }
                  ]"
                />
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

            <a-form-item label='Mobile Number'>
                <a-input
                  
                  v-decorator="[
                    'mobileNumber',
                    {
                      rules: [{ required: true, message: 'Please input Mobile Number!' }],
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

            <a-form-item label='NID Scan'>
                <a-input
                  
                  v-decorator="[
                    'nidScan',
                    {
                      rules: [{ required: true, message: 'Please input NID Scan!' }],
                    }
                  ]"
                />
            </a-form-item>

            <a-form-item label='Join Date'>
                <a-date-picker @change="setStartDate"
                  
                  v-decorator="[
                    'startDate',
                    {
                      rules: [{ required: true, message: 'Please input Join Date!' }],
                    }
                  ]"
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
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend", "ascend"]
  },
  {                                                                                     
    title: "Advance Payment",
    dataIndex: "advancePayment",
    scopedSlots: { customRender: "advancePayment" },
    sorter: (a, b) => a.advancePayment - b.advancePayment
  },
  {
    title: "Flat Number",
    dataIndex: "flatNumber",
    sorter: (a, b) => a.flatNumber.length - b.flatNumber.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    sorter: (a, b) => a.mobileNumber.length - b.mobileNumber.length,
    sortDirections: ["descend", "ascend"]
  },

    
  {
    title: "Reference",
    dataIndex: "reference",
    sorter: (a, b) => a.reference.length - b.reference.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Family Member",
    dataIndex: "familyMember",
    sorter: (a, b) => a.familyMember.length - b.familyMember.length,
    sortDirections: ["descend", "ascend"]
  },
    {
    title: "Home Number",
    dataIndex: "homeNumber",
    sorter: (a, b) => a.homeNumber.length - b.homeNumber.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Monthly Rent",
    dataIndex: "monthlyRent",
    sorter: (a, b) => a.monthlyRent.length - b.monthlyRent.length,
    sortDirections: ["descend", "ascend"]
  },  {
    title: "NID Scan",
    dataIndex: "nidScan",
    sorter: (a, b) => a.nidScan.length - b.nidScan.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    sorter: (a, b) => a.startDate.length - b.startDate.length,
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
      rentals: [],
      loading: false,
      tableLoading: true,
      columns,
      modalVisible: false,
      rentalId: ''
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
    setStartDate(date, dateString) {
        //date picker
        this.form.setFieldsValue({ startDate: dateString });
      },
    onChange,
    async getRentals() {
      await fb.rentalsCollection.where("createdBy", "==", this.user.data.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.rentals.push(doc.data());
          
        });
        this.tableLoading = false;
      });
    },
    async deleteRental(id){
      await fb.rentalsCollection.doc(id).delete()
        .then( () => {
            this.$message.success(" successfully deleted!");
            this.rentals = [];
            this.getRentals()
        }).catch(error =>  {
            this.$message.error("Error deleting rental: ", error);
        }); 
    },
    editRental() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
        fb.rentalsCollection.doc(this.flatId).update({
          label: values.label,
          advancePayment: values.advancePayment,
          flatNumber: values.flatNumber,
          mobileNumber: values.mobileNumber,
          name: values.name,
          reference: values.reference,
          familyMember: values.familyMember,
          homeNumber: values.homeNumber,
          monthlyRent: values.monthlyRent,
          nidScan: values.nidScan,
          startDate: values.startDate
        })
        this.form.resetFields();
        this.rentals = [];
        this.getRentals();
        this.modalVisible = false;
        this.$$message.success("Updated successfully!!!")
        
      });
    },
    showModal(id, index) {
        this.modalVisible = true;
        this.rentalId = id;
        this.form.setFieldsValue({ label: this.rentals[index].label });
        this.form.setFieldsValue({ advancePayment: this.rentals[index].advancePayment });
         this.form.setFieldsValue({ flatNumber : this.rentals[index].flatNumber });
          this.form.setFieldsValue({ mobileNumber: this.rentals[index].mobileNumber });
          this.form.setFieldsValue({ name: this.rentals[index].name });
          this.form.setFieldsValue({ reference: this.rentals[index].reference });
          this.form.setFieldsValue({ familyMember: this.rentals[index].familyMember });
          this.form.setFieldsValue({ homeNumber: this.rentals[index].homeNumber });
          this.form.setFieldsValue({ monthlyRent: this.rentals[index].monthlyRent });
          this.form.setFieldsValue({ nidScan: this.rentals[index].nidScan });
          this.form.setFieldsValue({ startDate: this.rentals[index].startDate });
    },
    confirm(id) {
        this.deleteRental(id)
    },
    cancel() {
      //this.$message.error('Clicked on Cancel');
    }
  },
  created() {
    this.tableLoading = true;
    this.getRentals();
  }
};
</script>

<style scoped></style>
