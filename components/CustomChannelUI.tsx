import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
	ChannelAvatar,
	ChannelPreviewProps, ChannelPreviewTitle,
	useChannelContext,
	useChannelsContext,
	useChatContext
} from 'stream-chat-expo';
import {getChannel} from "stream-chat-react-native-core/lib/typescript/components/ChannelList/utils";
import {useAuth} from "@/app/providers/AuthProvider";
import {channel} from "node:diagnostics_channel";
import {
	useChannelPreviewDisplayAvatar
} from "stream-chat-react-native-core/src/components/ChannelPreview/hooks/useChannelPreviewDisplayAvatar";
import {
	useChannelPreviewDisplayPresence
} from "stream-chat-react-native-core/src/components/ChannelPreview/hooks/useChannelPreviewDisplayPresence";
import {Avatar} from "stream-chat-react-native-core/src/components/Avatar/Avatar";
import {CustomChannelTitle} from "@/components/CustomChannelTitle";

const CustomChannelUI: React.FC<ChannelPreviewProps> = ( props ) => {

	const { channel } = props;
	// console.log("Props: ", props);

	const displayAvatar = useChannelPreviewDisplayAvatar(channel);
	const displayPresence = useChannelPreviewDisplayPresence(channel);

	return (
		<TouchableOpacity style={styles.container}>
			<Avatar
				image={displayAvatar.image}
				name={displayAvatar.name}
				online={displayPresence}
				size={60}
			/>
			<View style={styles.textContainer}>
				<CustomChannelTitle channel={channel} displayName={channel.cid} />
				<Text style={styles.latestMessage}>{channel.type}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#2E236C',
		alignItems: 'center',
	},
	channelImage: {
		width: 60,
		height: 60,
		borderRadius: 25,
		backgroundColor: '#444',
	},
	textContainer: {
		marginLeft: 15,
		flex: 1,
	},
	channelName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FFF',
	},
	latestMessage: {
		fontSize: 14,
		color: '#CCC',
	},
});

export default CustomChannelUI;
