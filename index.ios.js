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
	WebView,
	ListView
} from 'react-native';

export default class wpapidemo extends Component {
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			loading: true,
			dataSource: ds.cloneWithRows(['row 1', 'row 2']),
		};
	}

	async componentDidMount() {
		var promise = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/apidemo.wordpress.com/posts/?number=1', {
			method: 'GET'
		});

		let responseJson = await promise.json();

		this.setState({
			content: responseJson.posts[0].content,
		});

		var html = "";
	}

	render() {
				// <View style={styles.theweb}>
				// 	<WebView source={{html: this.state.content}} />
				// </View>

		return (
			<View style={styles.container}>
				<ListView style={styles.theweb} dataSource={this.state.dataSource} renderRow={(rowData) => <Text style={styles.row}>{rowData}</Text>} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		marginTop: 20,
	},
	row: {
		padding: 10
	},
	theweb: {
		flex: 1,
		flexDirection: 'row',
	},
	img: {
		flex: 1,
	}
});

AppRegistry.registerComponent('wpapidemo', () => wpapidemo);
