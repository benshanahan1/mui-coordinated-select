import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

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

/* Data */
const first = ['numbers', 'symbols'];
const second = {
	numbers: ['one', 'two', 'three', 'four'],
	symbols: ['&', '?', '!', '$'],
};

class App extends React.Component {
	state = {
		firstSelectOptions: second[first[0]],
		firstSelectValue: first[0],
		secondSelectValue: second[first[0]][0],
	};

	onChange = (selectNumber, value) => {
		this.setState(prevState => ({
			selectNumber: selectNumber,
			selectValues: prevStates[selectNumber], 
		}));
	};

	onFirstChange = (event) => {
		const value = event.target.value;
		this.setState({
			firstSelectOptions: second[value],
			firstSelectValue: value,
			secondSelectValue: '',
		});
	};

	onSecondChange = (event) => {
		const value = event.target.value;
		this.setState({
			secondSelectValue: value,
		});
	};

	render() {
		const { classes } = this.props;
		const { firstSelectOptions, firstSelectValue, secondSelectValue } = this.state;

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
						<Grid container spacing={24}>
							<Grid xs={6} item>
								<TextField
									fullWidth
									select
									value={firstSelectValue}
									onChange={this.onFirstChange}
									variant='outlined'
									label='First'
								>
									{first.map(option => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid xs={6} item>
								<TextField
									fullWidth
									select
									value={secondSelectValue}
									label='Second'
									onChange={this.onSecondChange}
									variant='outlined'
								>
									<MenuItem value=''><em>None</em></MenuItem>
									{firstSelectOptions.map(option => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
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