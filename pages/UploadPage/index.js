import { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, Text, Touchable, TouchableOpacity } from "react-native";
import { firebase } from '../../config/firebase.config';
import * as ImagePicker from 'expo-image-picker'; 
import { styles } from "./styles";

async function uploadImage(image){
    const blob = await new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = ()=>{resolve(xhr.response)};
        xhr.onerror = ()=>{reject(new TypeError("Falha ao conectar"))};
        xhr.responseType = 'blob';
        xhr.open('GET',image,true);
        xhr.send(null);
    });
    const ref = firebase.storage().ref().child('images/test1');
    const snapshot = await ref.put(blob);
    blob.close();
}

export function UploadPage({navigation}){
    const [image, setImage] = useState(null);
    const [permission, setPermission] = useState(null);
    
    useEffect(()=>{
        (async ()=>{
            const permissionPiker = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(permissionPiker.granted) setPermission(true);
            else setErrorStatus('Permissão necessária!')
        })();
    },[]);

    async function openGallery(){
        const imageSelected = await ImagePicker.launchImageLibraryAsync();
        setImage(imageSelected.uri);
        await uploadImage(imageSelected.uri);
    }

    function goToGetPage(){
        navigation.navigate('get');
    }

    function Aplication(){
        return(
            <>
                <Text style={styles.title}>selecione uma imagem</Text>
                {image && <Image source={{uri:image}} style={{width: 300, height:300}}/>}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>openGallery()}>
                    <Text style={styles.btnText}>
                        Enviar Imagem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>goToGetPage()}>
                    <Text style={styles.btnText}>
                        Ver Todas Imagens                        
                    </Text>
                </TouchableOpacity>
            </>
        );
    };

    return(
        <SafeAreaView style={styles.container}>
            {permission && Aplication()}
            <StatusBar/>
        </SafeAreaView>
    )
};