<script lang="ts">
  import ArticleSelector from "./components/articleSelector.svelte";
  import TeamRenderer from "./components/teamRenderer.svelte";
  import { Phases } from "./ts/phases";
  import { Team } from "./ts/team";
  
  // Our list to add to
  let teams: Team[] = [];

  // Currently selected team for use in Gameplay phase
  let selectedTeam: Team | null = null;

  let phase: Phases = Phases.TeamSelection;

  // These two functions are passed into articleSelector as the onComplete prop

  // This one is for Team Selection
  function addTeam(team: Team): void {
    teams.push(team);
  }

  // This one updates team info once selected
  function refreshTeam(team: Team): void {
    selectedTeam.copyData(team);
    
    phase = Phases.Intermediate;
  }

  // This one brings us to the blank "start game" screen
  function start() {
    phase = Phases.Intermediate;
  }

  // This moves us to the Gameplay phase
  function nextRound() {
    //Select a random team
    selectedTeam = teams[Math.round(
      Math.random() // Generates a random number 0-1
      * 
      (teams.length - 1) // Multiply it by largest index
    )]; // Round to get a random option

    // Now that team is selected, go into gameplay
    phase = Phases.Gameplay;
  }

  // Gameplay is done, so lets give the team a chance to reselect members and article
  function completeRound() {
    phase = Phases.Reselect;
  }
</script>

{#if phase == Phases.TeamSelection}
  <!-- These are split because container just didnt work with both for some reason 🥲 -->
  <div class="container">
    <!-- pass in the add team, so that it can add a new team to upper scoped list -->
    <ArticleSelector 
      addArticle={addTeam}
    />
  </div>

  <div class="statechanges">
    <button on:click={start}>Start</button>
  </div>
{/if}

<!-- Keep everything centered -->
<div class="container">
  
  {#if phase == Phases.Intermediate}
    <button on:click={nextRound}>Begin Game</button>
  {/if}

  {#if phase == Phases.Gameplay}
    <!-- 
      Team Renderer takes in two props,
      team, so it knows which one to render, and
      onComplete, this is a reference to the function in app.

      This is how you run a function that in an upper scope from a component. (yes many buzzwords)
    -->
    <TeamRenderer 
      team={selectedTeam}
      onComplete={completeRound}
    />
  {/if}
  {#if phase == Phases.Reselect}
    <!-- 
      This is another article selector, but I prefill it using the team prop. 
      I also use a different function (refreshTeam) because I want it to just update the current team, not add a new one
    -->
    <ArticleSelector 
      addArticle={refreshTeam}
      team={selectedTeam}
    />
  {/if}
</div>


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