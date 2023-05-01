<script lang="ts">
  import { Team } from "../ts/team";

    export let addArticle: (team: Team) => void;
    export let team: Team | null = null;

    let article: string;

    let leader: string;
    let partner: string;
    let otherGuy: string;

    function compile() {
        const list = [leader]; 

        if(partner) {
            list.push(partner);
        }
        if(otherGuy) {
            list.push(otherGuy);
        }

        let team = new Team(article, list);
        addArticle(team);
        console.log(team);

        article = '';
        
        leader = '';
        partner = '';
        otherGuy = '';
    }

    if(team !== null) {
        if(!team.markedForRedo) {
            article = team.article;
        }
        leader = team.members[0];
        partner = team.members[1];
        otherGuy = team.members[2];
    }
</script>

<div class="container">
    <input class="article" bind:value={article}>
    <div class="members">
        <input bind:value={leader}>
        <input bind:value={partner}>
        <input bind:value={otherGuy}>
    </div>
    <div class="submit">
        <button on:click={compile}>Submit</button>
    </div>
</div>

<style>
    .container {
        width: 50%;
    }
    .article {
        width: 100%;
    }
    .members {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;
    }
    .submit {
        margin-top:10px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
