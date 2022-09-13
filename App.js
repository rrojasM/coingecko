import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet, TextInput, StatusBar } from 'react-native';
import CoinItem from './app/components/CoinItem';

const App = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false)


  const fetchData = async () => {

    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const data = await res.json();

    setCoins(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Gecko</Text>
        <TextInput style={styles.searchInput}
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={coins.filter((coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search))
        }
        renderItem={({ item }) => {
          return <CoinItem coin={item} />
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async() => {

          setRefreshing(true)
          await fetchData()
          setRefreshing(false)

        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    top: 10
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
    textTransform:'uppercase'
  },
  list: {
    width: '90%'
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 2,
    width: '40%',
    textAlign: 'center'
  }
})

export default App;
