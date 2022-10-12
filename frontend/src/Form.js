import React, { Component } from "react";
import styled from 'styled-components';
const axios = require('axios').default;

const Submit = styled.button`border-radius: 5px;
    border: 2px solid black;
    background: grey;`;
const Textinput = styled.input`border-radius: 5px;
    border: 2px solid black;
    background: lightgray;
    width: 95%`;
const Textareainput = styled.textarea`border-radius: 5px;
    border: 2px solid black;
    background: lightgray;
    width: 95%`;
const Formbody = styled.form`border-radius: 5px;
    border: 2px solid black;
    background: lightgray;
    content-align: center;
    text-align: center;`;

export default class Form extends Component {
    state = {
        name: '', mail: '', message: ''
    }

    SetName = ({ target: {value}}) => {
        this.setState({
            name: value
        })
    }

    SetMail = ({ target: {value}}) => {
        this.setState({
            mail: value
        })
    }

    setMessage = ({ target: {value}}) => {
        this.setState({
            message: value
        })
    }

    sendFeedback = (e) => {
        e.preventDefault();
        const {name, mail, message} = this.state;

        let data = JSON.stringify({name: name, email: mail, message: message});

        axios.post("http://localhost:5000/api/save_feedback", data);
    }

    render () {
        const {name, mail, message} = this.state;

        return (<Formbody>
            <Textinput type="text" value={name} onChange={this.SetName} placeholder="Name"></Textinput>
            <Textinput type="text" value={mail} onChange={this.SetMail} placeholder="Email"></Textinput>
            <Textareainput value={message} onChange={this.setMessage} placeholder="Message"/>
            <br />
            <Submit onClick={this.sendFeedback}>Send feedback</Submit>
        </Formbody>);
    }
}