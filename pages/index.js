import React, { Component }  from 'react';
import creation from '../ethereum/creation';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import { Link } from "../routes";

class FundraiserIndex extends Component {
    // static defines a class function; requirement placed on us by next so it doesn't 
    // have to render the component
    static async getInitialProps() {
        const fundraiserCreation = await creation.methods.getDeployedFundraiser().call();
        // console.log(fundraiserCreation)
        return {fundraiserCreation: fundraiserCreation};
    }

    
    // Map through the addresses array from the getDeployedDonations function and apply the semantic ui 
    // styling.
    renderFundraiserCreation() {
        const items = this.props.fundraiserCreation.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/fundraisers/${address}`}>
                        <a>View Fundraiser</a>
                    </Link>
                ),
                fluid: true

            };
        });
        return <Card.Group items={items} />
    }

    render() {
        return (
            // Interior jsx being passed into Layout as children
            <Layout>
                <div>
                    <h3>Open Fundraisers:</h3>
                    {/* Adding the button first to have two columns, left with the open fundraisers and right with button */}
                    <Link route="/fundraisers/new">
                        <Button 
                            floated ="right"
                            content="Start a Fundraiser"
                            icon="add circle"
                            primary
                        ></Button>
                    </Link>
                    {this.renderFundraiserCreation()}
                </div>
            </Layout>
        )
    }
}

export default FundraiserIndex;