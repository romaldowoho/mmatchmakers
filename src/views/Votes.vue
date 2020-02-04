<template>
  <div class="table">
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
        { title: "Fight", key: "fight", align: "left" },
        {
          title: "Votes",
          key: "votes",
          align: "center",
          sortable: true,
          sortType: "desc"
        },
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

<style scoped>
.table {
  font-weight: bold;
}
</style>
