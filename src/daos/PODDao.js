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
        var route = "https://"+this.userId + "/public/sincompromisocard/profile.json"
        for(var i = 0; i < imagenes.length; i++){
            var imR = "https://"+this.userId + "/public/sincompromisocard/"+ imagenes[i];
            imagenes[i] = imR;
        }
        var myProfile = {
            "name" : name ,
            "userId": this.userId ,
            "birth" : birth ,
            "gender": gender ,
            "bio": bio ,
            "imagenes":  imagenes ,
             "cantidadImagenes": imagenes.length };

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
}

module.exports = PODDao;