<input
        {{#if attributes.id}}id="{{attributes.id}}"{{/if}}
        class="qti-interaction qti-inlineInteraction qti-textEntryInteraction{{#if attributes.class}} {{attributes.class}}{{/if}}"
        data-serial="{{serial}}"
        data-qti-class="textEntryInteraction"
        type="text"
>