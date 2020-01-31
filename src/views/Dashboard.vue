<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar />
      </div>
      <div class="w-4/5 bg-gray-500 h-12">
        <div
          class="max-w-sm rounded overflow-hidden float-left shadow-lg mt-12 px-6"
        >
          <div class="px-6 py-4 text-center">
            <div class="font-bold text-xl mb-2">Total Rentals</div>
            <a-spin v-if="isLoadingRental" />
            <p v-else class="text-gray-700 text-base">
              {{ totalRentals }}
            </p>
          </div>
        </div>
        <div
          class="max-w-sm rounded overflow-hidden float-left shadow-lg mt-12 px-6"
        >
          <div class="px-6 py-4 text-center">
            <div class="font-bold text-xl mb-2">Total Flats</div>
            <a-spin v-if="isLoadingFlat" />
            <p v-else class="text-gray-700 text-base">
              {{ totalFlats }}
            </p>
          </div>
        </div>
        <div
          class="max-w-sm rounded overflow-hidden float-left shadow-lg mt-12 px-6"
        >
          <div class="px-6 py-4 text-center">
            <div class="font-bold text-xl mb-2">Total Rents</div>
            <a-spin v-if="isLoadingRent" />
            <p v-else class="text-gray-700 text-base">
              {{ totalRents }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import { mapGetters } from "vuex";
import Navbar from "../components/Navbar";

const fb = require("../../src/firebase/fbConfig");

export default {
  data() {
    return {
      totalFlats: "",
      totalRentals: "",
      totalRents: "",
      isLoadingFlat: true,
      isLoadingRental: true,
      isLoadingRent: true
    };
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
    async getFlats() {
      await fb.flatsCollection
        .where("createdBy", "==", this.user.data.uid)
        .get()
        .then(querySnapshot => {
          this.totalFlats = querySnapshot.size;
          this.isLoadingFlat = false;
        });
      await fb.rentalsCollection
        .where("createdBy", "==", this.user.data.uid)
        .get()
        .then(querySnapshot => {
          this.totalRentals = querySnapshot.size;
          this.isLoadingRental = false;
        });
      await fb.monthlyRentCollection
        .where("createdBy", "==", this.user.data.uid)
        .get()
        .then(querySnapshot => {
          this.totalRents = querySnapshot.size;
          this.isLoadingRent = false;
        });
    }
  },
  created() {
    this.getFlats();
  }
};
</script>

<style scoped></style>
