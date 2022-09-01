import { getStorage, ref as refStorage, listAll, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { styles } from './styles';
import { getDatabase, onValue, ref as refDatabase } from 'firebase/database';

export default function GetPage(){
    const [fileList, setFileList] = useState([]);
    const [descriptionImage, setDescriptionImage] = useState('');
    useEffect(()=>{
        const storage = getStorage(); 
        const nameUser = 'ChrisTest';
        const pathImage = `images/${nameUser}`;
        const listImages = refStorage(storage, pathImage);
        listAll(listImages)
        .then((allImages)=>{
            allImages.items.forEach((image,index)=>{
                getNameImage(image.fullPath);
                getDownloadURL(image)
                .then((urlImage)=>setFileList([...fileList,{index,urlImage,description:descriptionImage}]));
            });
        })
    },[]);

    function getNameImage(pathImage){
        const db = getDatabase();
        const reference = refDatabase(db,pathImage);
        onValue(reference,(snapshot)=>{
            const data = snapshot.val();
            setDescriptionImage(data.name)
        });
    }

    return( 
        <SafeAreaView style={styles.container}>
            {fileList.length != 0 ?
                <FlatList
                    data={fileList}
                    renderItem={({item})=>card(item.urlImage,item.description)}
                    keyExtractor={(item)=>item.index}
                />
                :
                <Text style={styles.text}>
                    Nenhuma imagem encontrada!
                </Text>
            }
            <StatusBar/>
        </SafeAreaView>
    );
};

function card(imageURI, description){
    return(
        <View style={styles.imageWrapper}>
            <Image
                source={{uri:imageURI}}
                style={styles.image}
            />
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};