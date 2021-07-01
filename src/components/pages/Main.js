import React, { Component } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text, Image, Dimensions, Modal, ScrollView } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../config/env";
import MapView, { Marker, AnimatedRegion,   } from 'react-native-maps';

const locations = [
    {id:"1", title:"Restaurant", latitude: 37.116054, longitude: 37.349239, uri: "https://i.pinimg.com/564x/12/d4/81/12d4810b9d25f866a98245e23c775351.jpg"},
    {id:"2", title:"Coffee Shop", latitude: 37.145256, longitude: 37.507034, uri: "https://image.freepik.com/free-vector/barista-making-coffee-cafe-illustration_80802-117.jpg"},
    {id:"3", title:"Zoo", latitude: 37.143760, longitude: 37.506251, uri: "https://image.freepik.com/free-vector/group-wild-animals_1308-43813.jpg"},
    {id:"4", title:"Coiffeur ", latitude: 37.142035, longitude: 37.506725, uri: "https://image.freepik.com/free-vector/work-professional-hairdresser-beauty-salon-illustration_160496-12.jpg"},
    {id:"5", title:"Shopping Center", latitude: 37.140210, longitude: 37.508375, uri: "https://image.freepik.com/free-vector/family-couples-with-kids-during-shopping-clothing-cosmetics-department-mall-horizontal-isometric-vector-illustration_1284-30227.jpg"},
]
class Main extends Component {
    constructor(props) {
        super(props);
    }
    locationsRenderItem = () => {
        console.log("item? ", locations.uri);
        return(
            <View style = {styles.cardWrapper}>
                     <Image style = {styles.cardImage}
                        resizeMode = "cover"
                        source = {{uri: "https://i.pinimg.com/564x/12/d4/81/12d4810b9d25f866a98245e23c775351.jpg"}}>
                     </Image>
           
            </View>
        )
    }
    onViewableItemsChanged = ({ viewableItems, changed }) => {
       changed.map(changedData => {
           if(changedData.isViewable === true) {
               this.mapView.animateToRegion({
                   latitude: parseFloat(changedData.item.latitude),
                   longitude: parseFloat(changedData.item.longitude),
                   latitudeDelta: 0.01,
                   longitudeDelta: 0.01
                }, 700)
           }
        })
    }
    render() {
        return(
                <View style = {styles.container}>
                    <MapView 
                        rotateEnabled={false}
                        ref={(map) => { this.mapView = map; }}
                        style = {{height: "100%", width: "100%"}}
                        initialRegion = {
                            {latitude: 37.116054,
                            longitude:  37.349239,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421}}>
                        {locations.map((val, index) => {
                            return(
                                <MapView.Marker 
                                    coordinate = {{
                                    latitude: val.latitude,
                                    longitude: val.longitude }}
                                    key={index}>
                                </MapView.Marker>
                            );
                        })}
                    </MapView> 
                    <SafeAreaView style = {{ height: PhoneHeight, width: '100%', position: 'absolute', justifyContent: 'space-between'}}>
                        <FlatList
                            style = {styles.companiesContainer}
                            pagingEnabled
                            horizontal
                            onViewableItemsChanged = {this.onViewableItemsChanged}
                            viewabilityConfig = {{
                            itemVisiblePercentThreshold: 100,
                            }}
                            keyExtractor = {(item) => item.id}
                            data = {locations}
                            renderItem = {this.locationsRenderItem} />
                    </SafeAreaView>
                </View>        
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    cardWrapper: {
        zIndex:1,
        height: PhoneHeight * 0.1, 
        width:PhoneWidth * 0.8,
        marginHorizontal:PhoneWidth*0.1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: PhoneHeight*0.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        width: responsiveSize(50),
        height: responsiveSize(50),
        borderRadius: responsiveSize(25),
        marginLeft: 15,
     
      },
})
export default Main;