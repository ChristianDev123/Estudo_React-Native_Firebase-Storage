import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { styles } from './styles';

export default function GetPage(){
    const [fileList, setFileList] = useState([]); 

    useEffect(()=>{
        (async ()=>{
            const storage = getStorage();
            const listImages = ref(storage, 'images');
            listAll(listImages)
            .then((allImages)=>{
                allImages.items.forEach((image,index)=>{
                    getDownloadURL(image)
                    .then((urlImage)=>setFileList([...fileList,{index,urlImage}]));
                });
            })
            .catch((error)=>console.log(error));
        })();
    },[]);

    return( 
        <SafeAreaView style={styles.container}>
            {fileList.length != 0 ?
                <FlatList
                    data={fileList}
                    renderItem={({item})=>card(item.urlImage)}
                    keyExtractor={(item)=>item.index}
                />
                :
                <Text>
                    Nenhuma imagem encontrada!
                </Text>
            }
            <StatusBar/>
        </SafeAreaView>
    );
};

function card(imageURI){
    console.log(imageURI)
    return(
        <View style={styles.imageWrapper}>
            <Image
                source={{uri:imageURI}}
                style={styles.image}
            />
        </View>
    );
};