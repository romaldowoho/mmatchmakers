<template>
  <div>
    <Table
      stripe
      v-if="tableData.length"
      :columns="tableCols"
      :data="tableData"
    ></Table>
  </div>
</template>

<script>
const firebase = window.firebase;
const db = firebase.firestore();
import moment from "moment";
export default {
  data() {
    return {
      tableCols: [
        { title: "Fight", key: "fight", align: "center" },
        { title: "Votes", key: "votes", align: "center" },
        { title: "Last vote date", key: "lastVoted", align: "center" }
      ],
      tableData: []
    };
  },
  async created() {
    this.fetchVotes();
  },
  methods: {
    async fetchVotes() {
      let collection = await db.collection("fights").get();
      this.tableData = collection.docs.map(f => {
        let doc = f.data();
        // converting firebase timestamp to date
        doc.lastVoted = moment
          .unix(doc.lastVoted.seconds)
          .format("MMMM Do YYYY");
        return doc;
      });
    }
  }
};
</script>

<style></style>
