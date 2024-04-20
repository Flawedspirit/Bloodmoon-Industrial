let settings = JsonIO.read('kubejs/PackSettings.js');

if (settings == null) {
    settings = {
        disableChunkLoaders: false
    }
    JsonIO.write('kubejs/PackSettings.js', settings);
}

global['chunkloaders'] = settings.disableChunkLoaders;
