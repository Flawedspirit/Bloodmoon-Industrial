WorldgenEvents.remove(event => {
    event.removeOres(props => {
        props.worldgenLayer = 'underground_ores';
        props.blocks = [
            "railcraft:deepslate_lead_ore",
            "railcraft:deepslate_tin_ore",
            "railcraft:lead_ore",
            "railcraft:tin_ore"
        ];
    });
});
