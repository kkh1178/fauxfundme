import React, {Component} from 'react';
import { Card, Grid, Button, GridRow } from 'semantic-ui-react';
import ContributionForm from '../../components/ContributionForm';
import Layout from '../../components/Layout';
import Fundraiser from "../../ethereum/fundraiser";
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';


class ShowFundraiser extends Component {

    /* 
    get a handle on the fundraiser we are trying to look at; getInitialProps will get some data in an object,
    and display it; WE ARE GETTING THE PROPS FROM THE ROUTES THAT WE SET UP. 
    */
    static async getInitialProps(props) {
            /* address of the fundraiser we are trying to show to our user; comes from 
            a query prop on our URL or routes.js file. it is predefined;
            importing fundraiser from fundraiser.js which will access our contract instance
            */
            const fundraiser = Fundraiser(props.query.address)
            const summary = await fundraiser.methods.getSummary().call();

            // returning the information out of the contract
            return {
                /* 
                returning the address in our object because getInitialProps is not a part of our actual 
                component instance, so while getInitialProps "knows" about our campaign address,
                the rest of the methods inside of it which ARE a part of the actual component instance 
                don't know about itso we have to pass it along.
                */
                address: props.query.address,
                totalAmount: summary[0],
                numberOfDonors: summary[1],
                fundraiserGoal: summary[2],
            }
    }

    // Create a card group helper method
    renderCards() {
        const {
            address, totalAmount, numberOfDonors, fundraiserGoal
        } = this.props;

        const items = [
            {
            header: "Fundraiser Address",
            meta: address,
            description: "Wallet address where contributed funds are sent.",
            style:{overflowWrap: "break-word"}
        },
        {
            header: "Fundraiser Goal",
            meta: fundraiserGoal,
            description: "Amount of funds requested by fundraiser creators.",
            style:{overflowWrap: "break-word"}
        },
        {
            header: "Number of Donors",
            meta: numberOfDonors,
            description: "Total number of people who have contributed to the fundraiser so far.",
            style:{overflowWrap: "break-word"}
        },
        {
            header: "Total Amount Raised",
            meta: totalAmount,
            description: "Funds contributed so far.",
            style:{overflowWrap: "break-word"}
        }
            
        ];
        return <Card.Group items={items}/>
    }

    render() {
        return(
            <Layout>
                <h3>Fundraiser Details</h3>
                <Grid>
                     {/* wrapping elements in rows to prevent them from being stacked on top of one another */}
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributionForm address={this.props.address}></ContributionForm>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default ShowFundraiser;