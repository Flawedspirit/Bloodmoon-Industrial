JEIEvents.hideItems(event => {
    function hideItemByNBT(modid, tag) {
        let modItems = Ingredient.ofMod(modid).getItems();

        modItems.forEach(item => {
            if(item.hasTagCompound && item.getTagCompound().contains(tag)) {
                event.hide(item);
            }
        });
    }

    hideItemByNBT('potionsmaster', '"Potion": "potionsmaster:vibranium_sight"');

    event.hide('reliquary:rod_of_lyssa');
    event.hide('twilightforest:uncrafting_table');
    Color.DYE.forEach(color => {
        [
            'controller',
            'crafter',
            'crafter_manager',
            'crafting_grid',
            'crafting_monitor',
            'creative_controller',
            'detector',
            'disk_manipulator',
            'fluid_grid',
            'grid',
            'network_receiver',
            'network_transmitter',
            'pattern_grid',
            'relay',
            'security_manager',
            'wireless_transmitter'
        ].forEach(machine => {
            event.hide(`refinedstorage:${color}_${machine}`);
        });
    });

    if(global.chunkloaders) {
        event.hide('mekanism:dimensional_stabilizer');
        event.hide('mekanism:upgrade_anchor');
    }
});

