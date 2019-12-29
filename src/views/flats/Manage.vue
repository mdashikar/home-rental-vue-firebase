<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar />
      </div>
      <div class="w-4/5 bg-gray-200 mx-auto h-12 p-8">
        <h2 class="text-center text-blue-600 m-8 text-2xl">Manage Flats</h2>
        <a-table :columns="columns" :dataSource="flats" @change="onChange" :loading="tableLoading">
          <span slot="monthlyRent" slot-scope="text" >৳ {{text }}</span>
          <template slot="action" slot-scope="text, record, index">

            <a-button class="mx-1"  type="primary" shape="circle" icon="edit" @click="showModal(record.id, index)"></a-button>
            <a-popconfirm
              title="Are you sure delete?"
              @confirm="confirm(record.id)"
              @cancel="cancel"
              okText="Delete"
              cancelText="Cancel"
              class="mx-1"
              
            >
              <a-button class="mx-1" type="danger" shape="circle" icon="delete"></a-button>
            </a-popconfirm>
          </template>
          
          
        </a-table>
        <a-modal title="Edit Flat" v-model="modalVisible" @ok="editFlat" okText="Update">
          <a-form  :form="form" layout="horizontal">
            <a-form-item label='Label'>
                <a-input
                  
                  v-decorator="[
                    'label',
                    {
                      rules: [{ required: true, message: 'Please input label!' }],
                    }
                  ]"
                />
            </a-form-item>
            <a-form-item label='Monthly Rent'>
                <a-input
                  
                  v-decorator="[
                    'monthlyRent',
                    {
                      rules: [{ required: true, message: 'Please input monthly rent!' }],
                    }
                  ]"
                />
            </a-form-item>
            <a-form-item label='Number of Room'>
                <a-input
                  
                  v-decorator="[
                    'numberOfRoom',
                    {
                      rules: [{ required: true, message: 'Please input number of room!' }],
                    }
                  ]"
                />
            </a-form-item>
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
    title: "Label",
    dataIndex: "label",

    sorter: (a, b) => a.label.length - b.label.length,
    sortDirections: ["descend"]
  },
  {
    title: "Monthly Rent",
    dataIndex: "monthlyRent",
    scopedSlots: { customRender: "monthlyRent" },
    sorter: (a, b) => a.monthlyRent - b.monthlyRent
  },
  {
    title: "Number of Room",
    dataIndex: "numberOfRoom",

    sorter: (a, b) => a.numberOfRoom.length - b.numberOfRoom.length,
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
      flats: [],
      loading: false,
      tableLoading: true,
      columns,
      modalVisible: false,
      flatId: ''
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
    onChange,
    async getFlats() {
      await fb.flatsCollection.where("createdBy", "==", this.user.data.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.flats.push(doc.data());
          
        });
        this.tableLoading= false;
      });
    },
    async deleteFlat(id){
      await fb.flatsCollection.doc(id).delete()
        .then( () => {
            this.$message.success("Flat successfully deleted!");
            this.flats = [];
            this.getFlats()
        }).catch(error =>  {
            this.$message.error("Error deleting flat: ", error);
        }); 
    },
    editFlat() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
        fb.flatsCollection.doc(this.flatId).update({
          label: values.label,
          monthlyRent: values.monthlyRent,
          numberOfRoom: values.numberOfRoom
        })
        this.form.resetFields();
        this.flats = [];
        this.getFlats();
        this.modalVisible = false;
        this.$$message.success("Updated successfully!!!")
        
      });
    },
    showModal(id, index) {
        this.modalVisible = true;
        this.flatId = id;
        this.form.setFieldsValue({ label: this.flats[index].label });
        this.form.setFieldsValue({ monthlyRent: this.flats[index].monthlyRent });
        this.form.setFieldsValue({ numberOfRoom: this.flats[index].numberOfRoom });
        
    },
    confirm(id) {
        this.deleteFlat(id)
    },
    cancel() {
      //this.$message.error('Clicked on Cancel');
    }
  },
  created() {
    this.getFlats();
  }
};
</script>

<style scoped></style>
