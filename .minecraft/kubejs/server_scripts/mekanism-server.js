/*
| Mekanism processing stack additions
| Based off the script for ATM 9 by EnigmaQuip
|
| DO NOT EDIT THIS SCRIPT
| Only startup_scripts/mekanism.js should be edited
*/

ServerEvents.recipes(event => {
    global.mekanismAdditions.forEach(entry => {
        let material = entry.material;
        let dust = AlmostUnified.getPreferredItemForTag(`forge:dusts/${material}`);

        if(entry.makeDust) {
            dust = Item.of(`kubejs:dust_${material}`);
        } else if(dust.isEmpty() && !Ingredient.of(`#forge:dusts/${material}`).isEmpty()) {
            dust = Ingredient.of(`#forge:dusts/${material}`).getFirst();
        }
        let hasDust = !dust.isEmpty();

        // STORAGE BLOCKS
        if(!Ingredient.of(`#forge:storage_blocks/raw_${material}`).isEmpty()) {
            // Dissolution
            event.custom({
                type: 'mekanism:dissolution',
                itemInput: {
                    ingredient: {
                        tag: `forge:storage_blocks/raw_${material}`
                    }
                },
                gasInput: {
                    amount: 2,
                    gas: 'mekanism:sulfuric_acid'
                },
                output: {
                    slurry: `kubejs:dirty_${material}`,
                    amount: 6000,
                    chemicalType: 'slurry'
                }
            }).id(`kubejs:processing/${material}/slurry/dirty/from_raw_block`);

            // Injection
            event.custom({
                type: 'mekanism:injecting',
                itemInput: {
                    ingredient: {
                        tag: `forge:storage_blocks/raw_${material}`
                    }
                },
                chemicalInput: {
                    amount: 2,
                    gas: 'mekanism:hydrogen_chloride'
                },
                output: {
                    item: `kubejs:shard_${material}`,
                    amount: 24
                }
            }).id(`kubejs:processing/${material}/shard/from_raw_block`);

            // Purification
            event.custom({
                type: 'mekanism:purifying',
                itemInput: {
                    ingredient: {
                        tag: `forge:storage_blocks/raw_${material}`
                    }
                },
                chemicalInput: {
                    amount: 2,
                    gas: 'mekanism:oxygen'
                },
                output: {
                    item: `kubejs:clump_${material}`,
                    amount: 18
                }
            }).id(`kubejs:processing/${material}/clump/from_raw_block`);

            // Enrichment
            if(hasDust) {
                event.custom({
                    type: 'mekanism:enriching',
                    itemInput: {
                        ingredient: {
                            tag: `forge:storage_blocks/raw_${material}`
                        }
                    },
                    output: {
                        item: dust.id,
                        amount: 12
                    }
                }).id(`kubejs:processing/${material}/clump/from_raw_block`);
            }
        }

        // ORES
        if(!Ingredient.of(`#forge:ores/${material}`).isEmpty()) {
            // Dissolution
            event.custom({
                type: 'mekanism:dissolution',
                itemInput: {
                    ingredient: {
                        tag: `forge:ores/${material}`
                    }
                },
                gasInput: {
                    amount: 1,
                    gas: 'mekanism:sulfuric_acid'
                },
                output: {
                    slurry: `kubejs:dirty_${material}`,
                    amount: 1000,
                    chemicalType: 'slurry'
                }
            }).id(`kubejs:processing/${material}/slurry/dirty/from_ore`);

            // Injection
            event.custom({
                type: 'mekanism:injecting',
                itemInput: {
                    ingredient: {
                        tag: `forge:ores/${material}`
                    }
                },
                chemicalInput: {
                    amount: 1,
                    gas: 'mekanism:hydrogen_chloride'
                },
                output: {
                    item: `kubejs:shard_${material}`,
                    amount: 4
                }
            }).id(`kubejs:processing/${material}/shard/from_ore`);

            // Purification
            event.custom({
                type: 'mekanism:purifying',
                itemInput: {
                    ingredient: {
                        tag: `forge:ores/${material}`
                    }
                },
                chemicalInput: {
                    amount: 1,
                    gas: 'mekanism:oxygen'
                },
                output: {
                    item: `kubejs:clump_${material}`,
                    amount: 3
                }
            }).id(`kubejs:processing/${material}/clump/from_ore`);

            // Enrichment
            if(hasDust) {
                event.custom({
                    type: 'mekanism:enriching',
                    itemInput: {
                        ingredient: {
                            tag: `forge:ores/${material}`
                        }
                    },
                    output: {
                        item: dust.id,
                        amount: 2
                    }
                }).id(`kubejs:processing/${material}/clump/from_ore`);
            }
        }

        // ITEMS
        // Washing
        event.custom({
            type: 'mekanism:washing',
            fluidInput: {
                amount: 5,
                tag: 'minecraft:water'
            },
            slurryInput: {
                amount: 1,
                slurry: `kubejs:dirty_${material}`
            },
            output: {
                slurry: `kubejs:clean_${material}`,
                amount: 1
            }
        }).id(`kubejs:processing/${material}/slurry/clean`);

        // Crystallization
        event.custom({
            type: 'mekanism:crystallizing',
            chemicalType: 'slurry',
            input: {
                amount: 200,
                slurry: `kubejs:clean_${material}`
            },
            output: {
                item: `kubejs:crystal_${material}`
            }
        }).id(`kubejs:processing/${material}/crystal/from_slurry`);

        // Injection
        event.custom({
            type: 'mekanism:injecting',
            itemInput: {
                ingredient: {
                    tag: `mekanism:crystals/${material}`
                }
            },
            chemicalInput: {
                amount: 1,
                gas: 'mekanism:hydrogen_chloride'
            },
            output: {
                item: `kubejs:shard_${material}`
            }
        }).id(`kubejs:processing/${material}/shard/from_crystal`);

        // Purification
        event.custom({
            type: 'mekanism:purifying',
            itemInput: {
                ingredient: {
                    tag: `mekanism:shards/${material}`
                }
            },
            chemicalInput: {
                amount: 1,
                gas: 'mekanism:oxygen'
            },
            output: {
                item: `kubejs:clump_${material}`
            }
        }).id(`kubejs:processing/${material}/clump/from_shard`);

        // Crushing
        event.custom({
            type: 'mekanism:crushing',
            input: {
                ingredient: {
                    tag: `mekanism:clumps/${material}`
                }
            },
            output: {
                item: `kubejs:dirty_dust_${material}`
            }
        }).id(`kubejs:processing/${material}/dirty_dust/from_clump`);

        // Enrichment
        if(hasDust) {
            event.custom({
                type: 'mekanism:enriching',
                input: {
                    ingredient: {
                        tag: `mekanism:dirty_dusts/${material}`
                    }
                },
                output: {
                    item: dust.id
                }
            }).id(`kubejs:processing/${material}/dust/from_dirty_dust`);
        }
    });
});
