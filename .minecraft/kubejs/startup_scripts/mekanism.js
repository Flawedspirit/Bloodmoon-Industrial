/*
| Mekanism processing stack additions
| Based off the script for ATM 9 by EnigmaQuip
*/

global.mekanismAdditions = [
    { material: 'azure_silver', color: '#e89ffc', makeDust: false },
    { material: 'crimson_iron', color: '#fc9aad', makeDust: false }
];

// DO NOT EDIT BELOW THIS LINE

const $Slurry = Java.loadClass('mekanism.api.chemical.slurry.Slurry');
const $SlurryBuilder = Java.loadClass('mekanism.api.chemical.slurry.SlurryBuilder');
const $Gas = Java.loadClass('mekanism.api.chemical.gas.Gas');
const $GasBuilder = Java.loadClass('mekanism.api.chemical.gas.GasBuilder');

StartupEvents.registry('item', event => {
    const itemTypes = ['clump', 'crystal', 'dirty_dust', 'shard'];

    function createStackObject(name, color) {
        itemTypes.forEach(type => {
            event.create(`${type}_${name}`)
            .texture('layer0', 'mekanism:item/empty')
            .texture('layer1', `mekanism:item/${type}`)
            .texture('layer2', `mekanism:item/${type}_overlay`)
            .color(1, color)
            .tag(`mekanism:${type}s`)
            .tag(`mekanism:${type}s/${name}`)
        });
    }

    global.mekanismAdditions.forEach(entry => {
        createStackObject(entry.material, entry.color);

        if(entry.makeDust) {
            event.create(`dust_${entry.material}`)
            .texture('layer0', 'mekanism:item/empty')
            .texture('layer1', 'mekanism:item/dust')
            .color(1, entry.color)
            .tag('forge:dusts')
            .tag(`forge:dusts/${entry.material}`)
        }
    });
});

StartupEvents.registry('mekanism:slurry', event => {
    global.mekanismAdditions.forEach(entry => {
        event.createCustom(`clean_${entry.material}`, () => $Slurry($SlurryBuilder.clean().ore(`forge:ores/${entry.material}`).tint(Color.of(entry.color).getRgbJS())));
        event.createCustom(`dirty_${entry.material}`, () => $Slurry($SlurryBuilder.dirty().ore(`forge:ores/${entry.material}`).tint(Color.of(entry.color).getRgbJS())));
    });
});

StartupEvents.registry('mekanism:gas', event => {
    event.createCustom(`neutron_gas`, () => $Gas($GasBuilder.builder()));
});
