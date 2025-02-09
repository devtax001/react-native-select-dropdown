import {useState, useEffect, useMemo} from 'react';
import {deepSearchInArr} from '../helpers/deepSearchInArr';
import {findIndexInArr} from '../helpers/findIndexInArr';
import {isExist} from '../helpers/isExist';

export const useSelectDropdown = (data, defaultValueByIndex, defaultValue, searchFilter) => {
  const [selectedItem, setSelectedItem] = useState(null); // selected item from dropdown
  const [selectedIndex, setSelectedIndex] = useState(-1); // index of selected item from dropdown
  const [searchTxt, setSearchTxt] = useState('');

  // data array changes
  useEffect(() => {
    if (!data || data.length == 0) {
      reset();
    }
  }, [JSON.stringify(data)]);

  // default value by index added or changed
  useEffect(() => {
    // defaultValueByIndex may be equals zero
    if (isExist(defaultValueByIndex)) {
      if (data && isExist(data[defaultValueByIndex])) {
        selectItem(defaultValueByIndex);
      }
    }
  }, [JSON.stringify(defaultValueByIndex)]);
  // default value added or changed
  useEffect(() => {
    // defaultValue may be equals zero
    if (isExist(defaultValue)) {
      if (data && findIndexInArr(defaultValue, data) >= 0) {
        selectItem(findIndexInArr(defaultValue, data));
      }
    }
  }, [JSON.stringify(defaultValue)]);

  const dataArr = useMemo(() => {
    if (!searchTxt) {
      return data;
    }
    if (searchFilter) {
      return searchFilter(searchTxt, data);
    }
    return deepSearchInArr(searchTxt, data);
  }, [JSON.stringify(data), searchTxt]);

  const selectItem = index => {
    setSelectedItem(data[index]);
    setSelectedIndex(index);
  };

  const reset = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
  };

  return {
    dataArr,
    selectedItem,
    selectedIndex,
    selectItem,
    reset,
    searchTxt,
    setSearchTxt,
  };
};
