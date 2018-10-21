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
const LABELS = ['First level', 'Second level', 'Third level'];
const OPTIONS = {
	numbers: {
		one:   [1, 2, 3],
		two:   [2, 4, 6],
		three: [3, 6, 9],
	},
	letters: {
		a: ['a', 'A', '4'],
		e: ['e', 'E', '3'],
		s: ['s', 'S', '$'],
	},
};
const N_LEVELS = 3;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectDepth: -1,
			selectValues: [],
		};
	}

	getKeyArray(depth) {
		const { selectValues, selectDepth } = this.state;
		let obj = OPTIONS;

		if (selectValues.length > 0) {
			// Step through each depth of the object, using `selectValues` as keys
			// until we've reached specified depth.
			for (let i = 0; i < depth; i++) {
				if (i > selectDepth) break;
				obj = obj[selectValues[i]];
			}
		}

		// If object is not an array, just grab the keys.
		if (!Array.isArray(obj)) {
			obj = Object.keys(obj);
		}

		return obj;
	}

	/* Handle select input change. Parameter `depth` indicates how much 
	'progress' the user has made in selections. If the user changes a select 
	that precedes another select, all following selects will be cleared / 
	reset / disabled depending on what's applicable. */
	onChange(depth, value) {
		let { selectValues } = this.state;

		// If selected value is none, it's the same as if the user changed the
		// select element a level up.
		if (!value) depth -= 1;

		// Update selectValues with user's selection.
		if (depth < selectValues.length) {
			if (value) selectValues[depth] = value;
			while(depth + 1 < selectValues.length) selectValues.pop();
		} else {
			selectValues.push(value);
		}

		this.setState({
			selectDepth: depth,
			selectValues: selectValues, 
		});
	};

	createSelects() {
		let jsx = [];
		const { selectDepth, selectValues } = this.state;
		const nLevels = N_LEVELS;

		for (let i = 0; i < nLevels; i++) {
			const thisIndex = i;
			const thisValue = selectValues[i] || '';
			const thisOptions = this.getKeyArray(i);
			const disabled = (i > selectDepth + 1);

			jsx.push(
				<Grid xs={4} key={i} item>
					<TextField
						fullWidth
						select
						disabled={disabled}
						value={thisValue}
						onChange={(e) => 
							this.onChange(thisIndex, e.target.value)}
						variant='outlined'
						label={LABELS[i]}
					>
						<MenuItem value=''><em>None</em></MenuItem>
						{thisOptions.map(option => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			);
		}

		return jsx;
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
						<Grid container spacing={24}>
							{ this.createSelects() }
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