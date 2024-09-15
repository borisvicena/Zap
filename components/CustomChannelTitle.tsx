import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {DefaultStreamChatGenerics} from "stream-chat-expo";
import {ChannelPreviewTitleProps} from "stream-chat-expo";
import {useTheme} from "stream-chat-expo";
import {white} from "colorette";

const styles = StyleSheet.create({
	title: { fontSize: 18, fontWeight: '700' },
});


export const CustomChannelTitle = <
	StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>(
	props: ChannelPreviewTitleProps<StreamChatGenerics>,
) => {
	const { displayName } = props;
	const {
		theme: {
			channelPreview: { title },
			colors: { black },
		},
	} = useTheme();

	return (
		<Text numberOfLines={1} style={[styles.title, { color: "#FFF" }, title]}>
			{displayName}
		</Text>
	);
};
