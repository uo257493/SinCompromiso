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

    async canRead(route){
        try {
           var sol = await this.fc.itemExists( route );
           return sol;
        } catch (error) {
            return false;
        }
    }

    async readFile(route){
        var canRead = await this.canRead(route);

        if( canRead ){
            let content = await this.fc.readFile( route )
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

    // async eliminaTodasCarpetas(){
    //     await this.fc.deleteFolder("https://loles.inrupt.net/private/sincompromisochats/");
    //     await this.fc.deleteFolder("https://loles.inrupt.net/private/sinCompromisoChats/");
    // }

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


    async leeEnlaces(){
        var archivoEnlaces = "https://" + this.userId +"/sinCompromisoChats/enlaces.json"
        var carpeta = "https://" + this.userId +"/sinCompromisoChats"
        if( await this.fc.itemExists( archivoEnlaces ) ){
            let content = await this.fc.readFile( archivoEnlaces )
            return JSON.parse(content);
        }
        else{
            await this.fc.createFolder(carpeta)
            await this.fc.createFile(archivoEnlaces, JSON.stringify({"enlaces": []}))

            return {"enlaces": []};
        }
    }

    async leeEnlaces(){
        var archivoEnlaces = "https://" + this.userId +"/sincompromisochats/enlaces.json"
        var carpeta = "https://" + this.userId +"/sincompromisochats/"
        if( await this.fc.itemExists( archivoEnlaces ) ){
            let content = await this.fc.readFile( archivoEnlaces )
            return JSON.parse(content);
        }
        else{
            if(! (await this.fc.itemExists( carpeta )) )
                 await this.fc.createFolder(carpeta)
            await this.fc.createFile(archivoEnlaces, JSON.stringify({"enlaces": []}))

            return {"enlaces": []};
        }
    }

    async creaEnlacesConNoCreados(listaDeElemACrear){
        var archivoEnlaces = "https://" + this.userId +"/sincompromisochats/enlaces.json"
        var actual = await this.leeEnlaces();
        for(var i = 0; i< listaDeElemACrear.length; i++){
            actual.enlaces.push(listaDeElemACrear[i]);
            await this.createChatFile(listaDeElemACrear[i]);
        }
        this.fc.postFile( archivoEnlaces, JSON.stringify(actual) );
    }

    async createChatFile(conQuien){
        var dir = "https://" + this.userId +"/sincompromisochats/"+ conQuien+".json";
        var archivoACL = "https://" + this.userId +"/sincompromisochats/"+ conQuien+".json.acl";

        await this.fc.createFile( dir, JSON.stringify({"mensajes": []}))
        await this.fc.createFile(archivoACL, this.generateACL(conQuien, conQuien+".json"), "text/turtle");
    }

    // async pruebaGeneral(){
    //     var carpeta = "https://" + this.userId +"/sincompromisochats/"
    //     var archivo = "https://" + this.userId +"/prueba7g/prueba7.json"
    //    var archivoACL = "https://" + this.userId +"/prueba7g/prueba7.json.acl"
    //
    //     await this.fc.deleteFolder(carpeta);
    //     //await this.fc.createFolder(carpeta)
    //     // await this.fc.createFile(archivo, JSON.stringify({"enlaces": []}))
    //     // await this.fc.createFile(archivoACL, this.generateACL("personasc1.solidcommunity.net", "prueba7.json"), "text/turtle");
    //
    //
    // }

    generateACL(partnerID, filename) {
        var ACL = "@prefix : <#>.\n" +
            "@prefix n0: <http://www.w3.org/ns/auth/acl#>.\n" +
            "@prefix c: </profile/card#>.\n" +
            "@prefix c0: <https://"+partnerID+"/profile/card#>.\n" +
            "\n" +
            ":ControlReadWrite\n" +
            "    a n0:Authorization;\n" +
            "    n0:accessTo <"+filename+">;\n" +
            "    n0:agent c:me;\n" +
            "    n0:mode n0:Control, n0:Read, n0:Write.\n" +
            ":Read\n" +
            "a n0:Authorization; n0:accessTo <"+filename+">; n0:agent c0:me; n0:mode n0:Read.\n";

        return ACL;
    }

    async getPartChat(yo, userId){
        var route = "https://"+yo+"/sincompromisochats/"+userId+".json"

        var result = await this.readFile(route);
        if(result == false)
            return {"mensajes":[]};
        else
            return JSON.parse(result);
    }

    async getFullChat(userId){
        var yo = this.getUserId();
        var l1 = await this.getPartChat(yo, userId);
        var l2 = await this.getPartChat(userId, yo);
        return l1.mensajes.concat(l2.mensajes);
    }

    async tienenEnlace(userId){
        var enlaces = await this.leeEnlaces();
        return enlaces.enlaces.includes(userId);
    }

    async subeMensaje(contenido, receptor){
        var mensaje = new Object();
        mensaje.contenido = contenido;
        mensaje.timestamp = Date.now();
        mensaje.sender = this.getUserId();

        var miCon = await this.getPartChat(mensaje.sender, receptor);

        miCon.mensajes.push(mensaje);

        this.fc.postFile( "https://" + mensaje.sender +"/sincompromisochats/"+ receptor+".json", JSON.stringify(miCon) );
    }
}


module.exports = PODDao;