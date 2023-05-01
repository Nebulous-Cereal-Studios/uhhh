<script lang="ts">
  import ArticleSelector from "./components/articleSelector.svelte";
  import TeamRenderer from "./components/teamRenderer.svelte";
  import { Phases } from "./ts/phases";
  import { Team } from "./ts/team";
  
  let teams: Team[] = [];
  let selectedTeam: Team | null = null;

  let phase: Phases = Phases.TeamSelection;

  function addTeam(team: Team): void {
    teams.push(team);
  }

  function refreshTeam(team: Team): void {
    selectedTeam.copyData(team);
    
    phase = Phases.Intermediate;
  }

  function start() {
    phase = Phases.Intermediate;
  }

  function nextRound() {
    selectedTeam = teams[Math.round(Math.random() * (teams.length - 1))];

    phase = Phases.Gameplay;
  }

  function completeRound() {
    phase = Phases.Reselect;
  }
</script>

{#if phase == Phases.TeamSelection}
  <div class="container">
    <ArticleSelector 
      addArticle={addTeam}
    />
  </div>
  <div class="statechanges">
    <button on:click={start}>Start</button>
  </div>
{/if}
{#if phase == Phases.Intermediate}
  <button on:click={nextRound}>Begin Game</button>
{/if}
{#if phase == Phases.Gameplay}
  <TeamRenderer 
    team={selectedTeam}
    onComplete={completeRound}
  />
{/if}
{#if phase == Phases.Reselect}
  <ArticleSelector 
    addArticle={refreshTeam}
    team={selectedTeam}
  />
{/if}


<style>
  .container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .statechanges {
    margin-top:10px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>