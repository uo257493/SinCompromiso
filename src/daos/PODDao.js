class PODDao {

    constructor() {
    }
    async isRegistered(){
       return await this.fc.itemExists( "https://"+this.userId + "/public/sincompromisocard" );
    }

    getUserId(){
        return this.userId;
    }
    setUserID(userId){
        this.userId = userId.split("/")[2];
    }

    setFC(fc){
        this.fc = fc;
    }

    async readFile(route){
        if( await this.fc.itemExists( "https://personasc1.solidcommunity.net/private/prueba/Ejemplo.md" ) ){
            let content = await this.fc.readFile( "https://personasc1.solidcommunity.net/private/prueba/Ejemplo.md" )
            return content;
        }
        return false;
    }

    async createProfileFolder(){
        if( !await this.isRegistered()) {
            await this.fc.createFolder("https://"+this.userId + "/public/sincompromisocard/") // only create if it doesn't already exist
        }
    }


    async createProfileFile(name, birth, gender, bio, imagenes){
        var iniCatImages = 0;
        for(var i = 0; i< imagenes.length; i++){
            if(imagenes[i]!="")
                iniCatImages++;
        }

        var route = "https://"+this.userId + "/public/sincompromisocard/profile.json"
        for(var i = 0; i < imagenes.length; i++){
            if(!imagenes[i].includes("http") && imagenes[i] != "") {
                var imR = "https://" + this.userId + "/public/sincompromisocard/" + imagenes[i];
                imagenes[i] = imR;
            }
        }
        for(var i = imagenes.length; i< 5; i++){
            imagenes.push("");
        }
        var myProfile = {
            "name" : name ,
            "userId": this.userId ,
            "birth" : birth ,
            "gender": gender ,
            "bio": bio ,
            "imagenes":  imagenes ,
             "cantidadImagenes": iniCatImages };

        console.log(myProfile);
        await this.fc.createFile(route, JSON.stringify(myProfile));
    }

    async createMySCProfile(name, birth, gender, bio, images){
        await this.createProfileFolder();
        await this.createProfileFile(name, birth, gender, bio, images);
    }

    async eliminaTodasCarpetas(){
        await this.fc.deleteFolder("https://personasc1.solidcommunity.net/public/sincompromisocard/");
    }

    async uploadImage(theImage, imageName){
        await this.fc.createFile("https://"+this.userId+"/public/sincompromisocard/"+imageName, theImage, "image/png");
    }

    async getDatosPerfil(){
        var route = "https://"+this.userId + "/public/sincompromisocard/profile.json"
        if( await this.fc.itemExists( route ) ){
            let content = await this.fc.readFile( route )
            return JSON.parse(content);
        }
    }

    async leeOtroPod(userIdTS){
        var route = "https://"+ userIdTS + "/public/sincompromisocard/profile.json"
        if( await this.fc.itemExists( route ) ){
            let content = await this.fc.readFile( route )
            return JSON.parse(content);
        }
    }

    async getLocationOtroPerfil(rutaOtroPerfil){
        var route = "https://"+rutaOtroPerfil + "/public/sincompromisocard/pilot3.json"
        if( await this.fc.itemExists( route ) ){
            let content = await this.fc.readFile( route )
            return JSON.parse(content);
        }
        return "";
    }

    async geoLocaliza(lat, long){
        if( await this.isRegistered()) {
            var myPos = {a: lat, b: long}
            var route = "https://" + this.userId + "/public/sincompromisocard/pilot3.json"
            await this.fc.createFile(route, JSON.stringify(myPos))
        }

    }

    async editPerfil(name, bio, imagenes){
        var dataGot = await this.getDatosPerfil();
        await this.createProfileFile(name, dataGot.birth, dataGot.gender, bio,imagenes)
    }

    async deletePic(picName){
        await this.fc.deleteFile(picName);
    }

    async selectNewImageToCreate(){
        var dataGot = await this.getDatosPerfil();
        for(var i = 0; i < dataGot.imagenes.length && dataGot.imagenes[i] != "" ; i++){
            var checkDir = await this.fc.itemExists( dataGot.imagenes[i])
            if( !checkDir )
                return dataGot.imagenes[i]
        }
    }
}

module.exports = PODDao;