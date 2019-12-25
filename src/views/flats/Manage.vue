<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar/>
      </div>
      <div class="w-4/5 bg-gray-200 mx-auto h-12 p-8">
            <h2 class="text-center text-blue-600 m-8 text-2xl">Manage Flats</h2>
            <a-table :columns="columns" :dataSource="flats" @change="onChange" >
                <a slot="action" href="javascript:;">Delete</a>
            </a-table>
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
      title: 'Label',
      dataIndex: 'label',

      sorter: (a, b) => a.label.length - b.label.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Monthly Rent',
      dataIndex: 'monthlyRent',
      sorter: (a, b) => a.monthlyRent - b.monthlyRent,
    },
    {
      title: 'Number of Room',
      dataIndex: 'numberOfRoom',
      
      sorter: (a, b) => a.numberOfRoom.length - b.numberOfRoom.length,
      sortDirections: ['descend', 'ascend'],
    },
    { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
  ];
 function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }


export default {
  data(){
      return{
          flats: [],
          loading: false,
          columns,
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
      onChange,
      async getFlats(){
        await fb.flatsCollection
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                this.flats.push(doc.data());
            });
        });  
      },
  },
  created(){
      this.getFlats()
  }
};
</script>

<style scoped></style>
