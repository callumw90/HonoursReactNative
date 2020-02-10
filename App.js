import React, { Component, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { ListItem, withTheme } from 'react-native-elements';

import Navigator from './routes/homeStack';


export default function App() {

  return (
      <Navigator />
  );
}