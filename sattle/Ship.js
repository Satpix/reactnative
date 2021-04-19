import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const Ship = ({shipImage, shipWidth, shipHeight, shipBottom, shipLeft}) => {

    return (
        <View style={{
            position: 'absolute',
            left: shipLeft,
            bottom: shipBottom,
            width:shipWidth,
            height:shipHeight,
        }}>
            <Image source={shipImage}
                             style={{
                                 flex:1,
                                 width:null,
                                 height:null,
                                 resizeMode:'contain',
                             }}/>
        </View>
    )

}

export default Ship;