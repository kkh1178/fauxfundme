import React, {Component} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import creation from '../../ethereum/creation';
import web3 from '../../ethereum/web3';
// import {Router} from '../../routes';


class NewFundraiser extends Component {

    state = {
        fundraiserGoal: '',
        beneficiary: '',
        errorMessage:"",
        loading: false,
    }

    onSubmit = async(event) => {

        event.preventDefault();
        this.setState({loading: true, errorMessage: ""})

        try {
            const accounts = await web3.eth.getAccounts();
            await creation.methods
                .createFundraiser(this.state.beneficiary, this.state.fundraiserGoal)
                .send({
                    from: accounts[0],
                    gas: 1000000,
                })
        } catch(err) {
            this.setState({errorMessage: err.message})
        }

    }

    render() {
        return (
            <Layout>
                <h3>Start a Fundraiser!</h3>
                {/* !! to flip the string to boolean */}
                <Form onSubmit={this.onSubmit} error ={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Fundraiser Goal:</label>
                        <Input
                            label='wei'
                            labelPosition='right'
                            value={this.state.fundraiserGoal}
                            onChange={(event) => this.setState({fundraiserGoal:event.target.value})}
                        >
                        </Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Fundraiser Beneficiary:</label>
                        <Input
                            label='wallet address'
                            labelPosition='right'
                            value={this.state.beneficiary}
                            onChange={(event) => this.setState({beneficiary: event.target.value})}
                        >
                        </Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Fundraiser Cause:</label>
                        <input placeholder = "tell us your story..." />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button
                        loading={this.state.loading}
                        primary
                    >
                        Complete Fundraiser
                    </Button>
                </Form>
            </Layout>
        )
    }
}

export default NewFundraiser;