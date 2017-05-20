/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	WebView
} from 'react-native';

export default class wpapidemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ""
		};
	}

	async componentDidMount() {
		var promise = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/apidemo.wordpress.com/posts/?number=2', {
			method: 'GET'
		});

		let responseJson = await promise.json();

		this.setState({
			content: responseJson.posts[0].content
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
					To get started, edit index.ios.js
				</Text>
				<Text style={styles.instructions}>
					Press Cmd+R to reload,{'\n'}
					Cmd+D or shake for dev menu
				</Text>
				<View style={styles.theweb}>
					<WebView source={{html: this.state.content}} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	theweb: {
		marginTop: 20,
		width: 320,
		flex: 3
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('wpapidemo', () => wpapidemo);
