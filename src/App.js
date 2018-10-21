import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CoordinatedSelect from './CoordinatedSelect';
import { OPTIONS, LABELS, N_LEVELS } from './data.js';

const styles = theme => ({
	root: {
		width: '100%',
	},
	title: {
		maxWidth: '800px',
		margin: '0 auto',
		marginTop: '250px',
		marginBottom: '50px',
		textAlign: 'center',
	},
	card: {
		width: '60%',
		maxWidth: '800px',
		margin: '0 auto',
	},

});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValues: [],
		};
	}

	updateSelectValues(values) {
		this.setState({ selectValues: values });
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.title}>
					<Typography variant='h2'>
						CoordinatedSelect
					</Typography>
					<Typography variant='caption'>
						Coordinated textfields demo for Material-UI.
					</Typography>
				</div>
				<Card className={classes.card}>
					<CardContent>
						<CoordinatedSelect
							options={OPTIONS}
							labels={LABELS}
							nLevels={N_LEVELS}
							selectValues={this.state.selectValues}
							valueUpdater={this.updateSelectValues.bind(this)}
						/>
					</CardContent>
				</Card>
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);