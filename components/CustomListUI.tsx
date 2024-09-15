import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {ChannelPreview, useChannelsContext, useChatContext} from "stream-chat-expo";
import CustomChannelUI from './CustomChannelUI';
import {useAuth} from "@/app/providers/AuthProvider"; // Assume you have this component

const CustomListUI = () => {
	const {channels, loadingChannels, error, refreshing, refreshList} = useChannelsContext();
	const { client } = useChatContext();

	if (loadingChannels) {
		return <Text style={styles.textLoader}>Loading...</Text>;
	}

	if (error) {
		return <Text style={styles.textLoader}>Error loading channels.</Text>;
	}

	if (channels?.length === 0) {
		return <Text style={styles.textLoader}>No channels available.</Text>;
	}

	return (
		<FlatList
			data={channels}
			keyExtractor={(item) => item.cid}
			renderItem={({item}) => <ChannelPreview client={client} Preview={CustomChannelUI} channel={item}/>}
			onRefresh={refreshList}
			refreshing={refreshing}
		/>
	);
};

const styles = StyleSheet.create({
	textLoader: {
		flex: 1,
		color: '#FFF',
		textAlign: 'center',
	}
});

export default CustomListUI;
