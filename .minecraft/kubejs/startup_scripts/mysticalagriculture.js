const $MysticalAgricultureAPI = Java.loadClass('com.blakebr0.mysticalagriculture.api.MysticalAgricultureAPI');

const DisableCropList = [
    "aluminum",
    "apatite",
    "chrome",
    "constantan",
    "electrum",
    "graphite",
    "iridium",
    "mithril",
    "peridot",
    "platinum",
    "rubber",
    "ruby",
    "saltpeter",
    "sapphire",
    "titanium",
    "tungsten"
];
const EnableCropList = [];

StartupEvents.postInit(event => {
    let CropRegistry = $MysticalAgricultureAPI.getCropRegistry();

    for(const disable of DisableCropList) {
        CropRegistry.getCropByName(disable).setEnabled(false);
    }

    for(const enable of EnableCropList) {
        CropRegistry.getCropByName(enable).setEnabled(true);
    }
});
