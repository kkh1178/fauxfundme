import React, {Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Fundraiser from "../ethereum/fundraiser";
import web3 from "../ethereum/web3";
import {Router} from '../routes';

class ContributionForm extends Component {
    // setting up state
    state= {
        value: "",
        errorMessage: "",
        loading: false,
    }

    // For the contribution form on the show page
    onSubmit = async (event) => {
        event.preventDefault();

        /* 
        Getting address from the getInitialProps in show.js and passing it to the campaign.js 
        file where you pass an address into campaign function that will set up your contract.
        */

        const fundraiser = Fundraiser(this.props.address);
        this.setState({
            loading: true,
            errorMessage: ""
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await fundraiser.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether"),
            });
            // Passing in the URL of the current page we are looking at and then refreshing the page 
            // with the new contribution info on it
            Router.replaceRoute(`/fundraisers/${this.props.address}`);
        } catch (err) {
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false, value: ""})
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={(event) => this.setState({value: event.target.value})}
                        label='ether'
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header= "Oops!" content={this.state.errorMessage}/>
                <Button 
                    primary
                    loading={this.state.loading}
                >
                    Contribute
                </Button>
            </Form>
        );
    }
}

export default ContributionForm;