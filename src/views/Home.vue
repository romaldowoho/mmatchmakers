<template>
  <div>
    <div class="vote-area">
      <div class="fighter-first">
        <draggable
          style="height: 70px;"
          @change="fighterOneChange"
          :list="fighter_one"
          :group="{ name: 'fighter', pull: false, put: true }"
        >
          <div style="display: flex;">
            <div
              v-for="fighter in fighter_one"
              :key="fighter[0]"
              style="width: 90%;"
            >
              {{ fighter[0] }}
            </div>
            <div
              v-if="this.fighter_one.length"
              class="btn-close"
              @click="fighter_one.pop()"
            >
              <Icon type="md-close" />
            </div>
          </div>
        </draggable>
      </div>
      <div class="vs">🆚</div>
      <div class="fighter-second">
        <draggable
          style="height: 70px;"
          @change="fighterTwoChange"
          :list="fighter_two"
          :group="{ name: 'fighter', pull: false, put: true }"
        >
          <div style="display: flex;">
            <div
              v-for="fighter in fighter_two"
              :key="fighter[0]"
              style="width: 90%;"
            >
              {{ fighter[0] }}
            </div>
            <div
              v-if="this.fighter_two.length"
              class="btn-close"
              @click="fighter_two.pop()"
            >
              <Icon type="md-close" />
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="btn-vote">
      <Button
        @click="vote"
        ghost
        size="large"
        style="background: linear-gradient(#0f2027,#203a43,#2c5364);"
        >VOTE</Button
      >
    </div>

    <div v-if="rankings.length" class="wrap">
      <div v-for="wc in rankings" :key="wc.wclass">
        <Card class="card" :padding="0">
          <h2 slot="title" class="title">{{ wc.wclass }}</h2>
          <draggable
            @start="scrollUp"
            :sort="false"
            :clone="clone"
            :list="wc.fighters"
            :group="{ name: 'fighter', pull: 'clone', put: false }"
          >
            <div
              class="cell"
              v-for="(fighter, idx) in wc.fighters"
              :key="fighter[0]"
            >
              <div class="ranking">{{ idx + 1 }}</div>
              <div class="name">
                <a href="/votes">{{ fighter[0] }}</a>
              </div>
              <div class="icon">
                <Icon
                  v-if="getRankingLabel(fighter[1]) == 1"
                  type="ios-arrow-up"
                  color="green"
                />
                <Icon
                  v-if="getRankingLabel(fighter[1]) == -1"
                  type="ios-arrow-down"
                  color="red"
                />
              </div>
              <div
                v-if="fighter[1] && fighter[1] !== 'NR'"
                class="ranking-change"
              >
                {{ fighter[1][fighter[1].length - 1] }}
              </div>
            </div>
          </draggable>
        </Card>
      </div>
    </div>
    <div id="disqus_thread"></div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
import firebase from "firebase";
import { db } from "../main";

export default {
  components: {
    draggable
  },
  data() {
    return {
      rankings: [],
      fighter_one: [],
      fighter_two: []
    };
  },
  methods: {
    clearVotingFields() {
      this.fighter_one.pop();
      this.fighter_two.pop();
    },
    getRankingLabel(label) {
      if (!label || label == "NR") return 0;
      if (label.split(" ").indexOf("increased") !== -1) return 1;
      if (label.split(" ").indexOf("decreased") !== -1) return -1;
    },
    clone(val) {
      return [val[0]];
    },
    fighterOneChange(evt) {
      if (evt.added) {
        this.fighter_one = [evt.added.element];
      }
    },
    fighterTwoChange(evt) {
      if (evt.added) {
        this.fighter_two = [evt.added.element];
      }
    },
    scrollUp() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    vote() {
      if (!this.fighter_one.length || !this.fighter_two.length) {
        this.$Message.warning("Please select both fighters to vote");
        return;
      }
      if (this.fighter_one[0][0] == this.fighter_two[0][0]) {
        this.$Message.warning("Please select different fighters");
        return;
      }

      let f1 = this.fighter_one[0][0];
      let f2 = this.fighter_two[0][0];

      // names are arranged in alphabetical order before saving to ensure consistency and avoid duplicate fights
      // Khabib vs Ferguson == Ferguson vs Khabib
      let fight = f1 > f2 ? `${f2} - ${f1}` : `${f1}-${f2}`;

      db.collection("fights")
        .where("fight", "==", fight)
        .get()
        .then(query => {
          if (!query.empty) {
            this.incrementFightVotes(fight, query.docs[0].id);
          } else {
            this.saveFight(fight);
          }
          this.$Message.success("Your vote has been saved");
        })
        .catch(err => {
          this.$Message.error("Something went wrong. Please try again");
          console.log(err);
        });

      // clear fields
      this.clearVotingFields();
    },
    incrementFightVotes(fight, id) {
      db.collection("fights")
        .doc(id)
        .update({
          fight: fight,
          votes: firebase.firestore.FieldValue.increment(1),
          lastVoted: new Date()
        })
        .then()
        .catch(err => {
          console.log(err);
        });
    },
    saveFight(fight) {
      db.collection("fights")
        .add({
          fight: fight,
          votes: 1,
          lastVoted: new Date()
        })
        .then()
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    axios
      .get("https://mmatchmakers.herokuapp.com/")
      .then(res => {
        this.rankings = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.vote-area {
  height: 200px;
  display: flex;
  justify-content: center;
  margin-top: 200px;
}
.btn-close {
  float: right;
  margin-right: 10px;
  height: 21px;
}
.btn-close:hover {
  cursor: pointer;
}
.btn-vote {
  height: 200px;
  margin: 0 auto;
}
.fighter-first {
  height: 70px;
  width: 300px;
  vertical-align: center;
  line-height: 70px;
  font-size: 1.5em;
  color: white;
  background-color: rgba(176, 177, 164, 0.541);
  margin: 20px;
  border-radius: 5px;
  border: 2px solid white;
}
.vs {
  padding-top: 10px;
  font-size: 4rem;
}
.fighter-second {
  height: 70px;
  width: 300px;
  vertical-align: center;
  line-height: 70px;
  font-size: 1.5em;
  color: white;
  background-color: rgba(176, 177, 164, 0.541);
  margin: 20px;
  border-radius: 5px;
  border: 2px solid white;
}
.wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.card {
  width: 350px;
  height: 535px;
  margin-bottom: 30px;
  background: inherit;
  color: aliceblue;
}
.cell {
  display: flex;
  width: 100%;
  height: 30px;
  vertical-align: center;
  line-height: 30px;
}
.cell:hover {
  background-color: rgba(242, 252, 254, 0.2);
  cursor: pointer;
}
.ranking {
  width: 10%;
  padding-left: 20px;
}
.name {
  width: 75%;
  text-align: left;
  padding-left: 55px;
}
a {
  color: white;
}
.icon {
  width: 5%;
}
.ranking-change {
  width: 10%;
}
.title {
  text-align: left;
  padding-left: 75px;
}

@media (max-width: 415px) {
  .vote-area {
    display: table;
  }
  .btn-vote {
    padding-top: 50px;
  }
}
</style>
