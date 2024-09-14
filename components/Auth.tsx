import React, {useState} from "react";
import {
	Alert,
	Text,
	View,
	AppState,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
	ActivityIndicator
} from "react-native";
import {Button, Input} from "@rneui/themed";
import {supabase} from "@/utils/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loadingSignIn, setLoadingSignIn] = useState(false);
	const [loadingSignUp, setLoadingSignUp] = useState(false);


	async function signInWithEmail() {
		setLoadingSignIn(true);
		const {error} = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) Alert.alert("Sign In Error", error.message);
		setLoadingSignIn(false);
	}

	async function signUpWithEmail() {
		setLoadingSignUp(true);
		const {
			data: {session},
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert("Sign Up Error", error.message);
		if (!session) Alert.alert("Please check your inbox for email verification!");
		setLoadingSignUp(false);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Image style={styles.stretch} source={require("@/assets/images/auth.png")}/>
				<View className="w-full">
					<Input
						label="Email"
						labelStyle={styles.input}
						onChangeText={(text) => setEmail(text)}
						value={email}
						placeholder="welcome@blare.app"
						autoCapitalize={"none"}
						inputStyle={{color: "white"}}
					/>
				</View>
				<View className="w-full">
					<Input
						label="Password"
						labelStyle={styles.input}
						onChangeText={(text) => setPassword(text)}
						value={password}
						secureTextEntry={true}
						placeholder="Password"
						autoCapitalize={"none"}
						inputStyle={{color: "white"}}
					/>
				</View>
				<TouchableOpacity onPress={signInWithEmail} style={styles.button}>
					{loadingSignIn ? (
						<ActivityIndicator size="small" style={styles.loadingIndicator}/>
					) : (
						<Text style={styles.buttonText}>Sign In</Text>
					)}

				</TouchableOpacity>
				<TouchableOpacity onPress={signUpWithEmail} style={styles.button}>
					{loadingSignUp ? (
						<ActivityIndicator size="small" style={styles.loadingIndicator}/>
					) : (
						<Text style={styles.buttonText}>Sign Up</Text>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		padding: 20,
		gap: 6,
		alignItems: "center",
	},
	stretch: {
		width: 300,
		height: 300,
	},
	button: {
		backgroundColor: "#433D8B",
		borderRadius: 12,
		paddingVertical: 14,
		alignSelf: 'stretch',
		alignItems: 'center',
		elevation: 5,
	},
	buttonText: {
		fontSize: 16,
		color: "white",
		fontWeight: "600",
	},
	loadingIndicator: {
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		color: '#FFF'
	}
});