import {HStack} from 'components';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import axios from 'axios';

const Pagination = ({currentPage, totalPages, onPageChange}: any) => {

  

  return (
    <HStack
      mv={12}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <Text
          status='primary'
          bold
          style={{fontSize: 18, marginRight: 10}}>
          {currentPage === 1 ? '' : 'Previous'}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 18, marginHorizontal: 10}}>
        Page {currentPage} of {totalPages}
      </Text>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <Text bold status="primary" style={{fontSize: 18, marginLeft: 10}}>
          Next
        </Text>
      </TouchableOpacity>
    </HStack>
  );
};

export default Pagination;
