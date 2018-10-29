import * as React from "react";
import PropTypes from "prop-types";
import { Image, Platform, ImageBackground } from "react-native";
import {
	Container,
	Content,
	Item,
	Input,
	Header,
	Body,
	Title,
	Button,
	Text,
	View,
	Icon,
	Footer,
} from "native-base"; 
import { Field, reduxForm } from "redux-form";
import {setUser} from "../../actions/user";
import styles from "./styles";

const background = require("../../images/shadow.png");

const validate = values => {
	const error = {};
	error.email = "";
	error.password = "";
	var ema = values.email;
	var pw = values.password;
	if (values.email === undefined) {
		ema = "";
	}
	if (values.password === undefined) {
		pw = "";
	}
	if (ema.length < 8 && ema !== "") {
		error.email = "too short";
	}
	if (!ema.includes("@") && ema !== "") {
		error.email = "@ not included";
	}
	if (pw.length > 12) {
		error.password = "max 11 characters";
	}
	if (pw.length < 5 && pw.length > 0) {
		error.password = "Weak";
	}
	return error;
};
export class Props {
	loginForm;
	onLogin;
}
export class State {}
class Login extends React.Component {
	static propTypes = {
		setUser: PropTypes.func,
	};
	constructor(props) {
		super(props);
		this.state = {
			name: "",
		};
		this.renderInput = this.renderInput.bind(this);
	}

	setUser(name) {
		this.props.setUser(name);
	}
	renderInput({
		input,
		label,
		type,
		meta: { touched, error, warning },
		inputProps,
	}) {
		var hasError = false;
		if (error !== undefined) {
			hasError = true;
		}
		return (
			<Item error={hasError}>
				<Icon active name={input.name === "email" ? "person" : "unlock"} />
				<Input
					placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
					{...input}
				/>
				{hasError ? (
					<Item style={{ borderColor: "transparent" }}>
						<Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
						<Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
					</Item>
				) : (
					<Text />
				)}
			</Item>
		);
	}
	render() {
		return (
			<Container>
				<Header style={{ height: 200 }}>
					<Body style={{ alignItems: "center" }}>
						<Icon name="flash" style={{ fontSize: 104 }} />
						<Title>AgroData</Title>
						<View padder>
							<Text
								style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }}
							/>
						</View>
					</Body>
				</Header>
				<Content>
					
						
							<Field name="email" component={this.renderInput} />
							<Field name="password" component={this.renderInput} />
							<Button
								style={styles.btn}
								onPress={() => this.props.navigation.navigate("Main")}
							>
								<Text>Login</Text>
							</Button>
						
					
				</Content>
				<Footer style={{ backgroundColor: "#F8F8F8" }}>
					<View
						style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}
					>
						<View padder>
							<Text style={{ color: "#000" }}>Made with love at </Text>
						</View>
						<Image
							source={{ uri: "https://geekyants.com/images/logo-dark.png" }}
							style={{ width: 422 / 4, height: 86 / 4 }}
						/>
					</View>
				</Footer>
			</Container>
		);
	}
}
const LoginForm = reduxForm(
	{
	  form: "test",
	  validate
	},
	function bindActions(dispatch) {
	  return {
		setUser: name => dispatch(setUser(name))
	  };
	}
  )(Login);
  LoginForm.navigationOptions = {
	header: null
  };
export default LoginForm;
