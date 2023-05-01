<script lang="ts">
  import type { Team } from "../ts/team";

    export let team: Team;
    export let onComplete: () => void;

    let revealed = false;

    function reveal() {
        revealed = true;

        team.markedForRedo = true;
    }
</script>

<div>
    <h1>The Article is {team.article}</h1>

    {#if !revealed}
        <button on:click={reveal}>Reveal Members</button>
    {/if}
    {#if revealed}
        <div>
            {#each team.members as member}
                <span>{member}</span>
            {/each}
        </div>
        <button on:click={onComplete}>
            continue
        </button>
    {/if}

    
</div>