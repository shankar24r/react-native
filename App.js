import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,TouchableOpacity, StyleSheet } from 'react-native';
 
export default class App extends Component {

  constructor(){                   // Initilizing constructor for newly creating object.
    super();                       // calling parent constructor.
    this.state = {       
      isLoading: true,  
      dataSource: [],              
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json())  //fetching datas from the URL
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson
      },()=>{                                       // Callback method
        this.setState({
          isLoading: false,
        })
      })
    })
  }
 
  _renderItem = ({ item }) => (      // Getting the datas 
  <TouchableOpacity onPress={()=>alert(item.title)}>  
  <View style={style.item}>
  <Text>{item.title}</Text>
  </View>
  </TouchableOpacity>
  );

  render() {
    if(this.state.isLoading){         // if data is loading                                     
      return(                         // show the ActivityIndicator animatinon is loading
        <View style={style.container}>
          <ActivityIndicator size="large" animating></ActivityIndicator> 
        </View>
      )
    }else{                           // if data is loading is completed
    return (                        // Intilizing FlatList
      <View>
            <FlatList
        data={this.state.dataSource}
        renderItem={this._renderItem}  // calling _renderItem
        keyExtractor={(item, index) => index}
       />
          </View>
        )}
    }
     }

     const style=StyleSheet.create({   // Stylesheet design.
      item: {
        padding: 10,
        borderBottomWidth:1,
        borderBottomColor:'#eee'
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }

     });