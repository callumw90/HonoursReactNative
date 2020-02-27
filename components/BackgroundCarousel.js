import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, Text } from 'react-native';

const { width, height} = Dimensions.get('window'); //gets the size of the current window


class BackgroundCarousel extends React.Component {

    scrollRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0
        }
    }

    setSelectedIndex = event => {
        //width of the view size
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        
        //current position of the scroll
        const contentOffset = event.nativeEvent.contentOffset.x;

        //calculate the index of the image
        const selectedIndex = Math.floor(contentOffset / viewSize);
        
        this.setState({ selectedIndex });
    }

    render(){

        const { images } = this.props
        const { selectedIndex } = this.state 

        return(
            <View style = {{height: '100%', width: '100%', backgroundColor: 'black'}}>
                <ScrollView horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex}>
                    {images.map(image => (
                        <Image 
                            key={image}
                            source={{uri: image}}
                            style={styles.backgroundImage}
                        />
                    ))}
                </ScrollView>
                <View style={styles.circleDiv}>
                    {images.map(( image, i ) => (
                    <View 
                        key={image}
                        style={[styles.whiteCircle, {opacity: i === selectedIndex ? 0.5 : 1}]}
                    />
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: "contain",
        marginBottom: 25,
        maxHeight: height,
        width: width,
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: 'white',
    },
    circleDiv: {
        position: "absolute",
        bottom: 15,
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
});

export { BackgroundCarousel };
