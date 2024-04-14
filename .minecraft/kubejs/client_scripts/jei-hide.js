JEIEvents.hideItems(event => {
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
});
